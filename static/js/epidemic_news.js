//一开始加载健康的前10条
(function () {
    $.ajax({
        url: "/covid/news",
        type: "GET",
        data: {
            action: "load_more_news",
            field: "健康",
            pagesize: 10,
            pagenum: 1
        },
        dataType: "json",
        success: function (result) {
            news_container_div = document.getElementById("news_container_div")

            for (var i = 0; i < result["retlist"].length; i++) {
                var news_title_div = document.createElement("div")
                news_title_div.className = 'news_title_div'
                news_title_div.innerHTML = result["retlist"][i]["title"]

                var news_summary_div = document.createElement("div")
                news_summary_div.className = 'news_summary_div'
                news_summary_div.innerHTML = result["retlist"][i]["summary"]

                var news_date_div = document.createElement("div")
                news_date_div.className = 'news_date_div'
                news_date_div.innerHTML = result["retlist"][i]["date"]

                var news_spacer_div = document.createElement("div")
                news_spacer_div.className = 'news_spacer_div'

                var news_row = document.createElement("div")
                news_row.className = 'news_row'
                news_row.appendChild(news_title_div)
                news_row.appendChild(news_summary_div)
                news_row.appendChild(news_date_div)
                news_row.appendChild(news_spacer_div)

                news_container_div.appendChild(news_row);
            }
        }
    })
})();


page_id = 1;//初始都是第一页
tag_idx = 0
tags = ["健康", "疫苗", "国内", "国际", "娱乐", "房产", "探索", "教育", "新鲜事", "旅游", "汽车", "社会", "艺术", "财经"];

//点击标签时，加载该标签下第一页的10条新闻
(function () {
    $("#switcher_row").on("click", "button", function () {
        page_id = 1;
        tag_idx = $(this).index()

        $.ajax({
            url: "/covid/news",
            type: "GET",
            data: {
                action: "load_more_news",
                field: tags[tag_idx],
                pagesize: 10,
                pagenum: 1
            },
            dataType: "json",
            success: function (result) {
                news_container_div = document.getElementById("news_container_div")
                news_container_div.innerHTML = ''

                for (var i = 0; i < result["retlist"].length; i++) {
                    var news_title_div = document.createElement("div")
                    news_title_div.className = 'news_title_div'
                    news_title_div.innerHTML = result["retlist"][i]["title"]

                    var news_summary_div = document.createElement("div")
                    news_summary_div.className = 'news_summary_div'
                    news_summary_div.innerHTML = result["retlist"][i]["summary"]

                    var news_date_div = document.createElement("div")
                    news_date_div.className = 'news_date_div'
                    news_date_div.innerHTML = result["retlist"][i]["date"]

                    var news_spacer_div = document.createElement("div")
                    news_spacer_div.className = 'news_spacer_div'

                    var news_row = document.createElement("div")
                    news_row.className = 'news_row'
                    news_row.appendChild(news_title_div)
                    news_row.appendChild(news_summary_div)
                    news_row.appendChild(news_date_div)
                    news_row.appendChild(news_spacer_div)

                    news_container_div.appendChild(news_row);
                }
            }
        })
    });
})();



news_coming = false

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 10 && !news_coming) {
            news_coming = true
            page_id += 1;
            $.ajax({
                url: "/covid/news",
                type: "GET",
                data: {
                    action: "load_more_news",
                    field: tags[tag_idx],
                    pagesize: 10,
                    pagenum: page_id
                },
                dataType: "json",
                success: function (result) {
                    if (result["total"] > 0) {
                        news_container_div = document.getElementById("news_container_div")

                        for (var i = 0; i < result["retlist"].length; i++) {
                            var news_title_div = document.createElement("div")
                            news_title_div.className = 'news_title_div'
                            news_title_div.innerHTML = result["retlist"][i]["title"]

                            var news_summary_div = document.createElement("div")
                            news_summary_div.className = 'news_summary_div'
                            news_summary_div.innerHTML = result["retlist"][i]["summary"]

                            var news_date_div = document.createElement("div")
                            news_date_div.className = 'news_date_div'
                            news_date_div.innerHTML = result["retlist"][i]["date"]

                            var news_spacer_div = document.createElement("div")
                            news_spacer_div.className = 'news_spacer_div'

                            var news_row = document.createElement("div")
                            news_row.className = 'news_row'
                            news_row.appendChild(news_title_div)
                            news_row.appendChild(news_summary_div)
                            news_row.appendChild(news_date_div)
                            news_row.appendChild(news_spacer_div)

                            news_container_div.appendChild(news_row);
                        }
                    }

                    news_coming = false
                }
            })
        }
    })
})