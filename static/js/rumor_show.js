var objDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
};


var geoCoordMap = {};
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



function getdis(date1, date2) {
    var items = date1.split("-");
    var predate = items.join("");
    predate = parseInt(predate);

    var pre_year = Math.floor(predate / 10000);
    var pre_mon = Math.floor(predate % 10000 / 100);
    var pre_day = predate % 100;

    items = date2.split("-");
    var nextdate = items.join("");
    nextdate = parseInt(nextdate);

    var next_year = Math.floor(nextdate / 10000);
    var next_mon = Math.floor(nextdate % 10000 / 100);
    var next_day = nextdate % 100;

    var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (pre_year == next_year && pre_mon == next_mon) { //同年同月
        return next_day - pre_day + 1;
    } else {
        if (pre_mon == 2) {
            var ed;
            if (pre_year == 2020) {
                ed = 29;
            } else {
                ed = 28;
            }
            return ed - pre_day + 1 + next_day;
        } else {
            return days_in_month[pre_mon - 1] - pre_day + 1 + next_day;
        }
    }
}

function getlabel(date1, date2) {
    var items = date1.split("-");
    items.shift();
    new1 = items.join("/");

    items = date2.split("-");
    items.shift();
    new2 = items.join("/");

    return new1 + "-" + new2;
}

function nextday(date) {
    var days_in_month = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var items = date.split("-");
    var tmp = items.join("");
    var nowdate = parseInt(tmp);

    var yy = Math.floor(nowdate / 10000);
    var mm = Math.floor(nowdate % 10000 / 100);
    var dd = nowdate % 100;

    var nextd = dd + 1,
        nextm = mm,
        nexty = yy;
    if (nextd > days_in_month[mm]) {
        if (mm == 2) {
            if (yy != 2020 || (yy == 2020 && nextd > 29)) { //2020年可以有29号
                nextd = 1;
                nextm += 1;
            }
        } else {
            nextd = 1;
            nextm += 1;
        }

        if (nextm > 12) {
            nextm = 1;
            nexty += 1;
        }
    }
    nexty = String(nexty);
    if (nextm < 10) {
        nextm = "0" + String(nextm);
    } else {
        nextm = String(nextm);
    }
    if (nextd < 10) {
        nextd = "0" + String(nextd);
    } else {
        nextd = String(nextd);
    }
    return nexty + "-" + nextm + "-" + nextd;
}

var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
};


//谣言数量趋势图
(function () {
    let xAxis_weeks = [];
    let rumor_sum_data = [];
    let total = [];
    $.ajax({
        url: "/rumor/shows",
        type: "GET",
        data: { action: "get_count_trend" },
        dataType: "json",
        success: function (result) {
            var truedd = result["retlist"][0]["date"],
                nowdd;
            for (var i = 0; i < result["retlist"].length; i++) {
                nowdd = result["retlist"][i]["date"];
                while (truedd != nowdd) {
                    var tmp = {};
                    tmp["date"] = truedd;
                    tmp["rumor_count"] = 0;
                    total.push(tmp);
                    truedd = nextday(truedd);
                }
                total.push(result["retlist"][i]);
                truedd = nextday(nowdd);
            }


            //每7天推一段日期进X轴
            var sum = 0;
            var predate = total[0]["date"];
            var newdate;
            for (var i = 0; i < total.length; i++) {
                newdate = total[i]["date"];
                sum += total[i]["rumor_count"];
                dis = getdis(predate, newdate);
                if (dis == 7) {
                    rumor_sum_data.push(sum);
                    xAxis_weeks.push(getlabel(predate, newdate));
                    if (i + 1 < total.length) {
                        sum = 0;
                        predate = total[i + 1]["date"];
                    }
                }
                if (i == total.length - 1 && dis < 7) {
                    rumor_sum_data.push(sum);
                    xAxis_weeks.push(getlabel(predate, newdate));
                }
            }
            // 1. 实例化对象
            var myChart = echarts.init(document.querySelector("#rumors_num_change"));
            // 2.指定配置
            var option = {
                // 通过这个color修改3条线的颜色
                color: ["#FF7070"],
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    // 如果series 对象有name 值，则 legend可以不用写data
                    // 修改图例组件 文字颜色
                    textStyle: {
                        fontSize: 16,
                        color: "#73879C",
                    },
                    // 这个10% 必须加引号
                    top: "1%",
                    right: "3.3%",
                },
                grid: {
                    top: "10%",
                    left: "3.5%",
                    right: "4%",
                    bottom: "0%",
                    show: true, // 显示边框
                    borderColor: "#73879C", // 边框颜色
                    containLabel: true // 包含刻度文字在内
                },

                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: xAxis_weeks,
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLabel: {
                        fontSize: 11,
                        color: "#73879C",
                        interval: 0, //横轴信息全部显示
                        rotate: 45 // 45度角倾斜显示
                    },
                    axisLine: {
                        show: false // 去除轴线
                    }
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLabel: {
                        fontSize: 14,
                        color: "#73879C",
                    },
                    axisLine: {
                        show: false // 去除轴线
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#73879C" // 分割线颜色
                        }
                    }
                },
                dataZoom: [{
                    type: 'slider',
                    show: false, //flase直接隐藏图形
                    xAxisIndex: [0],
                    startValue: 0, // 从头开始。
                    endValue: 19 // 一次性展示10个。
                }],
                series: {
                    name: "谣言数量",
                    type: "line",
                    // true 可以让折线显示带有弧度
                    // smooth: true,
                    data: rumor_sum_data
                }
            };

            // 使用刚指定的配置项和数据显示图表。
            setInterval(function () {
                // 每次向后滚动一个，最后一个从头开始。
                if (option.dataZoom[0].endValue == rumor_sum_data.length) {
                    option.dataZoom[0].endValue = 19;
                    option.dataZoom[0].startValue = 0;
                } else {
                    option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
                    option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
                }
                myChart.setOption(option);
            }, 1200);

            // 3. 把配置给实例对象
            // myChart.setOption(option);
            // 4. 让图表跟随屏幕自动的去适应
            window.addEventListener("resize", function () {
                myChart.resize();
            });


        }
    })
})();



