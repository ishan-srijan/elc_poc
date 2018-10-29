$( document ).ready(function() {
    all_data();
});


function get_sales_by_country(country) {

     data = {
        'country':country
    }

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/country",
        data: JSON.stringify(data),
        success: function (data) {
            show_record_country(data);
        },
        error: function (error) {
            console.log(error);
        },
        async: true,
        crossDomain:true,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        processData: false,
        timeout: 60000
    });

}

function all_data() {
    data = ''
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/all",
        data: JSON.stringify(data),
        success: function (data) {
            show_all_records(data);
        },
        error: function (error) {
            console.log(error);
        },
        async: true,
        crossDomain:true,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        processData: false,
        timeout: 60000
    });

}

function show_all_records(data) {
    var tab_country = document.getElementById("country_table");
    tab_country.style.display = "none";

    var tab_city = document.getElementById("city_table");
    tab_city.style.display = "none";

    var tab_country = document.getElementById("all_data");
    tab_country.style.display = "block";

    var d = JSON.parse(data);
    console.log(d);
    var all_tab = document.getElementById('tab_all');
    removeElement("tab_all");
    for (i = 0; i < d.length; i++) {
        var create_tr =  document.createElement("tr");
        var create_td =  document.createElement("td");
        create_td.innerHTML = d[i]['country'];
        create_tr.appendChild(create_td);

        var create_td2 =  document.createElement("td");
        create_td2.innerHTML = d[i]['avg_sale'];
        create_tr.appendChild(create_td2);

        var create_td3 =  document.createElement("td");
        create_td3.innerHTML = d[i]['avg_score'];
        create_tr.appendChild(create_td3);

        all_tab.appendChild(create_tr);
    }
}


function show_record_country(data) {

    var obj_data = JSON.parse(data);
    console.log(obj_data);
    var all_data = document.getElementById("all_data");
    all_data.style.display = "none";
    var city_table = document.getElementById("city_table");
    city_table.style.display = "none";
    var tab = document.getElementById("country_table");
    var col1 = document.getElementById("country_name");
    col1.innerHTML = obj_data.country;
    var col2 = document.getElementById("country_avg_sales");
    col2.innerHTML = obj_data.avg;
    tab.style.display = "block";


    var cityBtn = document.getElementById("cityList");
    removeElement("cityList");
    for (i = 0; i < obj_data.cities.length; i++) {

        var creating_li = document.createElement("li");
        var create_btn = document.createElement("button");

        create_btn.className = "btn btn-primary";
        create_btn.type = "button";
        create_btn.innerHTML = obj_data.cities[i];
        create_btn.onclick = function(){
            get_sales_by_city(this);
        }
        creating_li.appendChild(create_btn);
        cityBtn.appendChild(creating_li);
    }
}

function removeElement(el){

    var myNode = document.getElementById(el);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function get_sales_by_city(city) {

    data = {
        'city':city.innerHTML
    }


    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/city",
        data: JSON.stringify(data),
        success: function (data) {
            show_record_city(data);
        },
        error: function (error) {
            console.log(error);
        },
        async: true,
        crossDomain:true,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        processData: false,
        timeout: 60000
    });
}

function show_record_city(data) {
    var d = JSON.parse(data);
    console.log(d);
    var tab2 = document.getElementById("country_table");
    tab2.style.display = "none";

    var tab = document.getElementById("city_table");
    var col1 = document.getElementById("city_name");
    col1.innerHTML = d.location;
    var col2 = document.getElementById("city_avg_sales");
    col2.innerHTML = d.sales;
    var col3 = document.getElementById("ba_avg_score");
    col3.innerHTML = d.avg;
    tab.style.display = "block";

}