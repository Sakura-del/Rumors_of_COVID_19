function InitChinaMap() {
    var charttag = document.getElementById("china_world_map");
    var maptag = charttag.parentNode;
    maptag.removeChild(charttag);
    var newchart = document.createElement("div");
    newchart.className = "chart";
    newchart.id = "china_world_map";
    newchart.style.width = "100%";
    newchart.style.height = "100%";
    maptag.appendChild(newchart);
    var myChart = echarts.init(document.querySelector("#china_world_map"));
    var mapName = 'china'
    var data = [
        { name: "北京", value: 0 },
        { name: "天津", value: 0 },
        { name: "河北", value: 0 },
        { name: "山西", value: 0 },
        { name: "内蒙古", value: 0 },
        { name: "辽宁", value: 0 },
        { name: "吉林", value: 0 },
        { name: "黑龙江", value: 0 },
        { name: "上海", value: 0 },
        { name: "江苏", value: 0 },
        { name: "浙江", value: 0 },
        { name: "安徽", value: 0 },
        { name: "福建", value: 0 },
        { name: "江西", value: 0 },
        { name: "山东", value: 0 },
        { name: "河南", value: 0 },
        { name: "湖北", value: 0 },
        { name: "湖南", value: 0 },
        { name: "重庆", value: 0 },
        { name: "四川", value: 0 },
        { name: "贵州", value: 0 },
        { name: "云南", value: 0 },
        { name: "西藏", value: 0 },
        { name: "陕西", value: 0 },
        { name: "甘肃", value: 0 },
        { name: "青海", value: 0 },
        { name: "宁夏", value: 0 },
        { name: "新疆", value: 0 },
        { name: "广东", value: 0 },
        { name: "广西", value: 0 },
        { name: "海南", value: 0 },
        { name: "香港", value: 0 },
        { name: "台湾", value: 0 },
        { name: "澳门", value: 0 }
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
            var maxn_china = 0;
            var len = Object.keys(result["data"]).length;
            for (var i = 0; i < len; i++) {
                var tid = data.findIndex(obj => obj["name"] == result["data"][i]["province"]);
                if (tid >= 0) {
                    data[tid]["value"] = result["data"][i]["overall_data"]["current_confirmed"];
                    if (result["data"][i]["overall_data"]["current_confirmed"] > maxn_china) {
                        maxn_china = result["data"][i]["overall_data"]["current_confirmed"];
                    }
                    //console.log(data[tid]["value"]);
                    toolTipData[tid]["value"][0]["value"] = result["data"][i]["overall_data"]["current_confirmed"];
                    toolTipData[tid]["value"][1]["value"] = result["data"][i]["overall_data"]["confirmed"];
                    toolTipData[tid]["value"][2]["value"] = result["data"][i]["overall_data"]["cured"];
                    toolTipData[tid]["value"][3]["value"] = result["data"][i]["overall_data"]["death"];
                }
            }
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
                        }
                        else {
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

                visualMap: {
                    show: true,
                    min: 0,
                    max: maxn_china,
                    left: 'left',
                    top: 'bottom',
                    text: ['High', 'Low'], // 文本，默认为数值文本
                    textStyle: {
                        color: "#73879C",
                        fontSize: "12"
                    },
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        // color: ['#3B5077', '#031525'] // 蓝黑
                        // color: ['#ffc0cb', '#800080'] // 红紫
                        // color: ['#3C3B3F', '#605C3C'] // 黑绿
                        // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                        // color: ['#23074d', '#cc5333'] // 紫红
                        color: ["#e7f0fa","#5fa6d1","#2676b8","#105ba4"]
                        // color: ['#1488CC', '#2B32B2'] // 浅蓝
                    }
                },

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
    });
}