//谣言数量与政府干预 柱状图+富文本
(function () {
    let xAxis_weeks = [];
    let rumor_sum_data = [];
    let total = [];
    $.ajax({
        url: "/rumor/shows",
        type: "GET",
        data: { action: "get_count_trend" },
        dataType: "json",
        success: function (result) {
            var truedd = result["retlist"][0]["date"],
                nowdd;
            for (var i = 0; i < result["retlist"].length; i++) {
                nowdd = result["retlist"][i]["date"];
                while (truedd != nowdd) {
                    var tmp = {};
                    tmp["date"] = truedd;
                    tmp["rumor_count"] = 0;
                    total.push(tmp);
                    truedd = nextday(truedd);
                }
                total.push(result["retlist"][i]);
                truedd = nextday(nowdd);
            }
            // console.log(total);

            //每7天推一段日期进X轴
            var sum = 0;
            var predate = total[0]["date"];
            var newdate;
            for (var i = 0; i < total.length; i++) {
                newdate = total[i]["date"];
                sum += total[i]["rumor_count"];
                dis = getdis(predate, newdate);
                if (dis == 7) {
                    var obj1 = {};
                    obj1["value"] = sum;
                    rumor_sum_data.push(obj1);
                    xAxis_weeks.push(getlabel(predate, newdate));
                    if (i + 1 < total.length) {
                        sum = 0;
                        predate = total[i + 1]["date"];
                    }
                }
                if (i == total.length - 1 && dis < 7) {
                    var obj2 = {};
                    obj2["value"] = sum;
                    rumor_sum_data.push(obj2);
                    xAxis_weeks.push(getlabel(predate, newdate));
                }
            }

            //rumor_sum_data中添加富文本
            rumor_sum_data[3]["label"] = {
                normal: {
                    position: ['200%', '-12%'],
                    show: true,
                    formatter: [
                        '{title|2020年2月11日}',
                        '{hr|}',
                        '中央依法治国办、中央政法委、最高法、最高检、',
                        '公安部、司法部联合印发《关于依法惩治妨害新',
                        '型冠状病毒感染肺炎疫情防控违法犯罪的意见》。'
                    ].join('\n'),
                    backgroundColor: '#eee',
                    borderColor: '#777',
                    borderWidth: 1,
                    borderRadius: 4,
                    fontSize: '16px',
                    padding: 5,
                    shadowBlur: 3,
                    shadowColor: '#888',
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                    lineHeight: 20,
                    rich: {
                        title: {
                            color: '#000',
                            align: 'center',
                            fontSize: "16px"
                        },
                        hr: {
                            borderColor: '#777',
                            width: '100%',
                            borderWidth: 1,
                            height: 0
                        },
                    }
                }
            };

            rumor_sum_data[12]["label"] = {
                normal: {
                    position: ['-300%', '-260%'],
                    show: true,
                    formatter: [
                        '{title|2020年4月18日}',
                        '{hr|}',
                        '国务院联防联控机制日前印发《关于做好离汉人',
                        '员新冠肺炎检测和健康管理服务工作的通知》。'
                    ].join('\n'),
                    backgroundColor: '#eee',
                    borderColor: '#777',
                    borderWidth: 1,
                    borderRadius: 4,
                    fontSize: '16px',
                    padding: 5,
                    shadowBlur: 3,
                    shadowColor: '#888',
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                    lineHeight: 20,
                    rich: {
                        title: {
                            color: '#000',
                            align: 'center',
                            fontSize: "16px"
                        },
                        hr: {
                            borderColor: '#777',
                            width: '100%',
                            borderWidth: 1,
                            height: 0
                        },
                    }
                }
            };

            rumor_sum_data[21]["label"] = {
                normal: {
                    position: ['200%', '-80%'],
                    show: true,
                    formatter: [
                        '{title|2020年6月18日}',
                        '{hr|}',
                        '“一带一路”国际合作高级别视频会议在北京成功举行。'
                    ].join('\n'),
                    backgroundColor: '#eee',
                    borderColor: '#777',
                    borderWidth: 1,
                    borderRadius: 4,
                    fontSize: '16px',
                    padding: 5,
                    shadowBlur: 3,
                    shadowColor: '#888',
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                    lineHeight: 20,
                    rich: {
                        title: {
                            color: '#000',
                            align: 'center',
                            fontSize: "16px"
                        },
                        hr: {
                            borderColor: '#777',
                            width: '100%',
                            borderWidth: 1,
                            height: 0
                        },
                    }
                }
            };

            rumor_sum_data[51]["label"] = {
                normal: {
                    position: ['-550%', '-385%'],
                    show: true,
                    formatter: [
                        '{title|2021年1月16日}',
                        '{hr|}',
                        '人社部等七部门印发通知，鼓励引导农民工',
                        '等务工人员留在就业地安心过年。'
                    ].join('\n'),
                    backgroundColor: '#eee',
                    borderColor: '#777',
                    borderWidth: 1,
                    borderRadius: 4,
                    fontSize: '16px',
                    padding: 5,
                    shadowBlur: 3,
                    shadowColor: '#888',
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                    lineHeight: 20,
                    rich: {
                        title: {
                            color: '#000',
                            align: 'center',
                            fontSize: "16px"
                        },
                        hr: {
                            borderColor: '#777',
                            width: '100%',
                            borderWidth: 1,
                            height: 0
                        },
                    }
                }
            };


            // 1. 实例化对象
            var myChart = echarts.init(document.querySelector("#gov_rumor"));
            // 2.指定配置
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
                legend: {
                    data: ['谣言数量'],
                    top: "2%",
                    textStyle: {
                        fontSize: 16,
                        color: "#73879C",
                    }
                },
                grid: {
                    top: "9%",
                    left: "2%",
                    right: "2.4%",
                    bottom: "0%",
                    show: true, // 显示边框
                    borderColor: "#73879C", // 边框颜色
                    containLabel: true // 包含刻度文字在内
                },
                xAxis: [{
                    type: 'category',
                    data: xAxis_weeks,
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        color: "#73879C",
                        fontSize: 13,
                        rotate: 50
                    },
                    axisTick: {
                        show: false // 去除刻度线
                    }
                }],
                yAxis: {
                    type: 'value',
                    // min: 0,
                    // max: 250,
                    // interval: 50,
                    axisLabel: {
                        formatter: '{value}',
                        color: "#73879C",
                        fontSize: 14
                    }
                },
                series: [{
                    name: '谣言数量',
                    type: 'bar',
                    data: rumor_sum_data
                }]
            };
            myChart.setOption(option);
            // 4. 让图表跟随屏幕自动的去适应
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    })
})();



