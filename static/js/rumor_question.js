page_index = 1;//初始加载第一页
btn_num = 5;//分页按钮数量
question_list_container = document.getElementById("question_list_container");
page_button_container = document.getElementById("page_button_container");



function load_page(page){
    $.ajax({
        url: "/rumor/questions",
        type: "GET",
        data: {
            action: "list_questions",
            pagenum: page_index,
            pagesize: 10
        },
        dataType: "json",
        success: function (result) {
            console.log(result)
            question_list_container = document.getElementById("question_list_container")
            question_list_container.innerHTML = ''

            
        }
    })
}

load_page(1)










//加载第一页，以及翻页按钮
function init_first_page() {
    $.ajax({
        url: "/rumor/questions",
        type: "GET",
        data: {
            action: "list_questions",
            pagenum: page_ID,
            pagesize: 5
        },
        dataType: "json",
        success: function (result) {

            for (var i = 0; i < btn_num; i++) {
                var page_button = document.createElement("button");
                page_button.className = 'page_button'
                page_button.innerHTML = i + 1
                page_button_container.appendChild(page_button)
            }

            for (var i = 0; i < result["retlist"].length; i++) {
                var question_ID = result["retlist"][i]["id"]

                var title_span = document.createElement("span")
                title_span.className = 'title_span'
                title_span.innerHTML = result["retlist"][i]["question"]









                $.ajax({
                    url: "/rumor/questions",
                    type: "GET",
                    data: {
                        action: "question_details",
                        question_id: question_ID
                    },
                    dataType: "json",
                    success: function (result) {
                        

                        var question_row = document.createElement("div")
                        question_row.className = 'question_row'

                        var answer_count = result["answers"].length;
                        var date_time = result["question"][0]["pub_date"];
                        var question_text = result["question"][0]["question_text"];

                        question_row.appendChild(title_span);

                        var text_p = document.createElement("p");//问题详情
                        text_p.innerHTML = question_text;
                        question_row.appendChild(text_p);

                        var date_answernum_p = document.createElement("p");//发布日期与回答数量
                        date_answernum_p.innerHTML = "发布时间：" + date_time + "  回答：" + String(answer_count) + "条";
                        question_row.appendChild(date_answernum_p);

                        question_list_container.appendChild(question_row);
                    }
                })
            }
        }
    })
}

init_first_page();


//提问后刷新页面
(function () {
    $("#search_btn").click(function () {
        var input_title = document.getElementById("input_title").value;
        var input_detail = document.getElementById("input_detail").value;
        $.ajax({
            url: "/rumor/questions",
            type: "POST",
            data: { action: "ask_question", question: input_title, question_text: input_detail },
            dataType: "json",
            success: function (result) {
                question_list_container.innerHTML = "";
                init_first_page();
            }
        })
    })
})();

//点击翻页按钮后重新加载
(function () {
    $("#page_button").on("click", "button", function () {
        page_ID = $(this).index() + 1;
        $.ajax({
            url: "/rumor/questions",
            type: "GET",
            data: { action: "list_questions", pagenum: pageid, pagesize: 5 },
            dataType: "json",
            success: function (result) {
                question_list_container.innerHTML = "";//清空原来的
                for (var i = 0; i < result["retlist"].length; i++) {
                    var newrow = document.createElement("div");  //不要设置类名为row，会把里边的几个标签在同一行显示
                    // newrow.className = "row";

                    var questionID = result["retlist"][i]["id"];//问题的id

                    var title_span = document.createElement("span");//题目
                    title_span.innerHTML = result["retlist"][i]["question"];

                    $.ajax({
                        url: "/rumor/questions",
                        type: "GET",
                        data: { action: "question_details", question_id: questionID },
                        dataType: "json",
                        success: function (result) {
                            var answer_num = result["answers"].length;
                            var date_time = result["question"][0]["pub_date"];
                            var question_text = result["question"][0]["question_text"];

                            newrow.appendChild(title_span);

                            var text_p = document.createElement("p");//问题详情
                            text_p.innerHTML = question_text;
                            newrow.appendChild(text_p);

                            var date_answernum_p = document.createElement("p");//发布日期与回答数量
                            date_answernum_p.innerHTML = "发布时间：" + date_time + "  回答：" + String(answer_num) + "条";
                            newrow.appendChild(date_answernum_p);

                            question_list_container.appendChild(newrow);
                        }
                    })
                }
            }
        })
    });
})();