var mapname = {
    "Afghanistan": "阿富汗",
    "Angola": "安哥拉",
    "Albania": "阿尔巴尼亚",
    "Algeria": "阿尔及利亚",
    "Argentina": "阿根廷",
    "Armenia": "亚美尼亚",
    "Australia": "澳大利亚",
    "Austria": "奥地利",
    "Azerbaijan": "阿塞拜疆",
    "Bahamas": "巴哈马",
    "Bangladesh": "孟加拉国",
    "Belgium": "比利时",
    "Benin": "贝宁",
    "Burkina Faso": "布基纳法索",
    "Burundi": "布隆迪",
    "Bulgaria": "保加利亚",
    "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
    "Belarus": "白俄罗斯",
    "Belize": "伯利兹",
    "Bermuda": "百慕大群岛",
    "Bolivia": "玻利维亚",
    "Brazil": "巴西",
    "Brunei": "文莱",
    "Bhutan": "不丹",
    "Botswana": "博茨瓦纳",
    "Cambodia": "柬埔寨",
    "Cameroon": "喀麦隆",
    "Canada": "加拿大",
    "Central African Rep.": "中非共和国",
    "Chad": "乍得",
    "Chile": "智利",
    "China": "中国",
    "Colombia": "哥伦比亚",
    "Congo": "刚果（布）",
    "Costa Rica": "哥斯达黎加",
    "Côte d'Ivoire": "科特迪瓦",
    "Croatia": "克罗地亚",
    "Cuba": "古巴",
    "Cyprus": "塞浦路斯",
    "Czech Rep.": "捷克共和国",
    "Korea": "韩国",
    "Dem. Rep. Congo": "刚果（金）",
    "Denmark": "丹麦",
    "Djibouti": "吉布提",
    "Dominican Rep.": "多米尼加共和国",
    "Ecuador": "厄瓜多尔",
    "Egypt": "埃及",
    "El Salvador": "萨尔瓦多",
    "Eq. Guinea": "赤道几内亚",
    "Eritrea": "厄立特里亚",
    "Estonia": "爱沙尼亚",
    "Ethiopia": "埃塞俄比亚",
    "Falkland Is.": "福克兰群岛",
    "Fiji": "斐济",
    "Finland": "芬兰",
    "France": "法国",
    "French Guiana": "法属圭亚那",
    "Fr. S. Antarctic Lands": "法属南部领地",
    "Gabon": "加蓬",
    "Gambia": "冈比亚",
    "Germany": "德国",
    "Georgia": "佐治亚州",
    "Ghana": "加纳",
    "Greece": "希腊",
    "Greenland": "格陵兰",
    "Guatemala": "危地马拉",
    "Guinea": "几内亚",
    "Guinea-Bissau": "几内亚比绍",
    "Guyana": "圭亚那",
    "Haiti": "海地",
    "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
    "Honduras": "洪都拉斯",
    "Hungary": "匈牙利",
    "Iceland": "冰岛",
    "India": "印度",
    "Indonesia": "印度尼西亚",
    "Iran": "伊朗",
    "Iraq": "伊拉克",
    "Ireland": "爱尔兰",
    "Israel": "以色列",
    "Italy": "意大利",
    "Ivory Coast": "象牙海岸",
    "Jamaica": "牙买加",
    "Japan": "日本",
    "Jordan": "乔丹",
    "Kashmir": "克什米尔",
    "Kazakhstan": "哈萨克斯坦",
    "Kenya": "肯尼亚",
    "Kosovo": "科索沃",
    "Kuwait": "科威特",
    "Kyrgyzstan": "吉尔吉斯斯坦",
    "Laos": "老挝",
    "Lao PDR": "老挝人民民主共和国",
    "Latvia": "拉脱维亚",
    "Lebanon": "黎巴嫩",
    "Lesotho": "莱索托",
    "Liberia": "利比里亚",
    "Libya": "利比亚",
    "Lithuania": "立陶宛",
    "Luxembourg": "卢森堡",
    "Madagascar": "马达加斯加",
    "Macedonia": "马其顿",
    "Malawi": "马拉维",
    "Malaysia": "马来西亚",
    "Mali": "马里",
    "Mauritania": "毛里塔尼亚",
    "Mexico": "墨西哥",
    "Moldova": "摩尔多瓦",
    "Mongolia": "蒙古",
    "Montenegro": "黑山",
    "Morocco": "摩洛哥",
    "Mozambique": "莫桑比克",
    "Myanmar": "缅甸",
    "Namibia": "纳米比亚",
    "Netherlands": "荷兰",
    "New Caledonia": "新喀里多尼亚",
    "New Zealand": "新西兰",
    "Nepal": "尼泊尔",
    "Nicaragua": "尼加拉瓜",
    "Niger": "尼日尔",
    "Nigeria": "尼日利亚",
    "Dem. Rep. Korea": "朝鲜",
    "Northern Cyprus": "北塞浦路斯",
    "Norway": "挪威",
    "Oman": "阿曼",
    "Pakistan": "巴基斯坦",
    "Panama": "巴拿马",
    "Papua New Guinea": "巴布亚新几内亚",
    "Paraguay": "巴拉圭",
    "Peru": "秘鲁",
    "Philippines": "菲律宾",
    "Poland": "波兰",
    "Portugal": "葡萄牙",
    "Puerto Rico": "波多黎各",
    "Qatar": "卡塔尔",
    "Republic of Seychelles": "塞舌尔共和国",
    "Romania": "罗马尼亚",
    "Russia": "俄罗斯",
    "Rwanda": "卢旺达",
    "Samoa": "萨摩亚",
    "Saudi Arabia": "沙特阿拉伯",
    "Senegal": "塞内加尔",
    "Serbia": "塞尔维亚",
    "Sierra Leone": "塞拉利昂",
    "Slovakia": "斯洛伐克",
    "Slovenia": "斯洛文尼亚",
    "Solomon Is.": "所罗门群岛",
    "Somaliland": "索马里兰",
    "Somalia": "索马里",
    "South Africa": "南非",
    "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑德威奇群岛",
    "S. Sudan": "南苏丹",
    "Spain": "西班牙",
    "Sri Lanka": "斯里兰卡",
    "Sudan": "苏丹",
    "Suriname": "苏里南",
    "Swaziland": "斯威士兰",
    "Sweden": "瑞典",
    "Switzerland": "瑞士",
    "Syria": "叙利亚",
    "Tajikistan": "塔吉克斯坦",
    "Tanzania": "坦桑尼亚",
    "Thailand": "泰国",
    "The Kingdom of Tonga": "汤加王国",
    "Timor-Leste": "东帝汶",
    "Togo": "多哥",
    "Trinidad and Tobago": "特立尼达和多巴哥",
    "Tunisia": "突尼斯",
    "Turkey": "土耳其",
    "Turkmenistan": "土库曼斯坦",
    "Uganda": "乌干达",
    "Ukraine": "乌克兰",
    "United Arab Emirates": "阿拉伯联合酋长国",
    "United Kingdom": "英国",
    "United States": "美国",
    "Uruguay": "乌拉圭",
    "Uzbekistan": "乌兹别克斯坦",
    "Vanuatu": "瓦努阿图",
    "Venezuela": "委内瑞拉",
    "Vietnam": "越南",
    "West Bank": "西岸",
    "W. Sahara": "西撒哈拉",
    "Yemen": "也门",
    "Zambia": "赞比亚共和国",
    "Zimbabwe": "津巴布韦"
};

