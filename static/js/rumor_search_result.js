function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]); //解决中文乱码问题
}

rumor_list_container = document.getElementById("rumor_list_container");
rumor_result_count = document.getElementById("rumor_result_count");

father_div_news = document.getElementById("news_list_x_content");
news_result_count = document.getElementById("news_result_count");

function load_more_rumor(page) {
    $.ajax({
        url: "/rumor/views",
        type: "GET",
        data: {
            action: "get_rumors",
            title: getQueryString("content"),
            pagesize: 20,
            pagenum: page
        },
        dataType: "json",
        success: function (result) {
            console.log(result)
            var rumor_list_container = document.getElementById('rumor_list_container')

            for (var i = 0; i < result["rumors"].length; i++) {
                var rumor_title_span = document.createElement("span");
                rumor_title_span.className = "rumor_title";
                rumor_title_span.innerHTML = result["rumors"][i]["title"];

                var rumor_type_span = document.createElement("span");
                rumor_type_span.className = "rumor_type";

                if (result["rumors"][i]["markstyle"] == "true") {
                    rumor_type_span.innerHTML = "确实如此"
                    rumor_type_span.style.backgroundColor = 'rgb(66, 161, 99)'
                }
                else if (result["rumors"][i]["markstyle"] == "fake") {
                    rumor_type_span.innerHTML = "谣言"
                    rumor_type_span.style.backgroundColor = 'rgb(196, 31, 32)'
                }
                else {
                    rumor_type_span.innerHTML = "尚无定论"
                    rumor_type_span.style.backgroundColor = 'rgb(72, 72, 72)'
                }

                var rumor_date_p = document.createElement("p");
                rumor_date_p.className = "rumor_date";
                rumor_date_p.innerHTML = result["rumors"][i]["date"];

                var rumor_tag_p = document.createElement("p");
                rumor_tag_p.className = "rumor_tag";
                var tmp_tag;
                for (var j = 0; j < result["rumors"][i]["tag"].length; j++)
                    if (j == 0)
                        tmp_tag = result["rumors"][i]["tag"][j];
                    else
                        tmp_tag = tmp_tag + ", " + result["rumors"][i]["tag"][j];
                rumor_tag_p.innerHTML = tmp_tag;


                var rumor_text_div = document.createElement("div");
                rumor_text_div.className = 'rumor_text_div'
                rumor_text_div.appendChild(rumor_title_span)
                rumor_text_div.appendChild(rumor_type_span)
                rumor_text_div.appendChild(rumor_date_p)
                rumor_text_div.appendChild(rumor_tag_p)


                var rumor_pic_img = document.createElement("img");
                rumor_pic_img.src = result["rumors"][i]["coversqual"];

                var rumor_pic_div = document.createElement("div");
                rumor_pic_div.appendChild(rumor_pic_img)

                var one_rumor_unit = document.createElement("div");
                one_rumor_unit.className = "row one_rumor_unit";
                one_rumor_unit.appendChild(rumor_text_div);
                one_rumor_unit.appendChild(rumor_pic_div);

                rumor_list_x_content.appendChild(one_rumor_unit);
            }

            // for (var i = 0; i < 10 && i < result["news"].length; i++) {
            //     var new_col_sm_12_div = document.createElement("div");
            //     new_col_sm_12_div.className = "col-sm-12 rumor_text_div";

            //     var new_span = document.createElement("span");
            //     new_span.className = "rumor_title";
            //     new_span.innerHTML = result["news"][i]["title"];
            //     new_col_sm_12_div.appendChild(new_span);


            //     var new_p = document.createElement("p");
            //     new_p.className = "rumor_date";
            //     new_p.innerHTML = result["news"][i]["date"];
            //     new_col_sm_12_div.appendChild(new_p);

            //     var new_row_div = document.createElement("div");
            //     new_row_div.className = "row one_rumor_unit";
            //     new_row_div.appendChild(new_col_sm_12_div);

            //     father_div_news.appendChild(new_row_div);
            // }
        }
    })
}

load_more_rumor(1)