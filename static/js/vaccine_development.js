(function () {
    $.ajax({
        url: "/vaccine/views",
        type: "GET",
        data: { action: "get_vaccine_status" },
        dataType: "json",
        success: function (result) {
            var vaccine_table_tbody = document.getElementById('vaccine_table_tbody')

            for (var i = 0; i < result["retlist"].length; i++) {
                var vaccine_date = result["retlist"][i]

                var vaccine_org_div = document.createElement('div')
                vaccine_org_div.innerHTML = vaccine_date['organization_name']
                vaccine_org_div.className = 'vaccine_org_div'

                var vaccine_name_div = document.createElement('div')
                vaccine_name_div.innerHTML = vaccine_date['vaccine_name']
                vaccine_name_div.className = 'vaccine_name_div'

                var vaccine_info_td = document.createElement('td')
                vaccine_info_td.className = 'vaccine_info_td'
                vaccine_info_td.appendChild(vaccine_org_div)
                vaccine_info_td.appendChild(vaccine_name_div)

                var vaccine_progress_div = document.createElement('div')
                vaccine_progress_div.className = 'vaccine_progress_div'

                if (vaccine_date['progress'] == "上市")
                    vaccine_progress_div.style.width = '97%'
                else if (vaccine_date['progress'] == "临床III期")
                    vaccine_progress_div.style.width = '75%'
                else if (vaccine_date['progress'] == "临床II/III期")
                    vaccine_progress_div.style.width = '50%'
                else if (vaccine_date['progress'] == "临床II期")
                    vaccine_progress_div.style.width = '25%'

                if (vaccine_date['vaccine_type'] == "灭活疫苗")
                    vaccine_progress_div.className += ' legend_color_1'
                else if (vaccine_date['vaccine_type'] == "腺病毒载体疫苗")
                    vaccine_progress_div.className += ' legend_color_2'
                else if (vaccine_date['vaccine_type'] == "核酸疫苗")
                    vaccine_progress_div.className += ' legend_color_3'
                else if (vaccine_date['vaccine_type'] == "重组蛋白疫苗")
                    vaccine_progress_div.className += ' legend_color_4'

                var vaccine_progress_divider = document.createElement("div");
                vaccine_progress_divider.className = 'vaccine_progress_divider'
                for (var j = 0; j <= 3; j++) {
                    divider_line = document.createElement("div");
                    divider_line.className = 'vaccine_progress_divider_line'
                    divider_line.style.left = j * 25 + '%';
                    vaccine_progress_divider.appendChild(divider_line)
                }

                var vaccine_progress_td = document.createElement('td')
                vaccine_progress_td.className = 'vaccine_progress_td'
                vaccine_progress_td.colSpan = "4"
                vaccine_progress_td.appendChild(vaccine_progress_div)
                vaccine_progress_td.appendChild(vaccine_progress_divider)

                var vaccine_row_tr = document.createElement('tr')
                vaccine_row_tr.className = 'vaccine_row_tr'
                vaccine_row_tr.appendChild(vaccine_info_td)
                vaccine_row_tr.appendChild(vaccine_progress_td)

                vaccine_table_tbody.appendChild(vaccine_row_tr)
            }
        }
    })
})();