//地区变化趋势图
(function () {
    let zhixia_and_district = ["北京", "上海", "天津", "重庆", "香港", "澳门", "台湾"]; //直辖市和地区
    let months_range = [];
    let date = new Date();
    let nowyear = date.getFullYear();
    let nowmonth = date.getMonth() + 1;
    // let nowdate = nowyear + (nowmonth < 10 ? "0" + nowmonth : nowmonth) + (nowday < 10 ? "0" + nowday : nowday);
    //nowmonth = date.getMonth() + 1;
    let stmonth, edmonth, styear, edyear;
    //最近15个月
    var month_num = 12 + nowmonth; //去年1月到今年
    for (var i = 0; i < month_num; i++) {
        if (i === 0) {
            edmonth = nowmonth;
            edyear = nowyear;
        }
        if (i === month_num - 1) {
            stmonth = nowmonth;
            styear = nowyear;
        }

        var tmp = String(nowyear) + "/" + String(nowmonth);
        months_range.unshift(tmp);
        nowmonth = nowmonth - 1;
        if (nowmonth === 0) {
            nowmonth = 12;
            nowyear = nowyear - 1;
        }
    }
    nowyear = date.getFullYear();
    var citys = [
        { province: "北京", city: [] },
        { province: "天津", city: [] },
        { province: "河北", city: ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"] },
        { province: "山西", city: ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"] },
        { province: "内蒙古", city: ["呼和浩特市", "包头市", "乌海市", "乌兰察布市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市"] },
        { province: "辽宁", city: ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"] },
        { province: "吉林", city: ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市"] },
        { province: "黑龙江", city: ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市"] },
        { province: "上海", city: [] },
        { province: "江苏", city: ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"] },
        { province: "浙江", city: ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"] },
        { province: "安徽", city: ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "池州市", "宣城市", "亳州市"] },
        { province: "福建", city: ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"] },
        { province: "江西", city: ["南昌市", "景德镇市", "萍乡市", "九江市", "抚州市", "鹰潭市", "赣州市", "吉安市", "宜春市", "新余市", "上饶市"] },
        { province: "山东", city: ["济南市", "青岛市", "淄博市", "枣庄市", "东营市烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"] },
        { province: "河南", city: ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市"] },
        { province: "湖北", city: ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市"] },
        { province: "湖南", city: ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市"] },
        { province: "重庆", city: [] },
        { province: "四川", city: ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市"] },
        { province: "贵州", city: ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市"] },
        { province: "云南", city: ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市"] },
        { province: "西藏", city: ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市"] },
        { province: "陕西", city: ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"] },
        { province: "甘肃", city: ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市"] },
        { province: "青海", city: ["西宁市", "海东市"] },
        { province: "宁夏", city: ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"] },
        { province: "新疆", city: ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市"] },
        { province: "广东", city: ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"] },
        { province: "广西", city: ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"] },
        { province: "海南", city: ["海口市", "三亚市", "三沙市", "儋州市"] },
        { province: "香港", city: [] },
        { province: "台湾", city: [] },
        { province: "澳门", city: [] }
    ];
    var basedata = [
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
    var myChart = echarts.init(document.querySelector("#rumor_district"));
    var mapName = "china";

    var dd = [];
    var mapData = [];
    for (var i = 0; i < month_num; i++) {
        mapData.push([]);
        dd.push({});
    }

    $.ajax({
        url: "/rumor/shows",
        type: "GET",
        data: { action: "get_location_date_trend" },
        dataType: "json",
        success: function (result) {
            var all = [];
            Object.keys(result["retlist"]).forEach(function (key) {
                var items = key.split("-");
                var tmpdate = items.join("");
                tmpdate = parseInt(tmpdate);
                var t = {};
                t["date"] = tmpdate;
                t["value"] = result["retlist"][key];
                all.push(t);
            });
            all.sort(compare("date"));

            nowmonth = stmonth;
            let tmp_month_data = objDeepCopy(basedata);
            let totaldata = [];

            for (var p = 0; p < all.length; p++) {
                var tmpmonth = Math.floor(all[p]["date"] % 10000 / 100);

                if (p == all.length - 1) {
                    totaldata.push(tmp_month_data);
                    break;
                }
                if (tmpmonth > nowmonth || (nowmonth == 12 && tmpmonth < 12)) {
                    nowmonth = tmpmonth;
                    totaldata.push(tmp_month_data);
                    tmp_month_data = objDeepCopy(basedata);
                }
                for (var i = 0; i < all[p]["value"].length; i++) {
                    var tmpstr = all[p]["value"][i];
                    if (tmpstr.charAt(tmpstr.length - 1) != "市") {
                        //省或者直辖市,也可能啥都不是
                        for (var m = 0; m < 34; m++) {
                            if (tmpstr === tmp_month_data[m]["name"]) {
                                tmp_month_data[m]["value"] = tmp_month_data[m]["value"] + 1;
                                break;
                            }
                        }
                    } else {
                        //判断是否属于某个省
                        for (var j = 0; j < 34; j++) {
                            var flag = 0;
                            for (var k = 0; k < citys[j]["city"].length; k++) {
                                if (tmpstr == citys[j]["city"][k]) {
                                    flag = 1;
                                    tmp_month_data[j]["value"] = tmp_month_data[j]["value"] + 1;
                                    break;
                                }
                            }
                            if (flag == 1) {
                                break;
                            }
                        }
                    }
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

            for (var i = 0; i < month_num; i++) {
                for (var j = 0; j < totaldata[i].length; j++) {
                    var tname = totaldata[i][j]["name"];
                    var tval = totaldata[i][j]["value"];
                    dd[i][tname] = tval;
                }
            }

            for (var key in geoCoordMap) {
                for (var i = 0; i < month_num; i++) {
                    mapData[i].push({
                        year: months_range[i],
                        name: key,
                        value: dd[i][key],
                    });
                }
            }
            var categoryData = [];
            var barData = [];

            for (var i = 0; i < mapData.length; i++) {
                mapData[i].sort(function sortNumber(a, b) {
                    return a.value - b.value;
                });
                barData.push([]);
                categoryData.push([]);
                for (var j = 0; j < mapData[i].length; j++) {
                    barData[i].push(mapData[i][j].value);
                    categoryData[i].push(mapData[i][j].name);
                }
            }

            var optionXyMap01 = {
                timeline: {
                    data: months_range,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 1500,
                    left: '10%',
                    right: '10%',
                    bottom: '2%',
                    width: '80%',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#ddd',
                            },
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    symbolSize: 10,
                    lineStyle: {
                        color: '#555',
                    },
                    checkpointStyle: {
                        borderColor: '#777',
                        borderWidth: 2,
                    },
                    controlStyle: {
                        showNextBtn: true,
                        showPrevBtn: true,
                        normal: {
                            color: '#666',
                            borderColor: '#666',
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa',
                        },
                    },
                },
                baseOption: {
                    animation: true,
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'cubicInOut',
                    grid: {
                        right: '2%',
                        top: '10%',
                        bottom: '10%',
                        width: '20%',
                    },
                    tooltip: {
                        trigger: 'axis', // hover触发器
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            shadowStyle: {
                                color: 'rgba(150,150,150,0.1)', //hover颜色
                            },
                        },
                    },
                    geo: {
                        show: true,
                        map: 'china',
                        roam: true,
                        zoom: 1,
                        center: [113.83531246, 34.0267395887],
                        label: {
                            emphasis: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
                                    },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10,
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0,
                            },
                        },
                    },
                },
                options: [],
            };

            for (var n = 0; n < months_range.length; n++) {
                optionXyMap01.options.push({
                    backgroundColor: '#013954',
                    title: [
                        {}, //地图就不需要标题了
                        {
                            id: 'statistic',
                            text: months_range[n] + '数据统计情况',
                            left: '80%',
                            top: '1.8%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 18,
                            },
                        },
                    ],
                    xAxis: {
                        type: 'value',
                        scale: true,
                        position: 'top',
                        min: 0,
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            margin: 2,
                            textStyle: {
                                color: '#aaa',
                            },
                        },
                    },
                    yAxis: {
                        type: 'category',
                        //  name: 'TOP 20',
                        nameGap: 16,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ddd',
                            },
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: '#ddd',
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#ddd',
                            },
                        },
                        data: categoryData[n],
                    },

                    series: [
                        //地图
                        {
                            type: 'map',
                            map: 'china',
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff',
                                    },
                                },
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#FFFFFF',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7',
                                },
                            },
                            animation: false,
                            data: mapData,
                        },

                        //地图中闪烁的点
                        {
                            //  name: 'Top 10',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(
                                mapData[n]
                                    .sort(function (a, b) {
                                        return b.value - a.value;
                                    })
                                    .slice(0, 10)
                            ),
                            symbolSize: function (val) {
                                return val[2];
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke',
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true,
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: "#FFC809",
                                    shadowBlur: 10,
                                    shadowColor: "#FFC809",
                                },
                            },
                            zlevel: 1,
                        },
                        //柱状图
                        {
                            zlevel: 1.5,
                            type: 'bar',
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    color: "#FFC809",
                                },
                            },
                            data: barData[n],
                        },
                    ],
                });
            }

            myChart.setOption(optionXyMap01);
            // 监听浏览器缩放，图表对象调用缩放resize函数
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    })
})();
