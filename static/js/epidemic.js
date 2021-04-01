// 柱状图模块1
(function() {
  // 1实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 2. 指定配置项和数据
  var option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // 修改图表的大小
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: [
          "湖北省",
          "湖南省",
          "江苏省",
          "山东省",
          "新疆省",
          "广东省",
          "江西省"
        ],
        axisTick: {
          alignWithLabel: true
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12"
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 2
          }
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "现存确诊",
        type: "bar",
        barWidth: "35%",
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5
        }
      }
    ]
  };
  // 3. 把配置项给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
// 柱状图2
(function() {
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6", "#1089E7"];
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".bar2 .chart"));
  // 2. 指定配置和数据
  var option = {
    grid: {
      top: "10%",
      left: "16%",
      bottom: "10%"
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
        data: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲","大洋洲"],
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
          color: "rgba(255,255,255,.6)",
        }
      },
      {
        data: [100, 200, 300, 400, 500, 600],
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
          color: "rgba(255,255,255,.6)",
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        data: [16, 26, 36, 25, 50, 10],
        yAxisIndex: 0,
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          // 此时的color 可以修改柱子的颜色
          color: function(params) {
            // params 传进来的是柱子对象
            // console.log(params);
            // dataIndex 是当前柱子的索引号
            return myColor[params.dataIndex];
          }
        },
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        // 显示柱子内的文字
        label: {
          show: true,
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
        data: [100, 100, 100, 100, 100, 100],
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          barBorderRadius: 15
        }
      }
    ]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
