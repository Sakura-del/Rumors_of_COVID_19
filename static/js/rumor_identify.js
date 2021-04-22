false_pattern = ['这个有{prob}%的可能性是{flag}的，再来个试试😏', '我觉得吧，这个{prob}%是{flag}的🙋🏻', '{flag}的吧，{prob}%是{flag}的，再试点啥不😏', '这个估计有{prob}%的可能是{flag}的🙋🏻']
true_pattern = ['这个有{prob}%的可能性是{flag}的，再来个试试🧐', '我觉得吧，这个{prob}%是{flag}的🙋‍♀️', '{flag}的吧，{prob}%是{flag}的，再试点啥不🧐', '这个估计有{prob}%的可能是{flag}的🙋‍♀️']
emmm_pattern = ['这句不好说啊，我感觉有{prob}%的可能是{flag}的😅', '啊这，这我还说不准了，估计{prob}%的可能是{flag}的🤔']
error_pattern = ['好家伙，你这发的啥玩意，我都看不懂🤨', '请说碳基生物听得懂的话，谢谢😊']

function question_input_listener(e) { //监听文本框按回车，回车相当于点检测按钮
    var e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById("ask_question_button").click();
    }
}



$("#ask_question_button").on("click", function () {
    question = document.getElementById('question_input').value
    question = question.replaceAll('\n', '')
    document.getElementById('question_input').value = ''

    question_pocket = document.createElement('div')
    question_pocket.className = 'question_pocket'
    question_pocket.innerHTML = question

    question_container = document.createElement('div')
    question_container.className = 'question_container clearfix'
    question_container.appendChild(question_pocket)

    dialog_container_div = document.getElementById('dialog_container_div')
    dialog_container_div.appendChild(question_container)
    dialog_container_div.scrollTop = dialog_container_div.scrollHeight

    $.ajax({
        url: "/rumor/views",
        type: "GET",
        data: {
            action: "judge_rumors",
            title: question
        },
        dataType: "json",
        success: function (result) {
            if (result['prob'] > 0.7) {
                if (result['flag'] == 'false') {
                    answer = false_pattern[Math.floor(Math.random() * false_pattern.length)]
                    answer = answer.replaceAll('{prob}', Math.round(result['prob'] * 100))
                    answer = answer.replaceAll('{flag}', '假')
                }
                else {
                    answer = true_pattern[Math.floor(Math.random() * true_pattern.length)]
                    answer = answer.replaceAll('{prob}', Math.round(result['prob'] * 100))
                    answer = answer.replaceAll('{flag}', '真')
                }
            }

            else {
                answer = emmm_pattern[Math.floor(Math.random() * emmm_pattern.length)]
                answer = answer.replaceAll('{prob}', Math.round(result['prob'] * 100))
                answer = answer.replaceAll('{flag}', result['flag'] == '真' ? '真' : '假')
            }

            answer_pocket = document.createElement('div')
            answer_pocket.className = 'answer_pocket'
            answer_pocket.innerHTML = answer

            answer_container = document.createElement('div')
            answer_container.className = 'answer_container clearfix'
            answer_container.appendChild(answer_pocket)

            dialog_container_div = document.getElementById('dialog_container_div')
            dialog_container_div.appendChild(answer_container)
            dialog_container_div.scrollTop = dialog_container_div.scrollHeight
        },
        error: function () {
            answer = error_pattern[Math.floor(Math.random() * error_pattern.length)]

            answer_pocket = document.createElement('div')
            answer_pocket.className = 'answer_pocket'
            answer_pocket.innerHTML = answer

            answer_container = document.createElement('div')
            answer_container.className = 'answer_container clearfix'
            answer_container.appendChild(answer_pocket)

            dialog_container_div = document.getElementById('dialog_container_div')
            dialog_container_div.appendChild(answer_container)
            dialog_container_div.scrollTop = dialog_container_div.scrollHeight
        }
    })
})