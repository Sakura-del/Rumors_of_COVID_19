// 年龄分布图
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector("#pie_age"));
  // 2.指定配置
  var option = {
    // color: ["#065aab", "#066eab", "#0672ab", "#0686ab", "#06a0ab", "#06baab", "#06ceab", "#06d2ab", "#0686ab"],

    //颜色什么的直接用默认值，区分度高，但有点丑...
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    legend: {
      top: "82%",
      bottom: "0%",
      // 修改小图标的大小
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: "#73879C",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "年龄分布",
        type: "pie",
        // 这个radius可以修改饼形图的大小
        // radius 第一个值是内圆的半径 第二个值是外圆的半径
        radius: ["48%", "68%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        // 图形上的文字
        label: {
          show: false,
          position: "center"
        },
        // 链接文字和图形的线是否显示
        labelLine: {
          show: false
        },
        data: [
          { value: 416, name: "0-10岁" },
          { value: 549, name: "10-20岁" },
          { value: 3619, name: "20-30岁" },
          { value: 7600, name: "30-40岁" },
          { value: 8571, name: "40-50岁" },
          { value: 10008, name: "50-60岁" },
          { value: 8583, name: "60-70岁" },
          { value: 3918, name: "70-80岁" },
          { value: 1408, name: "80岁以上" }
        ]
      }
    ]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });

})();