function InitWorldMap() {
    var charttag = document.getElementById("china_world_map");
    var maptag = charttag.parentNode;
    maptag.removeChild(charttag);
    var newchart = document.createElement("div");
    newchart.className = "chart";
    newchart.id = "china_world_map";
    newchart.style.width = "100%";
    newchart.style.height = "100%";
    maptag.appendChild(newchart);
    var myChart = echarts.init(document.querySelector("#china_world_map"));
    var data1 = [];
    var toolTipData1 = [];
    var basedata = [
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
        { name: 'Central African Rep.', value: 4349.921 },
        { name: 'Canada', value: 34126.24 },
        { name: 'Switzerland', value: 7830.534 },
        { name: 'Chile', value: 17150.76 },
        { name: 'China', value: 1359821.465 },
        { name: 'Ivory Coast', value: 60508.978 },
        { name: 'Cameroon', value: 20624.343 },
        { name: 'Dem. Rep. Congo', value: 62191.161 },
        { name: 'Congo', value: 3573.024 },
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
        { name: 'Korea', value: 51452.352 },
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
        { name: 'Dem. Rep. Korea', value: 1.468 },
        { name: 'Portugal', value: 10589.792 },
        { name: 'Paraguay', value: 6459.721 },
        { name: 'Qatar', value: 1749.713 },
        { name: 'Romania', value: 21861.476 },
        { name: 'Russia', value: 21861.476 },
        { name: 'Rwanda', value: 10836.732 },
        { name: 'Western Sahara', value: 514.648 },
        { name: 'Saudi Arabia', value: 27258.387 },
        { name: 'Sudan', value: 35652.002 },
        { name: 'S. Sudan', value: 9940.929 },
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
        { name: 'Tanzania', value: 0 },
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
        { name: 'United States', value: 312247.116 },
        { name: 'Uzbekistan', value: 27769.27 },
        { name: 'Venezuela', value: 236.299 },
        { name: 'Vietnam', value: 89047.397 },
        { name: 'Vanuatu', value: 236.299 },
        { name: 'West Bank', value: 13.565 },
        { name: 'Yemen', value: 22763.008 },
        { name: 'South Africa', value: 51452.352 },
        { name: 'Zambia', value: 13216.985 },
        { name: 'Zimbabwe', value: 13076.978 }
    ];
    $.ajax({
        url: "/covid/current",
        type: "GET",
        data: { action: "list_current_nations" },
        dataType: "json",
        success: function (result) {
            var maxn = 0;
            for (var i = 0; i < result["data"].length; i++) {//大洲
                for (var j = 0; j < result["data"][i]["island_nation_data"].length; j++) {//洲内各国
                    var tname = result["data"][i]["island_nation_data"][j]["area"];
                    var engname = "null";
                    for (let key in mapname) {
                        if (mapname[key] == tname) {
                            engname = key;
                            break;
                        }
                    }
                    if (engname == "null") {
                        continue;
                    }
                    for (var k = 0; k < basedata.length; k++) {
                        // console.log(basedata[k]["name"]);
                        if (basedata[k]["name"] == engname) {

                            var curr_confirmed, confirmed, death, cured;
                            if (result["data"][i]["island_nation_data"][j]["current_confirmed"] == -1) {
                                curr_confirmed = "暂无数据";
                            }
                            else {
                                curr_confirmed = result["data"][i]["island_nation_data"][j]["current_confirmed"];
                            }
                            if (result["data"][i]["island_nation_data"][j]["confirmed"] == -1) {
                                confirmed = "暂无数据";
                            }
                            else {
                                confirmed = result["data"][i]["island_nation_data"][j]["confirmed"];
                            }
                            if (result["data"][i]["island_nation_data"][j]["death"] == -1) {
                                death = "暂无数据";
                            }
                            else {
                                death = result["data"][i]["island_nation_data"][j]["death"];
                            }
                            if (result["data"][i]["island_nation_data"][j]["cured"] == -1) {
                                cured = "暂无数据";
                            }
                            else {
                                cured = result["data"][i]["island_nation_data"][j]["cured"];
                            }
                            if (curr_confirmed > maxn) {
                                maxn = curr_confirmed;
                            }
                            var tmpobj = {};
                            tmpobj["name"] = engname;
                            tmpobj["value"] = curr_confirmed;
                            data1.push(tmpobj);

                            var tmpobj2 = {};
                            tmpobj2["name"] = engname;
                            tmpobj2["value"] = [];
                            var tobj1 = {};
                            tobj1["name"] = "现存确诊";
                            tobj1["value"] = curr_confirmed;
                            tmpobj2["value"].push(tobj1);
                            var tobj2 = {};
                            tobj2["name"] = "累计确诊";
                            tobj2["value"] = confirmed;
                            tmpobj2["value"].push(tobj2);
                            var tobj3 = {};
                            tobj3["name"] = "累计治愈";
                            tobj3["value"] = cured;
                            tmpobj2["value"].push(tobj3);
                            var tobj4 = {};
                            tobj4["name"] = "累计死亡";
                            tobj4["value"] = death;
                            tmpobj2["value"].push(tobj4);

                            toolTipData1.push(tmpobj2);
                            break;
                        }
                    }
                }
            }
            //数据获取完毕
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (typeof (params.value)[2] == "undefined") {
                            var toolTiphtml = ''
                            for (var i = 0; i < toolTipData1.length; i++) {
                                if (params.name == toolTipData1[i].name) {
                                    var zhname = "null";
                                    for (let key in mapname) {
                                        if (key == toolTipData1[i].name) {
                                            zhname = mapname[key];
                                            break;
                                        }
                                    }
                                    if (zhname != "null") {
                                        toolTiphtml += zhname + ':<br>';
                                    }
                                    else {
                                        toolTiphtml += toolTipData1[i].name + ':<br>';
                                    }
                                    for (var j = 0; j < toolTipData1[i].value.length; j++) {
                                        toolTiphtml += toolTipData1[i].value[j].name + ':' + toolTipData1[i].value[j].value + "<br>"
                                    }
                                }
                            }
                            return toolTiphtml;
                        }
                        else {
                            var toolTiphtml = ''
                            for (var i = 0; i < toolTipData1.length; i++) {
                                if (params.name == toolTipData1[i].name) {
                                    var zhname = "null";
                                    for (let key in mapname) {
                                        if (key == toolTipData1[i].name) {
                                            zhname = mapname[key];
                                            break;
                                        }
                                    }
                                    if (zhname != "null") {
                                        toolTiphtml += zhname + ':<br>';
                                    }
                                    else {
                                        toolTiphtml += toolTipData1[i].name + ':<br>';
                                    }
                                    for (var j = 0; j < toolTipData1[i].value.length; j++) {
                                        toolTiphtml += toolTipData1[i].value[j].name + ':' + toolTipData1[i].value[j].value + "<br>"
                                    }
                                }
                            }
                            return toolTiphtml;
                        }
                    }
                },
                dataRange: {
                    min: 0,
                    max: maxn,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    color: ["#105ba4","#5ba3d0","#e7f0fa"]//["#08306b", "#3484bf", "#97c6df"]
                },
                series: [
                    {
                        name: 'World Epidemic',
                        type: 'map',
                        mapType: 'world',
                        roam: true,
                        mapLocation: {
                            y: 60
                        },
                        // itemStyle: {
                        //     normal: {
                        //         areaColor: '#031525',
                        //         borderColor: '#3B5077',
                        //     },
                        //     emphasis: {
                        //         areaColor: '#2B91B7'
                        //     }
                        // },
                        itemStyle: {
                            emphasis: { 
                                label: {
                                     show: false 
                                },
                                areaColor: '#2B91B7'
                            }
                        },
                        data: data1
                    }
                ]
            };
            myChart.setOption(option);
            // 监听浏览器缩放，图表对象调用缩放resize函数
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    })

}



InitChinaMap();//默认加载中国地图
(function () {
    $("#switcher_row").on("click", "a", function () {
        // console.log(typeof $(this).index());
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