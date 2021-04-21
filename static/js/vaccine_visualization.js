//数值字符串每隔3位添加逗号
function formatNum(str) {
    var newStr = "";
    var count = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
            newStr = str.charAt(i) + "," + newStr;
        } else {
            newStr = str.charAt(i) + newStr;
        }
        count++;
    }
    return newStr;
}

(function () {
    $.ajax({
        url: " /vaccine/total",
        type: "GET",
        data: { action: "get_current_vaccinations" },
        dataType: "json",
        success: function (result) {
            var domestic_data = result['retlist'][0]
            document.getElementById('val1').innerHTML = formatNum(String(domestic_data['total_vaccinations']))
            document.getElementById('incr1').innerHTML = '+' + formatNum(String(domestic_data['new_vaccinations']))
            document.getElementById('val2').innerHTML = domestic_data['total_vaccinations_per_hundred']

            var global_data = result['retlist'][1]
            document.getElementById('val3').innerHTML = formatNum(String(global_data['total_vaccinations']))
            document.getElementById('incr2').innerHTML = '+' + formatNum(String(global_data['new_vaccinations']))
            document.getElementById('val4').innerHTML = global_data['total_vaccinations_per_hundred']
        }
    })
})();



key_asia_name_list = ['中国', '印度', '日本', '越南', '土耳其']
key_europe_name_list = ['俄罗斯', '英国', '法国', '德国', '意大利']
key_africa_name_list = ['南非', '埃及', '尼日利亚', '肯尼亚', '安哥拉']
key_oceania_name_list = ['澳大利亚', '新西兰']
key_north_name_list = ['美国', '加拿大', '墨西哥', '巴拿马', '危地马拉']
key_south_name_list = ['巴西', '阿根廷', '秘鲁', '玻利维亚', '委内瑞拉',]

key_continent_data_dict = {
    'asia_data': [],//存储各国数据的列表
    'europe_data': [],
    'africa_data': [],
    'oceania_data': [],
    'north_data': [],
    'south_data': [],
}

asia_name_list = ['以色列', '阿联酋', '沙特阿拉伯', '柬埔寨', '韩国', '菲律宾', '卡塔尔', '巴林', '斯里兰卡', '蒙古', '不丹', '乌兹别克斯坦', '印度尼西亚', '孟加拉', '泰国', '哈萨克斯坦', '马尔代夫', '黎巴嫩', '马来西亚', '↵巴勒斯坦', '叙利亚', '约旦', '阿富汗', '吉尔吉斯斯坦', '新加坡', '阿曼', '伊拉克', '科索沃', '文莱', '巴基斯坦', '科威特', '尼泊尔', '伊朗', '老挝', '缅甸']
europe_name_list = ['波兰', '匈牙利', '比利时', '葡萄牙', '奥地利', '捷克', '丹麦', '芬兰', '斯洛伐克', '立陶宛', '保加利亚', '乌克兰', '爱沙尼亚', '摩尔多瓦', '马恩岛', '黑山', '安道尔', '罗马尼亚', '塞尔维亚', '希腊', '阿塞拜疆', '克罗地亚', '阿尔巴尼亚', '马耳他', '拉脱维亚', '直布罗陀', '北马其顿', '格鲁吉亚', '圣马力诺', '西班牙', '瑞典', '爱尔兰', '斯洛文尼亚', '塞浦路斯', '冰岛', '波黑', '格陵兰', '挪威', '卢森堡', '法罗群岛克朗', '瑞士', '格恩西岛', '列支敦士登公国', '荷兰', '北塞浦路斯土耳其共和国', '摩纳哥', '泽西岛', '阿尔及利亚', '白俄罗斯']
africa_name_list = ['加纳', '摩洛哥', '塞内加尔', '毛里塔尼亚', '赤道几内亚', '津巴布韦', '马拉维', '突尼斯', '塞拉利昂', '科特迪瓦', '加蓬', '乌干达', '几内亚', '纳米比亚', '塞舌尔', '苏丹', '斯威士兰', '马里', '圣多美和普林西比', '卢旺达', '多哥', '圣赫勒拿岛', '毛里求斯']
oceania_name_list = ['巴布亚新几内亚',]
north_name_list = ['萨尔瓦多', '圣卢西亚', '圣文森特和格林纳丁斯', '圣基茨和尼维斯', '巴巴多斯', '开曼群岛', '洪都拉斯', '伯利兹', '哥斯达黎加', '百慕大', '多米尼加', '安提瓜和巴布达', '安圭拉', '巴哈马', '特克斯和凯科斯群岛']
south_name_list = ['智利', '哥伦比亚', '乌拉圭', '厄瓜多尔', '苏里南', '巴拉圭', 'Falkland Islands', '圭亚那', '特立尼达和多巴哥']

continent_data_dict = {
    'asia_data': [],
    'europe_data': [],
    'africa_data': [],
    'oceania_data': [],
    'north_data': [],
    'south_data': []
}

