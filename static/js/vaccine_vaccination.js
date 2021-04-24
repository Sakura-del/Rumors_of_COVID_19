supported_province_list = []    //有接种点的省
supported_city_list = []
supported_distinct_list = []
agency_list = []


function On_distinct_button_clicked(distinct_name) {
    for (var i = 0; i < agency_list.length; i++)
        if (agency_list[i]['district'] == distinct_name) {
            var title_div = document.createElement('div')
            title_div.className = 'title_div'
            title_div.innerHTML = agency_list[i]['title']

            var tel_div = document.createElement('div')
            tel_div.className = 'tel_div'
            tel_div.innerHTML = agency_list[i]['tel']

            var address_div = document.createElement('div')
            address_div.className = 'address_div'
            address_div.innerHTML = agency_list[i]['address']

            var spacer_div = document.createElement('div')
            spacer_div.className = 'spacer_div'

            var agency_div = document.createElement('div')
            agency_div.className = 'agency_div'
            agency_div.appendChild(title_div)
            agency_div.appendChild(tel_div)
            agency_div.appendChild(address_div)
            if (i!=agency_list.length - 1)
                agency_div.appendChild(spacer_div)

            search_result_list.appendChild(agency_div)
        }
}

function On_city_button_clicked(city_name) {
    var distinct_block = document.getElementById('distinct_block')
    distinct_block.innerHTML = ''



    for (var i = 0; i < agency_list.length; i++)
        if (agency_list[i]['city'] == city_name)
            supported_distinct_list.push(agency_list[i]['district'])
    supported_distinct_list.sort()

    var temp_array = []
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
        distinct_button.innerHTML = distinct_name
        distinct_button.onclick = function () { On_distinct_button_clicked(this.value) }

        distinct_block.appendChild(distinct_button)
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
            var city_block = document.getElementById('city_block')
            city_block.innerHTML = ''
            var distinct_block = document.getElementById('distinct_block')
            distinct_block.innerHTML = ''

            for (i in result['citys']) {
                city_name = result['citys'][i][0]['city']
                supported_city_list.push(city_name)

                var city_button = document.createElement('button')
                city_button.className = 'button city_button'
                city_button.value = city_name
                city_button.innerHTML = city_name
                city_button.onclick = function () { On_city_button_clicked(this.value) }

                city_block.appendChild(city_button)
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
            var province_block = document.getElementById('province_block')
            for (var i = 0; i < result['provinces'].length; i++) {
                var province_name = result['provinces'][i]['province']
                supported_province_list.push(province_name)

                var province_button = document.createElement('button')
                province_button.className = 'button province_button'
                province_button.id = province_name + '_button'
                province_button.value = province_name
                province_button.innerHTML = province_name
                province_button.onclick = function () { On_province_button_clicked(this.value) }

                province_block.appendChild(province_button)
            }
        }
    })
})();
