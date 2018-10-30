from flask import Flask, redirect, url_for, session, request, jsonify, render_template
import json
from decimal import Decimal
from sqlalchemy import create_engine

app = Flask(__name__)
app.secret_key = "Your_secret_strn"


@app.route('/')
def home():

    return render_template('index.html')

@app.route('/all', methods=['POST'])
def all():

    query = "select country,AVG(sales) avg_sale ,AVG(score) avg_score from ba_records GROUP BY country"

    avg_data = get_data(query)
    arr = []

    for row in avg_data:
        record_by_country = {}
        record_by_country['country'] = row['country']
        record_by_country['avg_sale'] = round(float(row['avg_sale']), 2)
        record_by_country['avg_score'] = round(float(row['avg_score']), 2)
        arr.append(record_by_country)

    return json.dumps(arr)



@app.route('/country', methods=['POST'])
def data_by_country():
    if request.method == "POST":
        country = request.json['country']
        session['country'] = country
        query = "select country,AVG(sales) from ba_records where country='{0}' GROUP BY country".format(country)

        country_avg = get_data(query)
        record_by_country = {}
        for row in country_avg:
            record_by_country['country'] = row['country']
            record_by_country['avg'] = round(float(row['avg']), 2)

        get_city_list_query = "select location from ba_records where country='{0}'".format(country)
        city_list = get_data(get_city_list_query)
        cities = []
        for i in city_list:
            cities.append(i['location'])

        record_by_country['cities'] = cities

        final_records = json.dumps(record_by_country)

        return final_records


@app.route('/city', methods=['POST'])
def data_by_city():
    if request.method == "POST":
        city = request.json['city']
        country = session['country']
#        return city
        query = "select location,sales,AVG(score) from ba_records where location='{0}' and country='{1}' GROUP BY location,sales".format(city,country)

        total_count_obj = get_data(query)
        record_by_country = {}
        for row in total_count_obj:
            record_by_country['location'] = row['location']
            record_by_country['sales'] = row['sales']
            record_by_country['avg'] = round(float(row['avg']), 2)

        final_records = json.dumps(record_by_country)

        return final_records

def connect_database():
    engine = create_engine(
        "postgresql+psycopg2://postgres:@localhost:5432/elc_db",
        pool_pre_ping=True)
    connection = engine.connect()
    return connection


def close_db_connetion(connection):
    connection.close()


def get_data(query):
    connection = connect_database()
    print("connected to the database")

    total_count_obj = connection.execute(
        query
    )
    close_db_connetion(connection)
    return total_count_obj


if __name__ == '__main__':
    app.run(debug=True)