function Make_short_table(continent_data_row_id) {
    var data_list = key_continent_data_dict[continent_data_row_id]

    var expend_list_button = document.getElementById(continent_data_row_id + '_button')
    expend_list_button.className = 'fa fa-chevron-right expend_list_button'
    expend_list_button.onclick = function () { Make_complete_table(this.value) }

    var country_th = document.createElement('th')
    country_th.innerHTML = '国家'
    var count_th = document.createElement('th')
    count_th.innerHTML = '接种量'
    var per_hundred_th = document.createElement('th')
    per_hundred_th.innerHTML = '百人接种率'

    var table_head_tr = document.createElement('tr')
    table_head_tr.appendChild(country_th)
    table_head_tr.appendChild(count_th)
    table_head_tr.appendChild(per_hundred_th)

    var table_head = document.createElement('thead')
    table_head.appendChild(table_head_tr)

    var table_body = document.createElement('tbody')
    for (var i = 0; i < data_list.length; i++) {
        country_data = data_list[i]

        var country_td = document.createElement('td')
        country_td.innerHTML = country_data['country']
        var count_td = document.createElement('td')
        count_td.innerHTML = country_data['total_vaccinations']
        var per_hundred_td = document.createElement('td')
        per_hundred_td.innerHTML = country_data['total_vaccinations_per_hundred']

        var row_tr = document.createElement('tr')
        row_tr.appendChild(country_td)
        row_tr.appendChild(count_td)
        row_tr.appendChild(per_hundred_td)

        table_body.appendChild(row_tr)
    }

    var continent_data_table = document.getElementById(continent_data_row_id + '_table')
    continent_data_table.innerHTML = ''
    continent_data_table.appendChild(table_head)
    continent_data_table.appendChild(table_body)
}

function Make_complete_table(continent_data_row_id) {
    var data_list = continent_data_dict[continent_data_row_id]

    var expend_list_button = document.getElementById(continent_data_row_id + '_button')
    expend_list_button.className = 'fa fa-chevron-down expend_list_button'
    expend_list_button.onclick = function () { Make_short_table(this.value) }

    var country_th = document.createElement('th')
    country_th.innerHTML = '国家'
    var count_th = document.createElement('th')
    count_th.innerHTML = '接种量'
    var per_hundred_th = document.createElement('th')
    per_hundred_th.innerHTML = '百人接种率'

    var table_head_tr = document.createElement('tr')
    table_head_tr.appendChild(country_th)
    table_head_tr.appendChild(count_th)
    table_head_tr.appendChild(per_hundred_th)

    var table_head = document.createElement('thead')
    table_head.appendChild(table_head_tr)

    var table_body = document.createElement('tbody')
    for (var i = 0; i < data_list.length; i++) {
        country_data = data_list[i]

        var country_td = document.createElement('td')
        country_td.innerHTML = country_data['country'] != '-1' ? country_data['country'] : '无相关数据'
        var count_td = document.createElement('td')
        count_td.innerHTML = country_data['total_vaccinations'] != '-1' ? country_data['total_vaccinations'] : '无相关数据'
        var per_hundred_td = document.createElement('td')
        per_hundred_td.innerHTML = country_data['total_vaccinations_per_hundred'] != '-1' ? country_data['total_vaccinations_per_hundred'] : '无相关数据'

        var row_tr = document.createElement('tr')
        row_tr.appendChild(country_td)
        row_tr.appendChild(count_td)
        row_tr.appendChild(per_hundred_td)

        table_body.appendChild(row_tr)
    }

    var continent_data_table = document.getElementById(continent_data_row_id + '_table')
    continent_data_table.innerHTML = ''
    continent_data_table.appendChild(table_head)
    continent_data_table.appendChild(table_body)
}

