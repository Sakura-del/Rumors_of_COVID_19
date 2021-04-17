supported_province_list = []    //有接种点的省
supported_city_list = []
supported_distinct_list = []
agency_list = []


function On_distinct_button_clicked(distinct_name) {
    var search_result_list = document.getElementById('search_result_list')
    search_result_list.innerHTML = ''

    for (var i = 0; i < agency_list.length; i++)
        if (agency_list[i]['district'] == distinct_name) {
            var title_div = document.createElement('div')
            title_div.innerHTML = agency_list[i]['title']

            var address_div = document.createElement('div')
            address_div.innerHTML = agency_list[i]['address']

            var tel_div = document.createElement('div')
            tel_div.innerHTML = agency_list[i]['tel']

            var agency_div = document.createElement('div')
            agency_div.appendChild(title_div)
            agency_div.appendChild(address_div)
            agency_div.appendChild(tel_div)

            search_result_list.appendChild(agency_div)
        }
}

function On_city_back_button_clicked() {
    var province_list_div = document.getElementById('province_list_div')
    province_list_div.innerHTML = ''

    for (var i = 0; i < supported_province_list.length; i++) {
        var province_button = document.createElement('button')
        province_button.className = 'button province_button'
        province_button.value = supported_province_list[i]
        province_button.style.width = '100px';
        province_button.style.height = '100px';
        province_button.innerHTML = supported_province_list[i]
        province_button.onclick = function () { On_province_button_clicked(this.value) }

        province_list_div.appendChild(province_button)
    }

    supported_city_list = []
}

function On_district_back_button_clicked() {
    var province_list_div = document.getElementById('province_list_div')
    province_list_div.innerHTML = ''

    var city_back_button = document.createElement('button')
    city_back_button.className = 'button'
    city_back_button.id = 'back_button city_back_button'
    city_back_button.value = '返回'
    city_back_button.style.width = '100px';
    city_back_button.style.height = '100px';
    city_back_button.innerHTML = '返回'
    city_back_button.onclick = function () { On_city_back_button_clicked() }

    province_list_div.appendChild(city_back_button)

    for (var i = 0; i < supported_city_list.length; i++) {
        city_name = supported_city_list[i]

        var city_button = document.createElement('button')
        city_button.className = 'button city_button'
        city_button.value = city_name
        city_button.style.width = '100px';
        city_button.style.height = '100px';
        city_button.innerHTML = city_name
        city_button.onclick = function () { On_city_button_clicked(this.value) }

        province_list_div.appendChild(city_button)
    }

    supported_distinct_list = []
}

function On_city_button_clicked(city_name) {
    var province_list_div = document.getElementById('province_list_div')
    province_list_div.innerHTML = ''

    var district_back_button = document.createElement('button')
    district_back_button.className = 'button'
    district_back_button.id = 'back_button district_back_button'
    district_back_button.value = '返回'
    district_back_button.style.width = '100px';
    district_back_button.style.height = '100px';
    district_back_button.innerHTML = '返回'
    district_back_button.onclick = function () { On_district_back_button_clicked() }

    province_list_div.appendChild(district_back_button)


    var temp_array = []
    for (var i = 0; i < agency_list.length; i++)
        if (agency_list[i]['city'] == city_name)
            supported_distinct_list.push(agency_list[i]['district'])

    for (var i = 1; i < supported_distinct_list.length; i++)
        if (supported_distinct_list[i] != supported_distinct_list[i - 1])
            temp_array.push(supported_distinct_list[i])
    if (temp_array.length == 0)
        temp_array.push(supported_distinct_list[0])
    supported_distinct_list = temp_array


    for (var i = 0; i < supported_distinct_list.length; i++) {
        distinct_name = supported_distinct_list[i]

        var distinct_button = document.createElement('button')
        distinct_button.className = 'button distinct_button'
        distinct_button.value = distinct_name
        distinct_button.style.width = '100px';
        distinct_button.style.height = '100px';
        distinct_button.innerHTML = distinct_name
        distinct_button.onclick = function () { On_distinct_button_clicked(this.value) }

        province_list_div.appendChild(distinct_button)
    }
}

function On_province_button_clicked(province_name) {
    $.ajax({
        url: "/vaccine/views",
        type: "GET",
        data: {
            action: "get_vaccination_point_region",
            province: province_name
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            var province_list_div = document.getElementById('province_list_div')
            province_list_div.innerHTML = ''

            var city_back_button = document.createElement('button')
            city_back_button.className = 'button'
            city_back_button.id = 'back_button city_back_button'
            city_back_button.value = '返回'
            city_back_button.style.width = '100px';
            city_back_button.style.height = '100px';
            city_back_button.innerHTML = '返回'
            city_back_button.onclick = function () { On_city_back_button_clicked() }

            province_list_div.appendChild(city_back_button)

            for (i in result['citys']) {
                city_name = result['citys'][i][0]['city']
                supported_city_list.push(city_name)

                var city_button = document.createElement('button')
                city_button.className = 'button city_button'
                city_button.value = city_name
                city_button.style.width = '100px';
                city_button.style.height = '100px';
                city_button.innerHTML = city_name
                city_button.onclick = function () { On_city_button_clicked(this.value) }

                province_list_div.appendChild(city_button)
            }

            for (i in result['citys'])
                for (j in result['citys'][i])
                    agency_list.push(result['citys'][i][j])
        }
    })
}

(function () {
    $.ajax({
        url: "/vaccine/views",
        type: "GET",
        data: { action: "get_vaccination_point_province" },
        dataType: "json",
        success: function (result) {
            // console.log(result);
            var province_list_div = document.getElementById('province_list_div')
            for (var i = 0; i < result['provinces'].length; i++) {
                var province_name = result['provinces'][i]['province']
                supported_province_list.push(province_name)

                var province_button = document.createElement('button')
                province_button.className = 'button province_button'
                province_button.value = province_name
                province_button.style.width = '100px'
                province_button.style.height = '100px'
                province_button.innerHTML = province_name
                province_button.onclick = function () { On_province_button_clicked(this.value) }

                province_list_div.appendChild(province_button)
            }
        }
    })
})();