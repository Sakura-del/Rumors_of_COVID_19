var father_div_news_content = document.getElementById("news_content");//插新闻的地方

//一开始加载健康的前10条
(function () {
    $.ajax({
        url: "/covid/news",
        type: "GET",
        data: { action: "load_more_news", field: "健康", pagesize: 10, pagenum: 1 },
        dataType: "json",
        success: function (result) {
            console.log(result);
            for (var i = 0; i < result["retlist"].length; i++) {
                var newrow = document.createElement("div");
                newrow.className = "col-md-12 col-sm-12";

                var newdate = document.createElement("div");
                newdate.className = "col-md-2 col-sm-2 tmp_date";
                newdate.innerHTML = result["retlist"][i]["date"];
                newrow.appendChild(newdate);

                var newtitle = document.createElement("div");
                newdate.className = "col-md-4 col-sm-4 tmp_title";
                newdate.innerHTML = result["retlist"][i]["title"];
                newrow.appendChild(newtitle);

                var newsummary = document.createElement("div");
                newsummary.className = "col-md-6 col-sm-6 tmp_summary";
                newsummary.innerHTML = result["retlist"][i]["summary"];
                newrow.appendChild(newsummary);

                father_div_news_content.appendChild(newrow);
            }
        }
    })
})();


var tag_idx = 0;//初始加载的是“健康”标签下的内容
var page_id = 1;//初始都是第一页
var tags = ["健康", "疫苗", "国内", "国际", "娱乐", "房产", "探索", "教育", "新鲜事", "旅游", "汽车", "社会", "艺术", "财经"];

//点击标签时，加载该标签下第一页的10条新闻
(function () {
    $("#switcher_row").on("click", "a", function () {
        // alert(1);
        // console.log($(this).index());
        // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
        // console.log(yearData[$(this).index()]);
        var new_idx = $(this).index();
        tag_idx = new_idx;
        var new_tag_name = tags[tag_idx];
        page_id = 1;
        $.ajax({
            url: "/covid/news",
            type: "GET",
            data: { action: "load_more_news", field: new_tag_name, pagesize: 10, pagenum: 1 },
            dataType: "json",
            success: function (result) {
                console.log(result);
                father_div_news_content.innerHTML = "";//清空原先数据
                for (var i = 0; i < result["retlist"].length; i++) {
                    var newrow = document.createElement("div");
                    newrow.className = "col-md-12 col-sm-12";

                    var newdate = document.createElement("div");
                    newdate.className = "col-md-2 col-sm-2 tmp_date";
                    newdate.innerHTML = result["retlist"][i]["date"];
                    newrow.appendChild(newdate);

                    var newtitle = document.createElement("div");
                    newdate.className = "col-md-4 col-sm-4 tmp_title";
                    newdate.innerHTML = result["retlist"][i]["title"];
                    newrow.appendChild(newtitle);

                    var newsummary = document.createElement("div");
                    newsummary.className = "col-md-6 col-sm-6 tmp_summary";
                    newsummary.innerHTML = result["retlist"][i]["summary"];
                    newrow.appendChild(newsummary);

                    father_div_news_content.appendChild(newrow);
                }
            }
        })
    });
})();


//触底则加载当前
(function () {
    $(document).ready(function () {
        var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
        var nScrollTop = 0;   //滚动到的当前位置
        var nDivHight = $("#news_content").height();
        $("#news_content").scroll(function () {
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
                page_id += 1;
                $.ajax({
                    url: "/covid/news",
                    type: "GET",
                    data: { action: "load_more_news", field: tags[tag_idx], pagesize: 10, pagenum: page_id },
                    dataType: "json",
                    success: function (result) {
                        if (result["total"] > 0) {
                            for (var i = 0; i < result["retlist"].length; i++) {
                                var newrow = document.createElement("div");
                                newrow.className = "col-md-12 col-sm-12";

                                var newdate = document.createElement("div");
                                newdate.className = "col-md-2 col-sm-2 tmp_date";
                                newdate.innerHTML = result["retlist"][i]["date"];
                                newrow.appendChild(newdate);

                                var newtitle = document.createElement("div");
                                newdate.className = "col-md-4 col-sm-4 tmp_title";
                                newdate.innerHTML = result["retlist"][i]["title"];
                                newrow.appendChild(newtitle);

                                var newsummary = document.createElement("div");
                                newsummary.className = "col-md-6 col-sm-6 tmp_summary";
                                newsummary.innerHTML = result["retlist"][i]["summary"];
                                newrow.appendChild(newsummary);

                                father_div_news_content.appendChild(newrow);
                            }
                        }
                    }
                })
            }
        });
    });
    // $(window).on('scroll', function () {
    //     var scrollTop = $(window).scrollTop(); //滚动的高度
    //     var height = $(window).height(); // 屏幕的高度
    //     var docHeight = $(document).height();
    //     if ((scrollTop + height) == docHeight) {
    //         page_id += 1;
    //         $.ajax({
    //             url: "/covid/news",
    //             type: "GET",
    //             data: { action: "load_more_news", field: tags[tag_idx], pagesize: 10, pagenum: page_id },
    //             dataType: "json",
    //             success: function (result) {
    //                 if (result["total"] > 0) {
    //                     for (var i = 0; i < result["retlist"].length; i++) {
    //                         var newrow = document.createElement("div");
    //                         newrow.className = "col-md-12 col-sm-12";

    //                         var newdate = document.createElement("div");
    //                         newdate.className = "col-md-2 col-sm-2 tmp_date";
    //                         newdate.innerHTML = result["retlist"][i]["date"];
    //                         newrow.appendChild(newdate);

    //                         var newtitle = document.createElement("div");
    //                         newdate.className = "col-md-4 col-sm-4 tmp_title";
    //                         newdate.innerHTML = result["retlist"][i]["title"];
    //                         newrow.appendChild(newtitle);

    //                         var newsummary = document.createElement("div");
    //                         newsummary.className = "col-md-6 col-sm-6 tmp_summary";
    //                         newsummary.innerHTML = result["retlist"][i]["summary"];
    //                         newrow.appendChild(newsummary);

    //                         father_div_news_content.appendChild(newrow);
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // })
})();
