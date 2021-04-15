//绘制词云图
(function () {
    var myChart = echarts.init(document.querySelector("#word_cloud"));
    $.ajax({
        url: "/rumor/shows",
        type: "GET",
        data: { action: "get_tag_count" },
        dataType: "json",
        success: function (result) {
            console.log(result);
            //接收数据
            var tvalue = [];
            for (var i = 0; i < 50; i++) {
                tvalue.push({
                    name: result["retlist"][i][0],
                    value: Math.sqrt(result["retlist"][i][1])
                })
            }
            var data = {
                value: tvalue,
                image: "data:image/png;base64,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"
            };
            var maskImage = new Image();
            maskImage.src = data.image
            myChart.setOption({
                backgroundColor: '#fff',
                tooltip: {
                    show: false
                },
                series: [{
                    type: 'wordCloud',
                    gridSize: 3,
                    sizeRange: [10, 30],
                    rotationRange: [-45, 0, 45, 90],
                    maskImage: maskImage,
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' +
                                    Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) + ')'
                            }
                        }
                    },
                    // left: null,
                    // top: null,
                    // right: null,
                    // bottom: null,
                    data: data.value
                }]
            })
            window.onresize = function () {
                myChart.resize();
            }
        }
    });
})();
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
  let zhixia_and_district = ["北京", "上海", "天津", "重庆", "香港", "澳门", "台湾"];//直辖市和地区
  let months_range = [];
  let date = new Date();
  let nowyear = date.getFullYear();
  // let nowmonth = date.getMonth() + 1;
  let nowmonth = date.getMonth() + 1 - 2;//目前只有到2月的数据比较齐全
  // let nowdate = nowyear + (nowmonth < 10 ? "0" + nowmonth : nowmonth) + (nowday < 10 ? "0" + nowday : nowday);
  //nowmonth = date.getMonth() + 1;
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
  var base_tooltipdata = [
    { name: "北京", value: [{ name: "谣言数量", value: 0 }] },
    { name: "天津", value: [{ name: "谣言数量", value: 0 }] },
    { name: "河北", value: [{ name: "谣言数量", value: 0 }] },
    { name: "山西", value: [{ name: "谣言数量", value: 0 }] },
    { name: "内蒙古", value: [{ name: "谣言数量", value: 0 }] },
    { name: "辽宁", value: [{ name: "谣言数量", value: 0 }] },
    { name: "吉林", value: [{ name: "谣言数量", value: 0 }] },
    { name: "黑龙江", value: [{ name: "谣言数量", value: 0 }] },
    { name: "上海", value: [{ name: "谣言数量", value: 0 }] },
    { name: "江苏", value: [{ name: "谣言数量", value: 0 }] },
    { name: "浙江", value: [{ name: "谣言数量", value: 0 }] },
    { name: "安徽", value: [{ name: "谣言数量", value: 0 }] },
    { name: "福建", value: [{ name: "谣言数量", value: 0 }] },
    { name: "江西", value: [{ name: "谣言数量", value: 0 }] },
    { name: "山东", value: [{ name: "谣言数量", value: 0 }] },
    { name: "河南", value: [{ name: "谣言数量", value: 0 }] },
    { name: "湖北", value: [{ name: "谣言数量", value: 0 }] },
    { name: "湖南", value: [{ name: "谣言数量", value: 0 }] },
    { name: "重庆", value: [{ name: "谣言数量", value: 0 }] },
    { name: "四川", value: [{ name: "谣言数量", value: 0 }] },
    { name: "贵州", value: [{ name: "谣言数量", value: 0 }] },
    { name: "云南", value: [{ name: "谣言数量", value: 0 }] },
    { name: "西藏", value: [{ name: "谣言数量", value: 0 }] },
    { name: "陕西", value: [{ name: "谣言数量", value: 0 }] },
    { name: "甘肃", value: [{ name: "谣言数量", value: 0 }] },
    { name: "青海", value: [{ name: "谣言数量", value: 0 }] },
    { name: "宁夏", value: [{ name: "谣言数量", value: 0 }] },
    { name: "新疆", value: [{ name: "谣言数量", value: 0 }] },
    { name: "广东", value: [{ name: "谣言数量", value: 0 }] },
    { name: "广西", value: [{ name: "谣言数量", value: 0 }] },
    { name: "海南", value: [{ name: "谣言数量", value: 0 }] },
    { name: "香港", value: [{ name: "谣言数量", value: 0 }] },
    { name: "台湾", value: [{ name: "谣言数量", value: 0 }] },
    { name: "澳门", value: [{ name: "谣言数量", value: 0 }] }
  ];
  var myChart = echarts.init(document.querySelector("#rumor_district"));
  var mapName = "china";

  $.ajax({
    url: "/rumor/shows",
    type: "GET",
    data: { action: "get_location_date_trend" },
    dataType: "json",
    success: function (result) {
      console.log(result);
      nowmonth = stmonth;
      let tmp_month_data = objDeepCopy(basedata);
      let tmp_month_tooltipdata = objDeepCopy(base_tooltipdata);
      let totaldata = [];
      let toolTipData = [];
      for (let key in result["retlist"]) {
        // console.log(key);
        var items = key.split("-");
        var tmpdate = items.join("");
        tmpdate = parseInt(tmpdate);
        // console.log(tmpdate);
        tmpmonth = Math.floor(tmpdate % 10000 / 100);
        // console.log(tmpmonth);
        if (tmpmonth < stmonth && Math.floor(tmpdate / 10000)==nowyear-1) {
          continue;
        }
        
        if (tmpmonth > edmonth && Math.floor(tmpdate / 10000) == nowyear) {
          console.log("最后一次推进来了");
          // totaldata.push(tmp_month_data);
          // toolTipData.push(tmp_month_tooltipdata);
          totaldata.push(tmp_month_data);
          toolTipData.push(tmp_month_tooltipdata);
          break;
        }
        // console.log(String(tmpmonth)+"--"+String(nowmonth));
        if (tmpmonth > nowmonth || (nowmonth == 12 && tmpmonth < 12)) {
          console.log("中间推进来了");
          nowmonth = tmpmonth;
          totaldata.push(tmp_month_data);
          tmp_month_data = objDeepCopy(basedata);

          toolTipData.push(tmp_month_tooltipdata);
          tmp_month_tooltipdata = objDeepCopy(base_tooltipdata);
        }
        for (var i = 0; i < result["retlist"][key].length; i++) {
          var tmpstr = result["retlist"][key][i];
          if (tmpstr.charAt(tmpstr.length - 1) != "市") {
            //省或者直辖市,也可能啥都不是
            for (var m = 0; m < 34; m++) {
              if (tmpstr === tmp_month_data[m]["name"]) {
                tmp_month_data[m]["value"] = tmp_month_data[m]["value"] + 1;
                tmp_month_tooltipdata[m]["value"][0]["value"] = tmp_month_tooltipdata[m]["value"][0]["value"] + 1;
                break;
              }
            }
          }
          else {
            //判断是否属于某个省
            for (var j = 0; j < 34; j++) {
              var flag = 0;
              for (var k = 0; k < citys[j]["city"].length; k++) {
                if (tmpstr == citys[j]["city"][k]) {
                  flag = 1;
                  tmp_month_data[j]["value"] = tmp_month_data[j]["value"] + 1;
                  tmp_month_tooltipdata[j]["value"][0]["value"] = tmp_month_tooltipdata[j]["value"][0]["value"] + 1;
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
      console.log(totaldata);
      console.log(toolTipData);
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

      var option = {
        baseOption: {
          timeline: {
            data: months_range,
            axisType: 'category',
            autoPlay: true,
            playInterval: 3000,
            left: '10%',
            right: '10%',
            bottom: '-2%',
            width: '80%',
            label: {
              normal: {
                textStyle: {
                  color: 'rgb(179, 239, 255)'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            currentIndex: 0,
            symbolSize: 10,
            lineStyle: {
              color: '#8df4f4'
            },
            checkpointStyle: {
              borderColor: '#8df4f4',
              color: '#53D9FF',
              borderWidth: 2,
            },
            controlStyle: {
              showNextBtn: true,
              showPrevBtn: true,
              normal: {
                color: '#53D9FF',
                borderColor: '#53D9FF'
              },
              emphasis: {
                color: 'rgb(58,115,192)',
                borderColor: 'rgb(58,115,192)'
              }
            },
          },
          visualMap: {
            show: true,
            min: 0,
            max: 40,
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
          }
        },
        options: [
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[0].length; i++) {
                    if (params.name == toolTipData[0][i].name) {
                      toolTiphtml += toolTipData[0][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[0][i].value.length; j++) {
                        toolTiphtml += toolTipData[0][i].value[j].name + ':' + toolTipData[0][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[0].length; i++) {
                    if (params.name == toolTipData[0][i].name) {
                      toolTiphtml += toolTipData[0][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[0][i].value.length; j++) {
                        toolTiphtml += toolTipData[0][i].value[j].name + ':' + toolTipData[0][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[0]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[0]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[1].length; i++) {
                    if (params.name == toolTipData[1][i].name) {
                      toolTiphtml += toolTipData[1][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[1][i].value.length; j++) {
                        toolTiphtml += toolTipData[1][i].value[j].name + ':' + toolTipData[1][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[1].length; i++) {
                    if (params.name == toolTipData[1][i].name) {
                      toolTiphtml += toolTipData[1][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[1][i].value.length; j++) {
                        toolTiphtml += toolTipData[1][i].value[j].name + ':' + toolTipData[1][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[1]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[1]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[2].length; i++) {
                    if (params.name == toolTipData[2][i].name) {
                      toolTiphtml += toolTipData[2][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[2][i].value.length; j++) {
                        toolTiphtml += toolTipData[2][i].value[j].name + ':' + toolTipData[2][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[2].length; i++) {
                    if (params.name == toolTipData[2][i].name) {
                      toolTiphtml += toolTipData[2][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[2][i].value.length; j++) {
                        toolTiphtml += toolTipData[2][i].value[j].name + ':' + toolTipData[2][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[2]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[2]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[3].length; i++) {
                    if (params.name == toolTipData[3][i].name) {
                      toolTiphtml += toolTipData[3][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[3][i].value.length; j++) {
                        toolTiphtml += toolTipData[3][i].value[j].name + ':' + toolTipData[3][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[3].length; i++) {
                    if (params.name == toolTipData[3][i].name) {
                      toolTiphtml += toolTipData[3][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[3][i].value.length; j++) {
                        toolTiphtml += toolTipData[3][i].value[j].name + ':' + toolTipData[3][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[3]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[3]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[4].length; i++) {
                    if (params.name == toolTipData[4][i].name) {
                      toolTiphtml += toolTipData[4][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[4][i].value.length; j++) {
                        toolTiphtml += toolTipData[4][i].value[j].name + ':' + toolTipData[4][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[4].length; i++) {
                    if (params.name == toolTipData[4][i].name) {
                      toolTiphtml += toolTipData[4][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[4][i].value.length; j++) {
                        toolTiphtml += toolTipData[4][i].value[j].name + ':' + toolTipData[4][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[4]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[4]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[5].length; i++) {
                    if (params.name == toolTipData[5][i].name) {
                      toolTiphtml += toolTipData[5][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[5][i].value.length; j++) {
                        toolTiphtml += toolTipData[5][i].value[j].name + ':' + toolTipData[5][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[5].length; i++) {
                    if (params.name == toolTipData[5][i].name) {
                      toolTiphtml += toolTipData[5][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[5][i].value.length; j++) {
                        toolTiphtml += toolTipData[5][i].value[j].name + ':' + toolTipData[5][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[5]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[5]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[6].length; i++) {
                    if (params.name == toolTipData[6][i].name) {
                      toolTiphtml += toolTipData[6][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[6][i].value.length; j++) {
                        toolTiphtml += toolTipData[6][i].value[j].name + ':' + toolTipData[6][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[6].length; i++) {
                    if (params.name == toolTipData[6][i].name) {
                      toolTiphtml += toolTipData[6][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[6][i].value.length; j++) {
                        toolTiphtml += toolTipData[6][i].value[j].name + ':' + toolTipData[6][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[6]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[6]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[7].length; i++) {
                    if (params.name == toolTipData[7][i].name) {
                      toolTiphtml += toolTipData[7][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[7][i].value.length; j++) {
                        toolTiphtml += toolTipData[7][i].value[j].name + ':' + toolTipData[7][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[7].length; i++) {
                    if (params.name == toolTipData[7][i].name) {
                      toolTiphtml += toolTipData[7][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[7][i].value.length; j++) {
                        toolTiphtml += toolTipData[7][i].value[j].name + ':' + toolTipData[7][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[7]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[7]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[8].length; i++) {
                    if (params.name == toolTipData[8][i].name) {
                      toolTiphtml += toolTipData[8][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[8][i].value.length; j++) {
                        toolTiphtml += toolTipData[8][i].value[j].name + ':' + toolTipData[8][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[8].length; i++) {
                    if (params.name == toolTipData[8][i].name) {
                      toolTiphtml += toolTipData[8][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[8][i].value.length; j++) {
                        toolTiphtml += toolTipData[8][i].value[j].name + ':' + toolTipData[8][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[8]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[8]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[9].length; i++) {
                    if (params.name == toolTipData[9][i].name) {
                      toolTiphtml += toolTipData[9][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[9][i].value.length; j++) {
                        toolTiphtml += toolTipData[9][i].value[j].name + ':' + toolTipData[9][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[9].length; i++) {
                    if (params.name == toolTipData[9][i].name) {
                      toolTiphtml += toolTipData[9][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[9][i].value.length; j++) {
                        toolTiphtml += toolTipData[9][i].value[j].name + ':' + toolTipData[9][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[9]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[9]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[10].length; i++) {
                    if (params.name == toolTipData[10][i].name) {
                      toolTiphtml += toolTipData[10][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[10][i].value.length; j++) {
                        toolTiphtml += toolTipData[10][i].value[j].name + ':' + toolTipData[10][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[10].length; i++) {
                    if (params.name == toolTipData[10][i].name) {
                      toolTiphtml += toolTipData[10][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[10][i].value.length; j++) {
                        toolTiphtml += toolTipData[10][i].value[j].name + ':' + toolTipData[10][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[10]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[10]
              }
            ]
          },
          {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[11].length; i++) {
                    if (params.name == toolTipData[11][i].name) {
                      toolTiphtml += toolTipData[11][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[11][i].value.length; j++) {
                        toolTiphtml += toolTipData[11][i].value[j].name + ':' + toolTipData[11][i].value[j].value + "<br>"
                      }
                    }
                  }
                  // console.log(convertData(data))
                  return toolTiphtml;
                }
                else {
                  var toolTiphtml = ''
                  for (var i = 0; i < toolTipData[11].length; i++) {
                    if (params.name == toolTipData[11][i].name) {
                      toolTiphtml += toolTipData[11][i].name + ':<br>'
                      for (var j = 0; j < toolTipData[11][i].value.length; j++) {
                        toolTiphtml += toolTipData[11][i].value[j].name + ':' + toolTipData[11][i].value[j].value + "<br>"
                      }
                    }
                  }
                  return toolTiphtml;
                }
              }
            },
            series: [
              {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(totaldata[11]),
                symbolSize: function (val) {
                  return val[2];
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
                    color: 'rgba(255,255,255,1)',
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
                data: totaldata[11]
              }
            ]
          }
        ]
      }
      myChart.setOption(option);
      // 监听浏览器缩放，图表对象调用缩放resize函数
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  })
})();