// 折线图1模块制作
(function() {

  var yearData = [
    {
      year: "2020", // 年份
      data: [
        // 两个数组是因为有两条线
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ]
    },
    {
      year: "2021", // 年份
      data: [
        // 两个数组是因为有两条线
        [123, 175, 112, 197],
        [143, 131, 165, 123]
      ]
    }
  ];
  var xAxiscontent = [
      ["1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"],
      ["1月",
      "2月",
      "3月",
      "4月"]
  ];
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".line .chart"));
  // 2.指定配置
  var option = {
    // 通过这个color修改两条线的颜色
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      trigger: "axis"
    },
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: "rgba(255,255,255,.6)",
      },
      // 这个10% 必须加引号
      right: "10%"
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true, // 显示边框
      borderColor: "#012f4a", // 边框颜色
      containLabel: true // 包含刻度文字在内
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月"
      ],
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "rgba(255,255,255,.6)",
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
        color: "rgba(255,255,255,.6)",
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a" // 分割线颜色
        }
      }
    },
    series: [
      {
        name: "国内新增",
        type: "line",
        // true 可以让折线显示带有弧度
        smooth: true,
        data: yearData[1].data[0]
      },
      {
        name: "全球新增",
        type: "line",
        smooth: true,
        data: yearData[1].data[1]
      }
    ]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });

  // 5.点击切换效果
  $(".line h2").on("click", "a", function() {
    // alert(1);
    // console.log($(this).index());
    // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
    // console.log(yearData[$(this).index()]);
    var obj = yearData[$(this).index()];
    option.xAxis.data = xAxiscontent[$(this).index()];
    option.series[0].data = obj.data[0];
    option.series[1].data = obj.data[1];
    // 需要重新渲染
    myChart.setOption(option);
  });
})();
// 折线图2 模块制作
(function() {
  var China_global_data = [
    {
      id: "China", // 国内
      data: [
        // 两个数组是因为有两条线
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120, 100, 150, 70, 60],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79, 100, 150, 70, 60]
      ]
    },
    {
      id: "Global", // 全球
      data: [
        // 两个数组是因为有两条线
        [324, 440, 101, 134, 190, 230, 210, 230, 120, 230, 110, 120, 100, 150, 70, 60],
        [40, 64, 191, 324, 290, 430, 310, 213, 180, 300, 180, 179, 100, 250, 70, 60]
      ]
    }
  ];
  var myChart = echarts.init(document.querySelector(".line2 .chart"));
  var option = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      top: "0%",
      data: ["累计死亡", "累计治愈"],
      textStyle: {
        color: "rgba(255,255,255,.6)",
        fontSize: "12"
      }
    },

    grid: {
      left: "12",
      top: "30",
      right: "20",
      bottom: "10",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        // x轴更换数据
        data: [
          "2020.1",
          "2020.2",
          "2020.3",
          "2020.4",
          "2020.5",
          "2020.6",
          "2020.7",
          "2020.8",
          "2020.9",
          "2020.10",
          "2020.11",
          "2020.12",
          "2021.1",
          "2021.2",
          "2021.3",
          "2021.4"
        ],
        // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        // x轴线的颜色为   rgba(255,255,255,.2)
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
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
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        // 修改分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "累计死亡",
        type: "line",
        smooth: true,
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
        data: [
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          30,
          40,
          30,
          40,
          30,
          40
        ]
      },
      {
        name: "累计治愈",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: [
          130,
          10,
          20,
          40,
          30,
          40,
          80,
          60,
          20,
          40,
          90,
          40,
          20,
          140,
          30,
          40
        ]
      }
    ]
  };
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });

  // 5.点击切换效果
  $(".line2 h2").on("click", "a", function() {
    var obj = China_global_data[$(this).index()];
    option.series[0].data = obj.data[0];
    option.series[1].data = obj.data[1];
    // 需要重新渲染
    myChart.setOption(option);
  });
})();
// 饼形图1
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  // 2.指定配置
  var option = {
    color: ["#065aab", "#066eab", "#0672ab", "#0686ab", "#06a0ab","#06baab", "#06ceab", "#06d2ab", "#0686ab"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    legend: {
      bottom: "0%",
      // 修改小图标的大小
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "年龄分布",
        type: "pie",
        // 这个radius可以修改饼形图的大小
        // radius 第一个值是内圆的半径 第二个值是外圆的半径
        radius: ["40%", "60%"],
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
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

// 饼形图2 地区分布模块
(function() {

  var myChart = echarts.init(document.querySelector(".pie2 .chart"));
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
      bottom: "0%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
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
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();


// 模拟确诊地图
(function () {
  var myChart = echarts.init(document.querySelector(".map .chart"));
  // 秋雁南飞：
  // 此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果
  // 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
  // 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
  // http://echarts.baidu.com/option.html#series-map.geoIndex
  // 并且加了pin气泡图标以示数值大小
  // // 全局变量区:参考江西绿色金融（谢谢：本来想用闭包实现接口数据调用，没时间了）

  // 本图作者：参考秋雁南飞的《投票统计》一图，网址：http://gallery.echartsjs.com/editor.html?c=xrJU-aE-LG
  var name_title = "中国人民大学2017年各省市计划录取人数"
  var subname = '数据爬取自千栀网\n，\n上海、浙江无文理科录取人数'
  var nameColor = " rgb(55, 75, 113)"
  var name_fontFamily = '等线'
  var subname_fontSize = 15
  var name_fontSize = 18
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
    data: {action:"list_current_provinces"},
    dataType: "json",
    success: function(result) {
      var len=Object.keys(result["data"]).length;
      for(var i=0;i<len;i++){
        var tid=data.findIndex(obj=>obj["name"]==result["data"][i]["province"]);
        if(tid>=0) {
          data[tid]["value"]=result["data"][i]["overall_data"]["current_confirmed"];

          //console.log(data[tid]["value"]);
          toolTipData[tid]["value"][0]["value"]=result["data"][i]["overall_data"]["current_confirmed"];
          toolTipData[tid]["value"][1]["value"]=result["data"][i]["overall_data"]["confirmed"];
          toolTipData[tid]["value"][2]["value"]=result["data"][i]["overall_data"]["cured"];
          toolTipData[tid]["value"][3]["value"]=result["data"][i]["overall_data"]["death"];
        }
      }
    },
    error:function (){
      alert("failed to get data of all provinces!");
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
        color: "rgba(255,255,255,.6)",
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
            show: true
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#120a3a',
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
      // {
      //   name: '点',
      //   type: 'scatter',
      //   coordinateSystem: 'geo',
      //   symbol: 'pin', //气泡
      //   symbolSize: function (val) {
      //     var a = (maxSize4Pin - minSize4Pin) / (max - min);
      //     var b = minSize4Pin - a * min;
      //     b = maxSize4Pin - a * max;
      //     return a * val[2] + b;
      //   },
      //   label: {
      //     normal: {
      //       show: true,
      //       textStyle: {
      //         color: '#fff',
      //         fontSize: 9,
      //       }
      //     }
      //   },
      //   itemStyle: {
      //     normal: {
      //       color: '#F62157', //标志颜色
      //     }
      //   },
      //   zlevel: 6,
      //   data: convertData(data),
      // },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.sort(function (a, b) {
          return a.value < b.value;
        }).slice(0, 1)),
        symbolSize: function (val) {
          return val[2] / 10;
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: 'yellow',
            shadowBlur: 10,
            shadowColor: 'yellow',
          }
        },
        zlevel: 1
      },

    ]
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

