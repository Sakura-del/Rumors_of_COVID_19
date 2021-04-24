function search_input_listener(e) { //监听文本框按回车，回车相当于点按钮
    var e = e || window.event;
    if (e.keyCode == 13)
        On_search_btn_click();
}


$.ajax({
    url: "/rumor/views",
    type: "GET",
    data: { action: "list_rumors" },
    dataType: "json",
    success: function (result) {
        console.log(result);
        var titles = document.getElementsByName("title");
        var dates = document.getElementsByName("date");
        var types = document.getElementsByName("type");
        var tags = document.getElementsByName("tag");
        var pics = document.getElementsByName("pic");
        var tmptag;
        for (var i = 0; i < 5; i++) {
            titles[i].innerHTML = result["retlist"][i]["title"];
            dates[i].innerHTML = result["retlist"][i]["date"];

            if (result["retlist"][i]["markstyle"] == "true") {
                types[i].innerHTML = "确实如此"
                types[i].style.backgroundColor = 'rgb(66, 161, 99)'
            }
            else if (result["retlist"][i]["markstyle"] == "fake") {
                types[i].innerHTML = "谣言"
                types[i].style.backgroundColor = 'rgb(196, 31, 32)'
            }
            else {
                types[i].innerHTML = "尚无定论"
                types[i].style.backgroundColor = 'rgb(72, 72, 72)'
            }

            pics[i].src = result["retlist"][i]["coversqual"];
            var objKeys = Object.keys(result["retlist"][i]["tag"]);
            for (var j = 0; j < objKeys.length; j++) {
                if (j == 0) {
                    tmptag = result["retlist"][i]["tag"][j];
                }
                else {
                    tmptag = tmptag + ", " + result["retlist"][i]["tag"][j];
                }
            }
            tags[i].innerHTML = tmptag;
        }
    }
});


function On_search_btn_click(){
    var input_content = document.getElementById("search_input").value
    window.location.href = "rumor_search_result.html" + "?content=" + input_content;
}



news_coming = false

page_id = 1;//初始都是第一页

// $(document).ready(function () {
//     $(window).scroll(function () {
//         if ($(window).scrollTop() + $(window).height() > $(document).height() - 10 && !news_coming) {
//             news_coming = true
//             page_id += 1;
//             $.ajax({
//                 url: "/covid/news",
//                 type: "GET",
//                 data: {
//                     action: "load_more_news",
//                     field: tags[tag_idx],
//                     pagesize: 10,
//                     pagenum: page_id
//                 },
//                 dataType: "json",
//                 success: function (result) {
//                     if (result["total"] > 0) {
//                         news_container_div = document.getElementById("news_container_div")

//                         for (var i = 0; i < result["retlist"].length; i++) {
//                             var news_title_div = document.createElement("div")
//                             news_title_div.className = 'news_title_div'
//                             news_title_div.innerHTML = result["retlist"][i]["title"]

//                             var news_summary_div = document.createElement("div")
//                             news_summary_div.className = 'news_summary_div'
//                             news_summary_div.innerHTML = result["retlist"][i]["summary"]

//                             var news_date_div = document.createElement("div")
//                             news_date_div.className = 'news_date_div'
//                             news_date_div.innerHTML = result["retlist"][i]["date"]

//                             var news_spacer_div = document.createElement("div")
//                             news_spacer_div.className = 'news_spacer_div'

//                             var news_row = document.createElement("div")
//                             news_row.className = 'news_row'
//                             news_row.appendChild(news_title_div)
//                             news_row.appendChild(news_summary_div)
//                             news_row.appendChild(news_date_div)
//                             news_row.appendChild(news_spacer_div)

//                             news_container_div.appendChild(news_row);
//                         }
//                     }

//                     news_coming = false
//                 }
//             })
//         }
//     })
// })