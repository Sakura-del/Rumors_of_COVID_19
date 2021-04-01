// 年龄图
(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector("#pie_age"));
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