function InitChinaMap() {
    var myChart = echarts.init(document.querySelector("#china_world_map"));
    var mapName = 'china'
    var data = [
        { name: "北京", value: 177 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 66 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
        { name: "香港", value: 14 },
        { name: "台湾", value: 14 },
        { name: "澳门", value: 14 }
    ];

    var geoCoordMap = {};
    var toolTipData = [
        { name: "北京", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "天津", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "河北", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "山西", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "内蒙古", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "辽宁", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "吉林", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "黑龙江", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "上海", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "江苏", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "浙江", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "安徽", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "福建", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "江西", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "山东", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "河南", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "湖北", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "湖南", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "重庆", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "四川", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "贵州", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "云南", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "西藏", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "陕西", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "甘肃", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "青海", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "宁夏", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "新疆", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "广东", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "广西", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "海南", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "香港", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "台湾", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] },
        { name: "澳门", value: [{ name: "现存确诊", value: 95 }, { name: "累计确诊", value: 82 }, { name: "累计治愈", value: 82 }, { name: "累计死亡", value: 82 }] }
    ];
    $.ajax({
        url: "/covid/current",
        type: "GET",
        data: { action: "list_current_provinces" },
        dataType: "json",
        success: function (result) {
            // console.log(result);
            var len = Object.keys(result["data"]).length;
            for (var i = 0; i < len; i++) {
                var tid = data.findIndex(obj => obj["name"] == result["data"][i]["province"]);
                if (tid >= 0) {
                    data[tid]["value"] = result["data"][i]["overall_data"]["current_confirmed"];

                    //console.log(data[tid]["value"]);
                    toolTipData[tid]["value"][0]["value"] = result["data"][i]["overall_data"]["current_confirmed"];
                    toolTipData[tid]["value"][1]["value"] = result["data"][i]["overall_data"]["confirmed"];
                    toolTipData[tid]["value"][2]["value"] = result["data"][i]["overall_data"]["cured"];
                    toolTipData[tid]["value"][3]["value"] = result["data"][i]["overall_data"]["death"];
                }
            }


        }
    });
    /*获取地图数据*/
    myChart.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    myChart.hideLoading();
    mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

    });


    // console.log("============geoCoordMap===================")
    // console.log(geoCoordMap)
    // console.log("================data======================")
    var max = 480,
        min = 9; // todo 
    var maxSize4Pin = 100,
        minSize4Pin = 20;

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    option = {
        // title: {
        //   text: name_title,
        //   subtext: subname,
        //   x: 'center',
        //   textStyle: {
        //     color: nameColor,
        //     fontFamily: name_fontFamily,
        //     fontSize: name_fontSize
        //   },
        //   subtextStyle: {
        //     fontSize: subname_fontSize,
        //     fontFamily: name_fontFamily
        //   }
        // },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    // console.log(convertData(data))
                    return toolTiphtml;
                } else {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    // console.log(convertData(data))
                    return toolTiphtml;
                }
            }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
            show: true,
            min: 0,
            max: 200,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            textStyle: {
                color: "#73879C",
                fontSize: "12"
            },
            calculable: true,
            seriesIndex: [1],
            inRange: {
                // color: ['#3B5077', '#031525'] // 蓝黑
                color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                // color: ['#23074d', '#cc5333'] // 紫红
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#1488CC', '#2B32B2'] // 浅蓝
            }
        },
        /*工具按钮组*/
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         dataView: {
        //             readOnly: false
        //         },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [
            {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,0)',
                    }
                }
            },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
        ]
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}


