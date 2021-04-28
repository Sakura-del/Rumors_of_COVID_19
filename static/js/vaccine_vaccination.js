supported_province_list = []    //有接种点的省
supported_city_list = []
supported_district_list = []
agency_list = []


//点击区，在查询结果中展示接种点
function On_district_button_clicked(district_name) {
    document.getElementById('district_node').innerHTML = district_name

    search_result_list = document.getElementById('search_result_list')
    search_result_list.innerHTML = ''

    for (var i = 0; i < agency_list.length; i++)
        if (agency_list[i]['district'] == district_name) {
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
            if (i != agency_list.length - 1)
                agency_div.appendChild(spacer_div)

            search_result_list.appendChild(agency_div)
        }
}

//点击市，在右部添加本市有接种点的区的按钮
function On_city_button_clicked(city_name) {
    var district_block = document.getElementById('district_block')
    district_block.innerHTML = ''

    document.getElementById('city_node').innerHTML = city_name
    document.getElementById('district_node').innerHTML = '区'

    supported_district_list = []

    function is_key_in_array(key, array) {
        for (var i = 0; i < array.length; i++)
            if (key == array[i])
                return true

        return false
    }

    for (var i = 0; i < agency_list.length; i++)
        if (agency_list[i]['city'] == city_name && !is_key_in_array(agency_list[i]['district'], supported_district_list))
            supported_district_list.push(agency_list[i]['district'])

    for (var i = 0; i < supported_district_list.length; i++) {
        district_name = supported_district_list[i]

        var district_button = document.createElement('button')
        district_button.className = 'button district_button'
        district_button.value = district_name
        district_button.innerHTML = district_name
        district_button.onclick = function () { On_district_button_clicked(this.value) }

        district_block.appendChild(district_button)
    }
}

//点击省，在中部添加本省有接种点的市的按钮
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
            var district_block = document.getElementById('district_block')
            district_block.innerHTML = ''

            document.getElementById('province_node').innerHTML = province_name
            document.getElementById('city_node').innerHTML = '市'
            document.getElementById('district_node').innerHTML = '区'

            supported_city_list = []
            supported_district_list = []
            agency_list = []

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

            for (var i in result['citys'])
                for (var j in result['citys'][i]) {
                    if (result['citys'][i][j]['district'] == '')
                        result['citys'][i][j]['district'] = result['citys'][i][j]['city']
                    agency_list.push(result['citys'][i][j])
                }
        }
    })
}

//初始时在左部添加有接种点的省的按钮
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
                province_button.value = province_name
                province_button.innerHTML = province_name
                province_button.onclick = function () { On_province_button_clicked(this.value) }

                province_block.appendChild(province_button)
            }
        }
    })
})();
