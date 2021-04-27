page_index = 1


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
            console.log(result["retlist"]);
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
                        answernum_str.innerHTML = String(tanswernum) + "条";
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
load_page(1)


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







//加载第一页，以及翻页按钮
// function init_first_page() {
//     $.ajax({
//         url: "/rumor/questions",
//         type: "GET",
//         data: {
//             action: "list_questions",
//             pagenum: page_ID,
//             pagesize: 5
//         },
//         dataType: "json",
//         success: function (result) {

//             for (var i = 0; i < btn_num; i++) {
//                 var page_button = document.createElement("button");
//                 page_button.className = 'page_button'
//                 page_button.innerHTML = i + 1
//                 page_button_container.appendChild(page_button)
//             }

//             for (var i = 0; i < result["retlist"].length; i++) {
//                 var question_ID = result["retlist"][i]["id"]

//                 var title_span = document.createElement("span")
//                 title_span.className = 'title_span'
//                 title_span.innerHTML = result["retlist"][i]["question"]









//                 $.ajax({
//                     url: "/rumor/questions",
//                     type: "GET",
//                     data: {
//                         action: "question_details",
//                         question_id: question_ID
//                     },
//                     dataType: "json",
//                     success: function (result) {


//                         var question_row = document.createElement("div")
//                         question_row.className = 'question_row'

//                         var answer_count = result["answers"].length;
//                         var date_time = result["question"][0]["pub_date"];
//                         var question_text = result["question"][0]["question_text"];

//                         question_row.appendChild(title_span);

//                         var text_p = document.createElement("p");//问题详情
//                         text_p.innerHTML = question_text;
//                         question_row.appendChild(text_p);

//                         var date_answernum_p = document.createElement("p");//发布日期与回答数量
//                         date_answernum_p.innerHTML = "发布时间：" + date_time + "  回答：" + String(answer_count) + "条";
//                         question_row.appendChild(date_answernum_p);

//                         question_list_row.appendChild(question_row);
//                     }
//                 })
//             }
//         }
//     })
// }

// init_first_page();


// //提问后刷新页面
// (function () {
//     $("#search_btn").click(function () {
//         var input_title = document.getElementById("input_title").value;
//         var input_detail = document.getElementById("input_detail").value;
//         $.ajax({
//             url: "/rumor/questions",
//             type: "POST",
//             data: { action: "ask_question", question: input_title, question_text: input_detail },
//             dataType: "json",
//             success: function (result) {
//                 question_list_row.innerHTML = "";
//                 init_first_page();
//             }
//         })
//     })
// })();

// //点击翻页按钮后重新加载
// (function () {
//     $("#page_button").on("click", "button", function () {
//         page_ID = $(this).index() + 1;
//         $.ajax({
//             url: "/rumor/questions",
//             type: "GET",
//             data: { action: "list_questions", pagenum: pageid, pagesize: 5 },
//             dataType: "json",
//             success: function (result) {
//                 question_list_row.innerHTML = "";//清空原来的
//                 for (var i = 0; i < result["retlist"].length; i++) {
//                     var newrow = document.createElement("div");  //不要设置类名为row，会把里边的几个标签在同一行显示
//                     // newrow.className = "row";

//                     var questionID = result["retlist"][i]["id"];//问题的id

//                     var title_span = document.createElement("span");//题目
//                     title_span.innerHTML = result["retlist"][i]["question"];

//                     $.ajax({
//                         url: "/rumor/questions",
//                         type: "GET",
//                         data: { action: "question_details", question_id: questionID },
//                         dataType: "json",
//                         success: function (result) {
//                             var answer_num = result["answers"].length;
//                             var date_time = result["question"][0]["pub_date"];
//                             var question_text = result["question"][0]["question_text"];

//                             newrow.appendChild(title_span);

//                             var text_p = document.createElement("p");//问题详情
//                             text_p.innerHTML = question_text;
//                             newrow.appendChild(text_p);

//                             var date_answernum_p = document.createElement("p");//发布日期与回答数量
//                             date_answernum_p.innerHTML = "发布时间：" + date_time + "  回答：" + String(answer_num) + "条";
//                             newrow.appendChild(date_answernum_p);

//                             question_list_row.appendChild(newrow);
//                         }
//                     })
//                 }
//             }
//         })
//     });
// })();