function InitWorldMap() {
    var myChart = echarts.init(document.querySelector("#china_world_map"));
    option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                    + '.' + value[1];
                return params.seriesName + '<br/>' + params.name + ' : ' + value;
            }
        },
        dataRange: {
            min: 0,
            max: 1000000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
        },
        series: [
            {
                name: 'World Population (2010)',
                type: 'map',
                mapType: 'world',
                roam: true,
                mapLocation: {
                    y: 60
                },
                itemStyle: {
                    emphasis: { label: { show: true } }
                },
                data: [
                    { name: 'Afghanistan', value: 28397.812 },
                    { name: 'Angola', value: 19549.124 },
                    { name: 'Albania', value: 3150.143 },
                    { name: 'United Arab Emirates', value: 8441.537 },
                    { name: 'Argentina', value: 40374.224 },
                    { name: 'Armenia', value: 2963.496 },
                    { name: 'French Southern and Antarctic Lands', value: 268.065 },
                    { name: 'Australia', value: 22404.488 },
                    { name: 'Austria', value: 8401.924 },
                    { name: 'Azerbaijan', value: 9094.718 },
                    { name: 'Burundi', value: 9232.753 },
                    { name: 'Belgium', value: 10941.288 },
                    { name: 'Benin', value: 9509.798 },
                    { name: 'Burkina Faso', value: 15540.284 },
                    { name: 'Bangladesh', value: 151125.475 },
                    { name: 'Bulgaria', value: 7389.175 },
                    { name: 'The Bahamas', value: 66402.316 },
                    { name: 'Bosnia and Herzegovina', value: 3845.929 },
                    { name: 'Belarus', value: 9491.07 },
                    { name: 'Belize', value: 308.595 },
                    { name: 'Bermuda', value: 64.951 },
                    { name: 'Bolivia', value: 716.939 },
                    { name: 'Brazil', value: 195210.154 },
                    { name: 'Brunei', value: 27.223 },
                    { name: 'Bhutan', value: 716.939 },
                    { name: 'Botswana', value: 1969.341 },
                    { name: 'Central African Republic', value: 4349.921 },
                    { name: 'Canada', value: 34126.24 },
                    { name: 'Switzerland', value: 7830.534 },
                    { name: 'Chile', value: 17150.76 },
                    { name: 'China', value: 1359821.465 },
                    { name: 'Ivory Coast', value: 60508.978 },
                    { name: 'Cameroon', value: 20624.343 },
                    { name: 'Democratic Republic of the Congo', value: 62191.161 },
                    { name: 'Republic of the Congo', value: 3573.024 },
                    { name: 'Colombia', value: 46444.798 },
                    { name: 'Costa Rica', value: 4669.685 },
                    { name: 'Cuba', value: 11281.768 },
                    { name: 'Northern Cyprus', value: 1.468 },
                    { name: 'Cyprus', value: 1103.685 },
                    { name: 'Czech Republic', value: 10553.701 },
                    { name: 'Germany', value: 83017.404 },
                    { name: 'Djibouti', value: 834.036 },
                    { name: 'Denmark', value: 5550.959 },
                    { name: 'Dominican Republic', value: 10016.797 },
                    { name: 'Algeria', value: 37062.82 },
                    { name: 'Ecuador', value: 15001.072 },
                    { name: 'Egypt', value: 78075.705 },
                    { name: 'Eritrea', value: 5741.159 },
                    { name: 'Spain', value: 46182.038 },
                    { name: 'Estonia', value: 1298.533 },
                    { name: 'Ethiopia', value: 87095.281 },
                    { name: 'Finland', value: 5367.693 },
                    { name: 'Fiji', value: 860.559 },
                    { name: 'Falkland Islands', value: 49.581 },
                    { name: 'France', value: 63230.866 },
                    { name: 'Gabon', value: 1556.222 },
                    { name: 'United Kingdom', value: 62066.35 },
                    { name: 'Georgia', value: 4388.674 },
                    { name: 'Ghana', value: 24262.901 },
                    { name: 'Guinea', value: 10876.033 },
                    { name: 'Gambia', value: 1680.64 },
                    { name: 'Guinea Bissau', value: 10876.033 },
                    { name: 'Equatorial Guinea', value: 696.167 },
                    { name: 'Greece', value: 11109.999 },
                    { name: 'Greenland', value: 56.546 },
                    { name: 'Guatemala', value: 14341.576 },
                    { name: 'French Guiana', value: 231.169 },
                    { name: 'Guyana', value: 786.126 },
                    { name: 'Honduras', value: 7621.204 },
                    { name: 'Croatia', value: 4338.027 },
                    { name: 'Haiti', value: 9896.4 },
                    { name: 'Hungary', value: 10014.633 },
                    { name: 'Indonesia', value: 240676.485 },
                    { name: 'India', value: 1205624.648 },
                    { name: 'Ireland', value: 4467.561 },
                    { name: 'Iran', value: 240676.485 },
                    { name: 'Iraq', value: 30962.38 },
                    { name: 'Iceland', value: 318.042 },
                    { name: 'Israel', value: 7420.368 },
                    { name: 'Italy', value: 60508.978 },
                    { name: 'Jamaica', value: 2741.485 },
                    { name: 'Jordan', value: 6454.554 },
                    { name: 'Japan', value: 127352.833 },
                    { name: 'Kazakhstan', value: 15921.127 },
                    { name: 'Kenya', value: 40909.194 },
                    { name: 'Kyrgyzstan', value: 5334.223 },
                    { name: 'Cambodia', value: 14364.931 },
                    { name: 'South Korea', value: 51452.352 },
                    { name: 'Kosovo', value: 97.743 },
                    { name: 'Kuwait', value: 2991.58 },
                    { name: 'Laos', value: 6395.713 },
                    { name: 'Lebanon', value: 4341.092 },
                    { name: 'Liberia', value: 3957.99 },
                    { name: 'Libya', value: 6040.612 },
                    { name: 'Sri Lanka', value: 20758.779 },
                    { name: 'Lesotho', value: 2008.921 },
                    { name: 'Lithuania', value: 3068.457 },
                    { name: 'Luxembourg', value: 507.885 },
                    { name: 'Latvia', value: 2090.519 },
                    { name: 'Morocco', value: 31642.36 },
                    { name: 'Moldova', value: 103.619 },
                    { name: 'Madagascar', value: 21079.532 },
                    { name: 'Mexico', value: 117886.404 },
                    { name: 'Macedonia', value: 507.885 },
                    { name: 'Mali', value: 13985.961 },
                    { name: 'Myanmar', value: 51931.231 },
                    { name: 'Montenegro', value: 620.078 },
                    { name: 'Mongolia', value: 2712.738 },
                    { name: 'Mozambique', value: 23967.265 },
                    { name: 'Mauritania', value: 3609.42 },
                    { name: 'Malawi', value: 15013.694 },
                    { name: 'Malaysia', value: 28275.835 },
                    { name: 'Namibia', value: 2178.967 },
                    { name: 'New Caledonia', value: 246.379 },
                    { name: 'Niger', value: 15893.746 },
                    { name: 'Nigeria', value: 159707.78 },
                    { name: 'Nicaragua', value: 5822.209 },
                    { name: 'Netherlands', value: 16615.243 },
                    { name: 'Norway', value: 4891.251 },
                    { name: 'Nepal', value: 26846.016 },
                    { name: 'New Zealand', value: 4368.136 },
                    { name: 'Oman', value: 2802.768 },
                    { name: 'Pakistan', value: 173149.306 },
                    { name: 'Panama', value: 3678.128 },
                    { name: 'Peru', value: 29262.83 },
                    { name: 'Philippines', value: 93444.322 },
                    { name: 'Papua New Guinea', value: 6858.945 },
                    { name: 'Poland', value: 38198.754 },
                    { name: 'Puerto Rico', value: 3709.671 },
                    { name: 'North Korea', value: 1.468 },
                    { name: 'Portugal', value: 10589.792 },
                    { name: 'Paraguay', value: 6459.721 },
                    { name: 'Qatar', value: 1749.713 },
                    { name: 'Romania', value: 21861.476 },
                    { name: 'Russia', value: 21861.476 },
                    { name: 'Rwanda', value: 10836.732 },
                    { name: 'Western Sahara', value: 514.648 },
                    { name: 'Saudi Arabia', value: 27258.387 },
                    { name: 'Sudan', value: 35652.002 },
                    { name: 'South Sudan', value: 9940.929 },
                    { name: 'Senegal', value: 12950.564 },
                    { name: 'Solomon Islands', value: 526.447 },
                    { name: 'Sierra Leone', value: 5751.976 },
                    { name: 'El Salvador', value: 6218.195 },
                    { name: 'Somaliland', value: 9636.173 },
                    { name: 'Somalia', value: 9636.173 },
                    { name: 'Republic of Serbia', value: 3573.024 },
                    { name: 'Suriname', value: 524.96 },
                    { name: 'Slovakia', value: 5433.437 },
                    { name: 'Slovenia', value: 2054.232 },
                    { name: 'Sweden', value: 9382.297 },
                    { name: 'Swaziland', value: 1193.148 },
                    { name: 'Syria', value: 7830.534 },
                    { name: 'Chad', value: 11720.781 },
                    { name: 'Togo', value: 6306.014 },
                    { name: 'Thailand', value: 66402.316 },
                    { name: 'Tajikistan', value: 7627.326 },
                    { name: 'Turkmenistan', value: 5041.995 },
                    { name: 'East Timor', value: 10016.797 },
                    { name: 'Trinidad and Tobago', value: 1328.095 },
                    { name: 'Tunisia', value: 10631.83 },
                    { name: 'Turkey', value: 72137.546 },
                    { name: 'United Republic of Tanzania', value: 44973.33 },
                    { name: 'Uganda', value: 33987.213 },
                    { name: 'Ukraine', value: 46050.22 },
                    { name: 'Uruguay', value: 3371.982 },
                    { name: 'United States of America', value: 312247.116 },
                    { name: 'Uzbekistan', value: 27769.27 },
                    { name: 'Venezuela', value: 236.299 },
                    { name: 'Vietnam', value: 89047.397 },
                    { name: 'Vanuatu', value: 236.299 },
                    { name: 'West Bank', value: 13.565 },
                    { name: 'Yemen', value: 22763.008 },
                    { name: 'South Africa', value: 51452.352 },
                    { name: 'Zambia', value: 13216.985 },
                    { name: 'Zimbabwe', value: 13076.978 }
                ]
            }
        ]
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}



InitChinaMap();//默认加载中国地图
(function () {
    $("#switcher").on("click", "a", function () {
        console.log(typeof $(this).index());
        if ($(this).index() === 0) {//加载中国地图
            InitChinaMap();

        }
        else {//加载世界地图
            InitWorldMap();
        }
        // // alert(1);
        // // console.log($(this).index());
        // // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
        // // console.log(yearData[$(this).index()]);
        // var obj = totaldata[$(this).index()];
        // option.xAxis.data = xAxiscontent[$(this).index()];
        // option.series[0].data = obj.data[0];
        // option.series[1].data = obj.data[1];
        // option.series[2].data = obj.data[2];
        // // 需要重新渲染
        // myChart.setOption(option);
    });
})();