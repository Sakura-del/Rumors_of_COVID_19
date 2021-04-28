page_index = 1

//加载10个问题的函数
function load_page(page) {
    $.ajax({
        url: "/rumor/questions",
        type: "GET",
        data: {
            action: "list_questions",
            pagenum: page,
            pagesize: 10
        },
        dataType: "json",
        success: function(result) {
            //console.log(result["retlist"]);
            var question_list_row = document.getElementById("question_list_row")
            question_list_row.innerHTML = ''

            for (var i = 0; i < result['retlist'].length; i++) {
                var question_ID = result['retlist'][i]["id"];
                $.ajax({
                    async: false, //大坑! ajax请求默认是异步方法, async: false将其设定为同步方法.若不加这句,则10条问答显示顺序随机,改为同步方法后,会等里层ajax的success回调函数执行完毕后才进入第二次循环,确保了数据顺序一致性
                    url: "/rumor/questions",
                    type: "GET",
                    data: {
                        action: "question_details",
                        question_id: question_ID
                    },
                    dataType: "json",
                    success: function(result1) {
                        var question_data = result1["question"][0];

                        var items = question_data["pub_date"].split("T");
                        var times = items[1].split(".");
                        times = times[0].substring(0, 5);
                        var timestr = items[0] + " " + times; //该问题发布时间

                        var tanswernum = result1["answers"].length; //该问题回答数量

                        var question_title_div = document.createElement('div')
                        question_title_div.className = 'question_title_div'
                        question_title_div.innerHTML = question_data['question']

                        var question_title_a = document.createElement('a')
                        question_title_a.className = 'question_title_a'
                        question_title_a.href = 'rumor_question_detail.html?id=' + question_data['id']
                        question_title_a.appendChild(question_title_div)

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
                        answernum_str.innerHTML = String(tanswernum) + "条回答";
                        answernum_str.style.paddingLeft = "5px";
                        question_date_and_answerNum_div.appendChild(answernum_str);



                        // <a><i class="iconfont" style="font-size:25px">&#xe76f;</i><span class="tag_1st">谣言专栏</span><span class="down_arrow fa fa-chevron-down"></span></a>


                        var question_unit_div = document.createElement('div')
                        question_unit_div.className = 'question_unit_div'
                        question_unit_div.appendChild(question_title_a)
                        question_unit_div.appendChild(question_detail_div)
                        question_unit_div.appendChild(question_date_and_answerNum_div);
                        question_list_row.appendChild(question_unit_div)
                    }
                })



            }
        }
    })
}
//初始加载10个问题
load_page(1)


//点击上一页和下一页按钮
function on_previous_button_click() {
    if (page_index > 1) {
        page_index--
        load_page(page_index)
    }
}
function on_next_button_click() {
    page_index++
    load_page(page_index)
}



//点击提问按钮，将问题标题和详情发送给后端，并刷新页面
function on_ask_question_button_click() {
    var input_title = document.getElementById("input_title")
    var input_title_text = input_title.value;

    var input_detail = document.getElementById("input_detail")
    var input_detail_text = input_detail.value;

    $.ajax({
        url: "/rumor/questions",
        type: "POST",
        data: {
            action: "ask_question",
            question: input_title_text,
            question_text: input_detail_text
        },
        dataType: "json",
        success: function(result) {
            input_title.value = ''
            input_detail.value = ''
            window.scrollTo(0, 0)
            load_page(1)
        }
    })
}







