function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]); //解决中文乱码问题
    }
}
var input_content = getQueryString("content");
var father_div_rumor = document.getElementById("rumor_list_x_content");
var rumor_result_count= document.getElementById("rumor_result_count");

var father_div_news = document.getElementById("news_list_x_content");
var news_result_count= document.getElementById("news_result_count");
$.ajax({
    url: "/home/",
    type: "GET",
    data: { action: "get_rumors", title: input_content },
    dataType: "json",
    success: function (result) {
        console.log(result);
        rumor_result_count.innerHTML="已经为您找到"+String(result["rumors"].length)+"条谣言结果：";
        news_result_count.innerHTML="已经为您找到"+String(result["news"].length)+"条新闻结果：";
        for (var i = 0; i < 10 && i < result["rumors"].length; i++) {
            var new_col_sm_8_div = document.createElement("div");
            new_col_sm_8_div.className = "col-sm-8 rumor_text_div";

            var new_span = document.createElement("span");
            new_span.className = "rumor_title";
            new_span.innerHTML = result["rumors"][i]["title"];
            new_col_sm_8_div.appendChild(new_span);

            var new_span = document.createElement("span");
            new_span.className = "rumor_type";

            if (result["rumors"][i]["markstyle"] == "true") {
                new_span.innerHTML = "确实如此"
                new_span.style.backgroundColor = 'rgb(66, 161, 99)'
            }
            else if (result["rumors"][i]["markstyle"] == "fake") {
                new_span.innerHTML = "谣言"
                new_span.style.backgroundColor = 'rgb(196, 31, 32)'  
            }
            else {
                new_span.innerHTML = "尚无定论"
                new_span.style.backgroundColor = 'rgb(72, 72, 72)'
            }

            new_col_sm_8_div.appendChild(new_span);

            var new_p = document.createElement("p");
            new_p.className = "rumor_date";
            new_p.innerHTML = result["rumors"][i]["date"];
            new_col_sm_8_div.appendChild(new_p);

            var new_p = document.createElement("p");
            new_p.className = "rumor_tag";
            var tmp_tag;
            for (var j = 0; j < result["rumors"][i]["tag"].length; j++)
                if (j == 0)
                    tmp_tag = result["rumors"][i]["tag"][j];
                else
                    tmp_tag = tmp_tag + ", " + result["rumors"][i]["tag"][j];
            new_p.innerHTML = tmp_tag;
            new_col_sm_8_div.appendChild(new_p);


            var new_col_sm_3_div = document.createElement("div");
            new_col_sm_3_div.className = "col-sm-3 rumor_pic_div";
            var new_img = document.createElement("img");
            new_img.src = result["rumors"][i]["coversqual"];
            new_col_sm_3_div.appendChild(new_img);

            var new_row_div = document.createElement("div");
            new_row_div.className = "row one_rumor_unit";
            new_row_div.appendChild(new_col_sm_8_div);
            new_row_div.appendChild(new_col_sm_3_div);

            father_div_rumor.appendChild(new_row_div);
        }

        for (var i = 0; i < 10 && i < result["news"].length; i++) {
            var new_col_sm_12_div = document.createElement("div");
            new_col_sm_12_div.className = "col-sm-12 rumor_text_div";

            var new_span = document.createElement("span");
            new_span.className = "rumor_title";
            new_span.innerHTML = result["news"][i]["title"];
            new_col_sm_12_div.appendChild(new_span);


            var new_p = document.createElement("p");
            new_p.className = "rumor_date";
            new_p.innerHTML = result["news"][i]["date"];
            new_col_sm_12_div.appendChild(new_p);

            var new_row_div = document.createElement("div");
            new_row_div.className = "row one_rumor_unit";
            new_row_div.appendChild(new_col_sm_12_div);

            father_div_news.appendChild(new_row_div);
        }
    }
});