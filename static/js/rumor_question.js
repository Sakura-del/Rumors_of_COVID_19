var pageid = 1;//初始加载第一页
var btn_nums = 5;//分页按钮数量
var father_div_question_list = document.getElementById("question_list");
var btn_div = document.getElementById("page_button");
//加载第一页，以及翻页按钮
(function () {


    $.ajax({
        url: "/rumor/questions",
        type: "GET",
        data: { action: "list_questions", pagenum: pageid, pagesize: 5 },
        dataType: "json",
        success: function (result) {
            // var btn_nums=Math.floor(result["allnums"]/5);
            // if(result["allnums"]%5>0){
            //     btn_nums+=1;
            // }
            for (var i = 0; i < btn_nums; i++) {
                var newbtn = document.createElement("button");
                newbtn.innerHTML = i + 1;
                btn_div.appendChild(newbtn);
            }
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

                        father_div_question_list.appendChild(newrow);
                    }
                })
            }
        }
    })
})();


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
                window.location.reload();//刷新当前页面
            }
        })
    })
})();

//点击翻页按钮后重新加载
(function () {
    $("#page_button").on("click", "button", function () {
        pageid = $(this).index() + 1;
        $.ajax({
            url: "/rumor/questions",
            type: "GET",
            data: { action: "list_questions", pagenum: pageid, pagesize: 5 },
            dataType: "json",
            success: function (result) {
                father_div_question_list.innerHTML="";//清空原来的
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

                            father_div_question_list.appendChild(newrow);
                        }
                    })
                }
            }
        })
    });
})();

