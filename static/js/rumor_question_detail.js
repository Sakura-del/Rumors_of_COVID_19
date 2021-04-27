//解析URL
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]); //解决中文乱码问题
}



//加载问题描述和回答列表
function load_answer() {
    $.ajax({
        url: "/rumor/questions",
        type: "GET",
        data: {
            action: "question_details",
            question_id: getQueryString("id")
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            var describe_div = document.getElementById("question_describe");
            describe_div.innerHTML = ''
            var reply_div = document.getElementById("reply");
            reply_div.innerHTML = ''
            //加载问题描述
            var question_data = result["question"][0];

            var items = question_data["pub_date"].split("T");
            var times = items[1].split(".");
            times = times[0].substring(0, 5);
            var timestr = items[0] + " " + times; //该问题发布时间

            var tanswernum = result["answers"].length; //该问题回答数量

            var question_title_div = document.createElement('div')
            question_title_div.className = 'question_title_div'
            question_title_div.innerHTML = question_data['question']

            var question_detail_div = document.createElement('div')
            question_detail_div.className = 'question_detail_div'
            question_detail_div.innerHTML = question_data['question_text']

            var question_date_and_answerNum_div = document.createElement('div');

            question_date_and_answerNum_div.className = "question_date_and_answerNum_div";
            var pub_date_i = document.createElement("i");
            pub_date_i.className = "iconfont";
            pub_date_i.style.fontSize = "20px";
            pub_date_i.innerHTML = "&#xe605;";
            question_date_and_answerNum_div.appendChild(pub_date_i);

            var pub_date_str = document.createElement("span");
            pub_date_str.innerHTML = timestr;
            pub_date_str.style.paddingLeft = "5px";
            question_date_and_answerNum_div.appendChild(pub_date_str);

            var answernum_i = document.createElement("i");
            answernum_i.className = "iconfont";
            answernum_i.style.fontSize = "20px";
            answernum_i.innerHTML = "&#xe619;";
            answernum_i.style.paddingLeft = "30px";
            question_date_and_answerNum_div.appendChild(answernum_i);

            var answernum_str = document.createElement("span");
            answernum_str.innerHTML = String(tanswernum) + "条";
            answernum_str.style.paddingLeft = "5px";
            question_date_and_answerNum_div.appendChild(answernum_str);

            describe_div.appendChild(question_title_div)
            describe_div.appendChild(question_detail_div)
            describe_div.appendChild(question_date_and_answerNum_div);

            //加载回答列表
            var reply_data = result["answers"];

            for (var i = 0; i < reply_data.length; i++) {
                var items1 = reply_data[i]["answer_date"].split("T");
                var timestr1 = items1[0] + " " + items1[1].substring(0, 5); //该回答发布时间字符串
                console.log(timestr1);

                var reply_text_div = document.createElement("div"); //回复文本div
                reply_text_div.className ='reply_text_div'
                reply_text_div.innerHTML = reply_data[i]["answer"];

                var reply_time_div = document.createElement("div"); //回复日期div

                var reply_date_i = document.createElement("i"); //发布日期字体图表
                reply_date_i.className = "iconfont";
                reply_date_i.style.fontSize = "20px";
                reply_date_i.innerHTML = "&#xe605;";
                reply_time_div.appendChild(reply_date_i);

                var reply_date_str = document.createElement("span"); //发布日期字符串写在span里面
                reply_date_str.innerHTML = timestr1;
                reply_date_str.style.paddingLeft = "5px";
                reply_time_div.appendChild(reply_date_str);

                var reply_unit = document.createElement("div");
                reply_unit.className='reply_unit'
                reply_unit.appendChild(reply_text_div);
                reply_unit.appendChild(reply_time_div);

                reply_div.appendChild(reply_unit);

            }
        }
    })
}
load_answer()



function on_answer_question_button_click() {
    var input_detail = document.getElementById("input_detail")
    var input_detail_text = input_detail.value;

    $.ajax({
        url: "/rumor/questions ",
        type: "POST",
        data: {
            action: "answer_question",
            question_id: getQueryString("id"),
            answer: input_detail_text
        },
        dataType: "json",
        success: function (result) {
            input_detail.value = ''
            load_answer()
            window.scrollTo(0, 0)
        }
    })
}