function search_input_listener(e) { //监听文本框按回车，点按钮
    var e = e || window.event;
    if (e.keyCode == 13)
        On_search_btn_click();
}

function On_search_btn_click() {
    var input_content = document.getElementById("search_input").value
    window.location.href = "rumor_search_result.html?content=" + input_content;
}



page_index = 1
rumor_coming = false

function append_rumor(page_index) {
    $.ajax({
        url: "/rumor/views",
        type: "GET",
        data: {
            action: "list_more_rumors",
            pagesize: 10,
            pagenum: page_index
        },
        dataType: "json",
        success: function (result) {
            var rumors_list_container = document.getElementById('rumors_list_container')
            rumors_list = result["retlist"]

            for (var i = 0; i < rumors_list.length; i++) {
                var rumor_title_span = document.createElement('span')
                rumor_title_span.className = 'rumor_title_span'
                rumor_title_span.innerHTML = rumors_list[i]["title"]

                var rumor_title_a = document.createElement('a')
                rumor_title_a.href = 'https://vp.fact.qq.com/article?id=' + rumors_list[i]["urlid"]
                rumor_title_a.appendChild(rumor_title_span)

                var rumor_type_span = document.createElement('span')
                if (rumors_list[i]["markstyle"] == "true") {
                    rumor_type_span.innerHTML = "确实如此"
                    rumor_type_span.className = 'rumor_type_span true_rumor'
                }
                else if (rumors_list[i]["markstyle"] == "fake") {
                    rumor_type_span.innerHTML = "谣言"
                    rumor_type_span.className = 'rumor_type_span fake_rumor'
                }
                else {
                    rumor_type_span.innerHTML = "尚无定论"
                    rumor_type_span.className = 'rumor_type_span unknown_rumor'
                }

                var rumor_date_p = document.createElement('p')
                rumor_date_p.className = 'rumor_date_p'
                rumor_date_p.innerHTML = rumors_list[i]["date"]

                var rumor_tag_p = document.createElement('p')
                rumor_tag_p.className = 'rumor_tag_p'
                rumor_tag_p.innerHTML = rumors_list[i]["tag"]

                var rumor_text_div = document.createElement('div')
                rumor_text_div.className = 'col-md-9 col-sm-9 rumor_text_div'
                rumor_text_div.appendChild(rumor_title_a)
                rumor_text_div.appendChild(rumor_type_span)
                rumor_text_div.appendChild(rumor_date_p)
                rumor_text_div.appendChild(rumor_tag_p)

                var rumor_img = document.createElement('img')
                rumor_img.className = 'rumor_img'
                rumor_img.src = rumors_list[i]["coversqual"];

                var rumor_img_container = document.createElement('div')
                rumor_img_container.className = 'col-md-3 col-sm-3 rumor_img_container'
                rumor_img_container.appendChild(rumor_img)

                var one_rumor_unit = document.createElement('div')
                one_rumor_unit.className = 'one_rumor_unit clearfix'
                one_rumor_unit.appendChild(rumor_text_div)
                one_rumor_unit.appendChild(rumor_img_container)

                rumors_list_container.appendChild(one_rumor_unit)
            }

            rumor_coming = false
        }
    })
}

append_rumor(page_index)

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 10 && !rumor_coming) {
            rumor_coming = true
            page_index += 1;
            append_rumor(page_index)
        }
    })
})