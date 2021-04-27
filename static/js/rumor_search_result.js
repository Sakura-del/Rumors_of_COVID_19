function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]); //解决中文乱码问题
}


function append_rumor(page_index) {
    $.ajax({
        url: "/rumor/views",
        type: "GET",
        data: {
            action: "get_rumors",
            title: getQueryString("content"),
            pagesize: 20,
            pagenum: page_index
        },
        dataType: "json",
        success: function(result) {
            if (page_index == 1) {
                var rumor_count_div = document.createElement('div')
                rumor_count_div.id = 'rumor_count_div'
                rumor_count_div.innerHTML = '为您找到相关结果' + result["total"] + '个'

                var rumors_list_container = document.getElementById('rumors_list_container')
                rumors_list_container.appendChild(rumor_count_div)
            }

            rumors_list = result["rumors"]

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
                } else if (rumors_list[i]["markstyle"] == "fake") {
                    rumor_type_span.innerHTML = "谣言"
                    rumor_type_span.className = 'rumor_type_span fake_rumor'
                } else {
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



page_index = 1
rumor_coming = false

append_rumor(page_index)

$(document).ready(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 10 && !rumor_coming) {
            rumor_coming = true
            page_index += 1;
            append_rumor(page_index)
        }
    })
})



$.ajax({
    url: "/rumor/views",
    type: "GET",
    data: {
        action: "get_news",
        title: '北京',
        pagesize: 10,
        pagenum: 1
    },
    dataType: "json",
    success: function(result) {
        news_list = result['retlist']
        var news_list_container = document.getElementById('news_list_container')

        for (var i = 0; i < news_list.length; i++) {
            var news_title_div = document.createElement('div')
            news_title_div.className = 'news_title_div'
            news_title_div.innerHTML = news_list[i]['title']

            var news_unit_a = document.createElement('a')
            news_unit_a.className = 'news_unit_a'
            news_unit_a.href = news_list[i]['link']
            news_unit_a.appendChild(news_title_div)

            news_list_container.appendChild(news_unit_a)
        }
    }
})