// 职业分布图
(function () {

  var myChart = echarts.init(document.querySelector("#pie_job"));
  var option = {
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff"
      // "#9fe6b8",
      // "#32c5e9",
      // "#1d9dff"
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      top: "92%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#73879C",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "职业分布",
        type: "pie",
        radius: ["10%", "70%"],
        center: ["50%", "50%"],
        roseType: "radius",
        // 图形的文字标签
        label: {
          fontSize: 10
        },
        // 链接图形和文字的线条
        labelLine: {
          // length 链接图形的线条
          length: 6,
          // length2 链接文字的线条
          length2: 8
        },
        data: [
          { value: 3449, name: "服务业" },
          { value: 9811, name: "农民/工人" },
          { value: 1716, name: "医务人员" },
          { value: 9193, name: "退休人员" },
          { value: 20503, name: "其它" }
        ]
      }
    ]
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();





// 现存确诊人数前5的省份
(function () {
  //获取各省数据
  let provinces = [];
  let current_confirms = [];
  var total_current_confirm = 0;
  let percentages = [];
  $.ajax({
    url: "/covid/current",
    type: "GET",
    data: { action: "list_current_provinces" },
    dataType: "json",
    success: function (result) {
      for (var i = 0; i < 5; i++) {
        provinces.push(result["data"][i]["province"]);
        current_confirms.push(result["data"][i]["overall_data"]["current_confirmed"]);
      }
      for (var j = 0; j < 34; j++) {
        total_current_confirm += result["data"][i]["overall_data"]["current_confirmed"];
      }
      var myColor = ["#1ABB9C"];
      // 1. 实例化对象
      var myChart = echarts.init(document.querySelector("#top5_provinces"));
      for (var i = 0; i < 5; i++) {
        percentages[i] = current_confirms[i] / total_current_confirm * 100;
      }
      var option = {
        grid: {
          top: "2%",
          left: "12%",
          bottom: "2%"
          // containLabel: true
        },
        // 不显示x轴的相关信息
        xAxis: {
          show: false
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            data: provinces,
            // 不显示y轴的线
            axisLine: {
              show: false
            },
            // 不显示刻度
            axisTick: {
              show: false
            },
            // 设置刻度标签颜色
            axisLabel: {
              color: "#73879C",
            }
          },
          {
            data: current_confirms,
            inverse: true,
            // 不显示y轴的线
            axisLine: {
              show: false
            },
            // 不显示刻度
            axisTick: {
              show: false
            },
            // 把刻度标签里面的文字颜色设置为白色
            axisLabel: {
              color: "#73879C",
            }
          }
        ],
        series:
          [
            {
              name: "条",
              type: "bar",
              data: percentages,
              yAxisIndex: 0,
              // 修改第一组柱子的圆角
              itemStyle: {
                barBorderRadius: 15,
                // 此时的color 可以修改柱子的颜色
                color: function (params) {
                  // params 传进来的是柱子对象
                  // console.log(params);
                  // dataIndex 是当前柱子的索引号
                  return myColor[params.dataIndex];
                }
              },
              // 柱子之间的距离
              barCategoryGap: 50,
              //柱子的宽度
              barWidth: 12,
              // 显示柱子内的文字   简洁一点，不用显示
              label: {
                show: false,
                position: "inside",
                // {c} 会自动的解析为 数据  data里面的数据
                formatter: "{c}%"
              }
            },
            {
              name: "框",
              type: "bar",
              barCategoryGap: 50,
              barWidth: 15,
              yAxisIndex: 1,
              data: [100, 100, 100, 100, 100],
              itemStyle: {
                color: "none",
                borderColor: "#73879C",
                borderWidth: 2,
                barBorderRadius: 15
              }
            }
          ]
      };

      // 3. 把配置给实例对象
      myChart.setOption(option);
      // 4. 让图表跟随屏幕自动的去适应
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    error: function () {
      alert("failed to get data of all provinces!");
    }
  });

})();



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

// 变化趋势图
(function () {
  let xAxiscontent = [];
  let days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let xAxis_days = [];
  let xAxis_months = [];
  let date = new Date();
  let nowyear = date.getFullYear();
  // let nowmonth = date.getMonth() + 1;
  let nowmonth = date.getMonth() + 1 - 1;//测试用，数据库只有到3月份的数据
  let nowday = date.getDate();
  let nowdate = nowyear + (nowmonth < 10 ? "0" + nowmonth : nowmonth) + (nowday < 10 ? "0" + nowday : nowday);
  //最近12天的日期
  for (var i = 0; i < 12; i++) {
    var tmp = String(nowmonth) + "/" + String(nowday);
    xAxis_days.unshift(tmp);
    nowday = nowday - 1;
    if (nowday === 0) {
      nowmonth = nowmonth - 1;
      if (nowmonth === 0) {
        nowmonth = 12;
        nowyear = nowyear - 1;
      }
      nowday = days_in_month[nowmonth - 1];
    }
  }
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
  xAxiscontent.push(xAxis_days);
  xAxiscontent.push(xAxis_months);
  let totaldata =
    [
      {
        name: "day",
        data: []
      },
      {
        name: "month",
        data: []
      }
    ]
  $.ajax({
    url: "/covid/daily",
    type: "GET",
    data: { action: "get_daily_internal" },
    dataType: "json",
    success: function (result) {
      // console.log(result);
      // console.log(result["data"][result["data"].length-1]);
      var idx;
      for (idx = result["data"].length - 1; ; idx--) {
        if (String(result["data"][idx]["dateId"]) === nowdate)
          break;
      }
      let incr_confirm_day = [];
      let incr_suspect_day = [];
      let incr_cured_day = [];
      //填充近12天
      for (var i = 0; i < 12; i++) {
        incr_confirm_day.unshift(result["data"][idx - i]["confirmedIncr"]);
        incr_suspect_day.unshift(result["data"][idx - i]["suspectedCountIncr"]);
        incr_cured_day.unshift(result["data"][idx - i]["curedIncr"]);
      }
      totaldata[0]["data"].push(incr_confirm_day);
      totaldata[0]["data"].push(incr_suspect_day);
      totaldata[0]["data"].push(incr_cured_day);

      //填充近12个月
      for (idx = 0; ; idx++) {
        // console.log(result["data"][idx]["dateId"]);
        if (Math.floor(result["data"][idx]["dateId"] % 10000 / 100) === stmonth) {
          break;
        }
      }
      let incr_confirm_month = [];
      let incr_suspect_month = [];
      let incr_cured_month = [];
      let sum1 = 0, sum2 = 0, sum3 = 0;
      let monthnow = stmonth;
      for (var i = idx; i < result["data"].length; i++) {
        if (monthnow != Math.floor(result["data"][i]["dateId"] % 10000 / 100)) {
          incr_confirm_month.push(sum1);
          incr_suspect_month.push(sum2);
          incr_cured_month.push(sum3);
          sum1 = 0;
          sum2 = 0;
          sum3 = 0;
          monthnow = monthnow + 1;
          if (monthnow > 12) {
            monthnow = 1;
          }
        }
        sum1 += result["data"][i]["confirmedIncr"];
        sum2 += result["data"][i]["suspectedCountIncr"];
        sum3 += result["data"][i]["curedIncr"];
        if (monthnow === edmonth && (result["data"][i]["dateId"] % 10000 % 100 > nowday || i == result["data"].length - 1)) {
          incr_confirm_month.push(sum1);
          incr_suspect_month.push(sum2);
          incr_cured_month.push(sum3);
          break;
        }
      }
      totaldata[1]["data"].push(incr_confirm_month);
      totaldata[1]["data"].push(incr_suspect_month);
      totaldata[1]["data"].push(incr_cured_month);
      // console.log(totaldata);
      // 1. 实例化对象
      var myChart = echarts.init(document.querySelector("#change_trend"));
      // 2.指定配置
      var option = {
        // 通过这个color修改3条线的颜色
        color: ["#FF7070", "#FFDC60", "#9FE080"],
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
          right: "3%",
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
        series: [
          {
            name: "新增确诊",
            type: "line",
            // true 可以让折线显示带有弧度
            // smooth: true,
            data: totaldata[0].data[0]
          },
          {
            name: "新增境外输入",
            type: "line",
            // smooth: true,
            data: totaldata[0].data[1]
          },
          {
            name: "新增治愈",
            type: "line",
            // smooth: true,
            data: totaldata[0].data[2]
          }
        ]
      };

      // 3. 把配置给实例对象
      myChart.setOption(option);
      // 4. 让图表跟随屏幕自动的去适应
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      // 5.点击切换效果
      $("#switcher_row").on("click", "a", function () {
        // alert(1);
        // console.log($(this).index());
        // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
        // console.log(yearData[$(this).index()]);
        var obj = totaldata[$(this).index()];
        option.xAxis.data = xAxiscontent[$(this).index()];
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        option.series[2].data = obj.data[2];
        // 需要重新渲染
        myChart.setOption(option);
      });

    }
  });
  // console.log(totaldata);
  // console.log(xAxiscontent);
})();

(function () {
  $.ajax({
    url: "/covid/current",
    type: "GET",
    data: { action: "list_current_internal" },
    dataType: "json",
    success: function (result) {
      // console.log(result);
      var val1 = result["currentConfirmedCount"];
      $("#val1").html(formatNum(String(val1)));
      var incr1 = result["currentConfirmedIncr"];
      if (incr1 >= 0) {
        incr1 = "+" + String(incr1);
      }
      else {
        incr1 = String(incr1);
      }
      $("#incr1").html(incr1 + " ");
      var val2 = result["suspectedCount"];
      $("#val2").html(formatNum(String(val2)));
      var incr2 = result["suspectedCountIncr"];
      if (incr2 >= 0) {
        incr2 = "+" + String(incr2);
      }
      else {
        incr2 = String(incr2);
      }
      $("#incr2").html(incr2 + " ");
      var val3 = result["currentAsymCount"];
      $("#val3").html(formatNum(String(val3)));
      var incr3 = result["currentAsymIncr"];
      if (incr3 >= 0) {
        incr3 = "+" + String(incr3);
      }
      else {
        incr3 = String(incr3);
      }
      $("#incr3").html(incr3 + " ");
      var val4 = result["confirmedCount"];
      $("#val4").html(formatNum(String(val4)));
      var incr4 = result["confirmedIncr"];
      if (incr4 >= 0) {
        incr4 = "+" + String(incr4);
      }
      else {
        incr4 = String(incr4);
      }
      $("#incr4").html(incr4 + " ");
      var val5 = result["curedCount"];
      $("#val5").html(formatNum(String(val5)));
      var incr5 = result["curedIncr"];
      if (incr5 >= 0) {
        incr5 = "+" + String(incr5);
      }
      else {
        incr5 = String(incr5);
      }
      $("#incr5").html(incr5 + " ");
      var val6 = result["deadCount"];
      $("#val6").html(formatNum(String(val6)));
      var incr6 = result["deadIncr"];
      if (incr6 >= 0) {
        incr6 = "+" + String(incr6);
      }
      else {
        incr6 = String(incr6);
      }
      $("#incr6").html(incr6 + " ");
    }
  })
})();

//累计确诊变化图
//2020年2月至现在，每月一变
(function () {
  let xAxis_content = ["2020/2", "2020/3", "2020/4", "2020/5", "2020/6", "2020/7", "2020/8", "2020/9", "2020/10", "2020/11", "2020/12", "2021/1", "2021/2", "2021/3"];
  let confirmed_data = [];
  let stmonth = 2;
  let edmonth = 3;
  $.ajax({
    url: "/covid/daily",
    type: "GET",
    data: { action: "get_daily_internal" },
    dataType: "json",
    success: function (result) {
      console.log(result["data"]);
      for (var i = 0; i < result["data"].length; i++) {
        var yy = Math.floor(result["data"][i]["dateId"] / 10000);
        var mm = Math.floor(result["data"][i]["dateId"] % 10000 / 100);
        var dd = result["data"][i]["dateId"] % 10000 % 100;
        if (mm < stmonth && yy == 2020) {
          continue;
        }
        // console.log(result["data"][i]["confirmedCount"]);
        
        if (dd == 1) {
          confirmed_data.push(result["data"][i]["confirmedCount"]);
        }
        else {
          if(mm == edmonth && yy == 2021){
            break;
          }
        }
      }
      console.log(confirmed_data);
      console.log(xAxis_content);
      var myChart = echarts.init(document.querySelector("#total_confirm_trend"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: "3%",
          right:"0.5%",
          data: ["累计确诊"],
          textStyle: {
            color: "#73879C",
            fontSize: "12"
          }
        },

        grid: {
          left: "0",
          top: "30",
          right: "7.5",
          bottom: "0",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // x轴更换数据
            data: xAxis_content,
            // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
            axisLabel: {
              textStyle: {
                color: "#73879C",
                fontSize: 12
              }
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
              lineStyle: {
                color: "#73879C"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "#73879C"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#73879C",
                fontSize: 12
              }
            },
            // 修改分割线的颜色
            splitLine: {
              lineStyle: {
                color: "#73879C"
              }
            }
          }
        ],
        series: {
          name: "累计确诊",
          type: "line",
          smooth: false,
          // 单独修改当前线条的样式
          lineStyle: {
            color: "#0184d5",
            width: "2"
          },
          // 填充颜色设置
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          },
          // 设置拐点
          symbol: "circle",
          // 拐点大小
          symbolSize: 8,
          // 开始不显示拐点， 鼠标经过显示
          showSymbol: false,
          // 设置拐点颜色以及边框
          itemStyle: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          },
          data: confirmed_data
        }
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  });
})();