(function () {
    $.ajax({
        url: " /vaccine/total",
        type: "GET",
        data: { action: "get_current_vaccines_nations" },
        dataType: "json",
        success: function (result) {
            country_data_list = result['retlist']

            function Is_in_array(arr, value) {
                for (var i = 0; i < arr.length; i++)
                    if (value === arr[i])
                        return true;
                return false;
            }

            for (var i = 0; i < country_data_list.length; i++)
                if (Is_in_array(key_asia_name_list, country_data_list[i]['country'])) {
                    key_continent_data_dict['asia_data'].push(country_data_list[i])
                    continent_data_dict['asia_data'].push(country_data_list[i])
                }
                else if (Is_in_array(key_europe_name_list, country_data_list[i]['country'])) {
                    key_continent_data_dict['europe_data'].push(country_data_list[i])
                    continent_data_dict['europe_data'].push(country_data_list[i])
                }
                else if (Is_in_array(key_africa_name_list, country_data_list[i]['country'])) {
                    key_continent_data_dict['africa_data'].push(country_data_list[i])
                    continent_data_dict['africa_data'].push(country_data_list[i])
                }
                else if (Is_in_array(key_oceania_name_list, country_data_list[i]['country'])) {
                    key_continent_data_dict['oceania_data'].push(country_data_list[i])
                    continent_data_dict['oceania_data'].push(country_data_list[i])
                }
                else if (Is_in_array(key_north_name_list, country_data_list[i]['country'])) {
                    key_continent_data_dict['north_data'].push(country_data_list[i])
                    continent_data_dict['north_data'].push(country_data_list[i])
                }
                else if (Is_in_array(key_south_name_list, country_data_list[i]['country'])) {
                    key_continent_data_dict['south_data'].push(country_data_list[i])
                    continent_data_dict['south_data'].push(country_data_list[i])
                }

                else if (Is_in_array(asia_name_list, country_data_list[i]['country']))
                    continent_data_dict['asia_data'].push(country_data_list[i])
                else if (Is_in_array(europe_name_list, country_data_list[i]['country']))
                    continent_data_dict['europe_data'].push(country_data_list[i])
                else if (Is_in_array(africa_name_list, country_data_list[i]['country']))
                    continent_data_dict['africa_data'].push(country_data_list[i])
                else if (Is_in_array(oceania_name_list, country_data_list[i]['country']))
                    continent_data_dict['oceania_data'].push(country_data_list[i])
                else if (Is_in_array(north_name_list, country_data_list[i]['country']))
                    continent_data_dict['north_data'].push(country_data_list[i])
                else if (Is_in_array(south_name_list, country_data_list[i]['country']))
                    continent_data_dict['south_data'].push(country_data_list[i])


            for (key_continent in key_continent_data_dict) {
                var continent_chart_container = document.createElement("div")
                continent_chart_container.className = 'col-md-6 col-sm-6 continent_chart_container'
                continent_chart_container.id = key_continent + '_chart'
                continent_chart_container.style.width = '200px';
                continent_chart_container.style.height = '200px';
                continent_chart_container.style.border = '10px';
                continent_chart_container.style.backgroundColor = 'rgb(255,255,0)';

                var expend_list_button = document.createElement('button')
                expend_list_button.className = 'fa fa-chevron-right expend_list_button'
                expend_list_button.id = key_continent + '_button'
                expend_list_button.value = key_continent
                expend_list_button.onclick = function () { Make_complete_table(this.value) }

                var continent_data_table = document.createElement("table")
                continent_data_table.className = 'col-md-5 col-sm-5 continent_data_table'
                continent_data_table.id = key_continent + "_table"

                var continent_data_row = document.createElement("div")
                continent_data_row.className = 'row continent_data_row'
                continent_data_row.id = key_continent + '_row'
                continent_data_row.appendChild(continent_chart_container)
                continent_data_row.appendChild(expend_list_button)
                continent_data_row.appendChild(continent_data_table)


                document.getElementById('global_data_list').appendChild(continent_data_row)

                Make_short_table(key_continent)
            }
        }
    })
})();



//国内接种趋势折线图
(function () {
    $.ajax({
        url: "/vaccine/trend",
        type: "GET",
        data: { action: "get_trend_internal" },
        dataType: "json",
        success: function (result) {
            var idx;
            var xAxis_content = [];
            var data1 = [];
            var data2 = [];
            for (var i = 0; i < result["retlist"].length; i++) {
                if (result["retlist"][i]["date"] === "03.20") {
                    idx = i;
                    break;
                }
            }

            for (var i = idx; i < result["retlist"].length; i++) {
                var items = result["retlist"][i]["date"].split(".");
                var datestr = items.join("");
                var datenum = parseInt(datestr);
                var newdatestr = String(Math.floor(datenum / 100)) + "/" + String(datenum % 100);
                xAxis_content.push(newdatestr);

                data1.push(result["retlist"][i]["total_vaccinations"]);
                data2.push(result["retlist"][i]["total_vaccinations_per_hundred"]);
            }
            var myChart = echarts.init(document.querySelector("#domestic_data_chart"));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                // toolbox: {
                //     feature: {
                //         dataView: { show: true, readOnly: false },
                //         magicType: { show: true, type: ['line', 'bar'] },
                //         restore: { show: true },
                //         saveAsImage: { show: true }
                //     }
                // },
                legend: {
                    data: ['接种量', '百人接种率']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis_content,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '接种量',
                        // min: 0,
                        // max: 250,
                        // interval: 50,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '百人接种率',
                        // min: 0,
                        // max: 25,
                        // interval: 5,
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    }
                ],
                series: [
                    {
                        name: '接种量',
                        type: 'bar',
                        data: data1
                    },
                    {
                        name: '百人接种率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: data2
                    }
                ]
            };
            myChart.setOption(option);
            // 4. 让图表跟随屏幕自动的去适应
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    })
})();