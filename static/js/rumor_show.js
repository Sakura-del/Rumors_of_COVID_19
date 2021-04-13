// //绘制词云图
// (function () {
//     var myChart = echarts.init(document.querySelector("#word_cloud"));
//     $.ajax({
//         url: "/rumor/shows",
//         type: "GET",
//         data: { action: "get_tag_count" },
//         dataType: "json",
//         success: function (result) {
//             console.log(result);
//             //接收数据
//             var tvalue = [];
//             for (var i = 0; i < result["retlist"].length; i++) {
//                 tvalue.push({
//                     name: result["retlist"][i][0],
//                     value: Math.sqrt(result["retlist"][i][1])
//                 })
//             }
//             var data = {
//                 value: tvalue,
//                 image: "data:image/png;base64,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"
//             };
//             var maskImage = new Image();
//             maskImage.src = data.image
//             myChart.setOption({
//                 backgroundColor: '#fff',
//                 tooltip: {
//                     show: false
//                 },
//                 series: [{
//                     type: 'wordCloud',
//                     gridSize: 3,
//                     sizeRange: [10, 30],
//                     rotationRange: [-45, 0, 45, 90],
//                     maskImage: maskImage,
//                     textStyle: {
//                         normal: {
//                             color: function () {
//                                 return 'rgb(' +
//                                     Math.round(Math.random() * 255) +
//                                     ', ' + Math.round(Math.random() * 255) +
//                                     ', ' + Math.round(Math.random() * 255) + ')'
//                             }
//                         }
//                     },
//                     // left: null,
//                     // top: null,
//                     // right: null,
//                     // bottom: null,
//                     data: data.value
//                 }]
//             })
//             window.onresize = function () {
//                 myChart.resize();
//             }
//         }
//     });
// })();

// (function(){
//     var myChart=document.querySelector("#rumors_num_change");
//     // $.ajax({

//     // })
// })();

(function () {

    let xAxiscontent = [];
    let days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let xAxis_months = [];
    let date = new Date();
    let nowyear = date.getFullYear();
    // let nowmonth = date.getMonth() + 1;
    let nowmonth = date.getMonth() + 1 - 1;//测试用，数据库只有到3月份的数据
    let nowday = date.getDate();
    let nowdate = nowyear + (nowmonth < 10 ? "0" + nowmonth : nowmonth) + (nowday < 10 ? "0" + nowday : nowday);
    //nowmonth = date.getMonth() + 1;
    nowmonth = date.getMonth() + 1 - 1;//测试用，数据库只有到3月份的数据
    nowday = date.getDate();
    nowyear = date.getFullYear();
    let stmonth, edmonth;
    //最近12个月
    for (var i = 0; i < 12; i++) {
        if (i === 0) {
            edmonth = nowmonth;
        }
        if (i === 11) {
            stmonth = nowmonth;
        }
        var tmp = String(nowyear) + "/" + String(nowmonth);
        xAxis_months.unshift(tmp);
        nowmonth = nowmonth - 1;
        if (nowmonth === 0) {
            nowmonth = 12;
            nowyear = nowyear - 1;
        }
    }
    xAxiscontent.push(xAxis_months);
    let totaldata = { name: "month", data: [] }
    $.ajax({
        url: "/rumor/shows",
        type: "GET",
        data: { action: "get_count_trend" },
        dataType: "json",
        success: function (result) {
            var idx;
            for (idx = 0; ; idx++) {
                // console.log(result["data"][idx]["dateId"]);
                var datestr = result["retlist"][idx]["date"];
                var items = datestr.split("-");
                var newdatestr = items.join("");
                var datenum = parseInt(newdatestr);
                if (Math.floor(datenum % 10000 / 100) === stmonth) {
                    break;
                }
            }
            let rumors_month = [];
            let rumors_sum = 0;
            let monthnow = stmonth;
            for (var i = idx; i < result["retlist"].length; i++) {
                var datestr = result["retlist"][i]["date"];
                var items = datestr.split("-");
                var newdatestr = items.join("");
                var datenum = parseInt(newdatestr);
                if (monthnow != Math.floor(datenum % 10000 / 100)) {
                    rumors_month.push(rumors_sum);
                    rumors_sum = 0;
                    monthnow = monthnow + 1;
                    if (monthnow > 12) {
                        monthnow = 1;
                    }
                }
                rumors_sum += result["retlist"][i]["rumor_count"];
                if (monthnow === edmonth && (datenum % 10000 % 100 > nowday || i == result["retlist"].length - 1)) {
                    rumors_month.push(rumors_sum);
                    break;
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
                    right: "2.5%",
                },
                grid: {
                    top: "10%",
                    left: "0%",
                    right: "1%",
                    bottom: "0%",
                    show: true, // 显示边框
                    borderColor: "#73879C", // 边框颜色
                    containLabel: true // 包含刻度文字在内
                },

                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: xAxiscontent[0],
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLabel: {
                        fontSize: 14,
                        color: "#73879C",
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
                series: {
                    name: "谣言数量",
                    type: "line",
                    // true 可以让折线显示带有弧度
                    // smooth: true,
                    data: rumors_month
                }
            };

            // 3. 把配置给实例对象
            myChart.setOption(option);
            // 4. 让图表跟随屏幕自动的去适应
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    })
})();


(function () {
    $.ajax({
        url: "/rumor/shows",
        type: "GET",
        data: { action: "get_location_date_trend" },
        dataType: "json",
        success:function(result){
            console.log(result);
        }
    })
})();