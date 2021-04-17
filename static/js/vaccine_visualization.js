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
            // console.log(result['retlist'])
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



asia_name_list = ['中国', '印度', '土耳其', '以色列', '阿联酋', '沙特阿拉伯', '柬埔寨', '韩国', '菲律宾', '卡塔尔', '巴林', '斯里兰卡', '蒙古', '不丹', '乌兹别克斯坦', '印度尼西亚', '孟加拉', '泰国', '哈萨克斯坦', '马尔代夫', '黎巴嫩', '日本', '马来西亚', '越南', '↵巴勒斯坦', '叙利亚', '约旦', '阿富汗', '吉尔吉斯斯坦', '新加坡', '阿曼', '伊拉克', '科索沃', '文莱', '巴基斯坦', '科威特', '尼泊尔', '伊朗', '老挝', '缅甸']
europe_name_list = ['德国', '俄罗斯', '意大利', '波兰', '匈牙利', '比利时', '葡萄牙', '奥地利', '捷克', '丹麦', '芬兰', '斯洛伐克', '立陶宛', '保加利亚', '乌克兰', '爱沙尼亚', '摩尔多瓦', '马恩岛', '黑山', '安道尔', '英国', '法国', '罗马尼亚', '塞尔维亚', '希腊', '阿塞拜疆', '克罗地亚', '阿尔巴尼亚', '马耳他', '拉脱维亚', '直布罗陀', '北马其顿', '格鲁吉亚', '圣马力诺', '西班牙', '瑞典', '爱尔兰', '斯洛文尼亚', '塞浦路斯', '冰岛', '波黑', '格陵兰', '挪威', '卢森堡', '法罗群岛克朗', '瑞士', '格恩西岛', '列支敦士登公国', '荷兰', '北塞浦路斯土耳其共和国', '摩纳哥', '泽西岛', '阿尔及利亚', '白俄罗斯']
africa_name_list = ['加纳', '安哥拉', '摩洛哥', '塞内加尔', '毛里塔尼亚', '赤道几内亚', '南非', '津巴布韦', '马拉维', '突尼斯', '塞拉利昂', '科特迪瓦', '加蓬', '乌干达', '肯尼亚', '几内亚', '纳米比亚', '尼日利亚', '塞舌尔', '苏丹', '斯威士兰', '埃及', '马里', '圣多美和普林西比', '卢旺达', '多哥', '圣赫勒拿岛', '毛里求斯']
oceania_name_list = ['澳大利亚', '新西兰', '巴布亚新几内亚',]
north_name_list = ['美国', '墨西哥', '加拿大', '巴拿马', '萨尔瓦多', '危地马拉', '圣卢西亚', '圣文森特和格林纳丁斯', '圣基茨和尼维斯', '巴巴多斯', '开曼群岛', '洪都拉斯', '伯利兹', '哥斯达黎加', '百慕大', '多米尼加', '安提瓜和巴布达', '安圭拉', '巴哈马', '特克斯和凯科斯群岛']
south_name_list = ['巴西', '阿根廷', '乌拉圭', '智利', '哥伦比亚', '秘鲁', '厄瓜多尔', '玻利维亚', '苏里南', '巴拉圭', 'Falkland Islands', '圭亚那', '委内瑞拉', '特立尼达和多巴哥']

continent_data_dict = {
    'asia_data': ['asia_data'],//存储各国数据的列表，第0个元素用于向Make_short_table和Make_complete_table说明当前表是哪个州的数据
    'europe_data': ['europe_data'],
    'africa_data': ['africa_data'],
    'oceania_data': ['oceania_data'],
    'north_data': ['north_data'],
    'south_data': ['south_data']
}

function Make_short_table(data_list) {
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
    for (var i = 1; i < (data_list.length > 7 ? 7 : data_list.length); i++) {
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

    var expend_list_button = document.createElement('button')
    expend_list_button.innerHTML = '展开更多'
    expend_list_button.value = data_list[0]
    expend_list_button.onclick = function () { Make_complete_table(this.value) }

    var row_tr = document.createElement('tr')
    row_tr.appendChild(expend_list_button)
    table_body.appendChild(row_tr)

    var continent_table = document.createElement("table")
    continent_table.id = data_list[0]
    continent_table.appendChild(table_head)
    continent_table.appendChild(table_body)

    document.getElementById('global_data_list').appendChild(continent_table)
}

function Make_complete_table(table_name) {
    data_list = continent_data_dict[table_name]

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
    for (var i = 1; i < data_list.length; i++) {
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

    var continent_table = document.getElementById(table_name)
    continent_table.innerHTML = ''
    continent_table.appendChild(table_head)
    continent_table.appendChild(table_body)
}


(function () {
    $.ajax({
        url: " /vaccine/total",
        type: "GET",
        data: { action: "get_current_vaccines_nations" },
        dataType: "json",
        success: function (result) {
            // console.log(result)
            country_data_list = result['retlist']

            function Is_in_array(arr, value) {
                for (var i = 0; i < arr.length; i++)
                    if (value === arr[i])
                        return true;
                return false;
            }

            for (var i = 0; i < country_data_list.length; i++)
                if (Is_in_array(asia_name_list, country_data_list[i]['country']))
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

            for (continent in continent_data_dict)
                Make_short_table(continent_data_dict[continent])
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

