(function () {
    $.ajax({
        url: "/vaccine/views",
        type: "GET",
        data: { action: "get_vaccine_status" },
        dataType: "json",
        success: function (result) {
            var vaccine_table = document.getElementById('vaccine_table')

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
                vaccine_progress_div.style.border = '5px'
                vaccine_progress_div.style.height = '5px'

                if (vaccine_date['progress'] == "上市")
                    vaccine_progress_div.style.width = '100%'
                else if (vaccine_date['progress'] == "临床III期")
                    vaccine_progress_div.style.width = '75%'
                else if (vaccine_date['progress'] == "临床II/III期")
                    vaccine_progress_div.style.width = '50%'
                else if (vaccine_date['progress'] == "临床II期")
                    vaccine_progress_div.style.width = '25%'

                if (vaccine_date['vaccine_type'] == "重组蛋白疫苗")
                    vaccine_progress_div.style.backgroundColor = 'red'
                else if (vaccine_date['vaccine_type'] == "核酸疫苗")
                    vaccine_progress_div.style.backgroundColor = 'green'
                else if (vaccine_date['vaccine_type'] == "灭活疫苗")
                    vaccine_progress_div.style.backgroundColor = 'blue'
                else if (vaccine_date['vaccine_type'] == "腺病毒载体疫苗")
                    vaccine_progress_div.style.backgroundColor = 'yellow'

                var vaccine_progress_td = document.createElement('td')
                vaccine_progress_td.className = 'vaccine_progress_td'
                vaccine_progress_td.style.width = '200px'
                vaccine_progress_td.appendChild(vaccine_progress_div)

                var vaccine_row_tr = document.createElement('tr')
                vaccine_row_tr.className = 'vaccine_row_tr'
                vaccine_row_tr.appendChild(vaccine_info_td)
                vaccine_row_tr.appendChild(vaccine_progress_td)

                vaccine_table.appendChild(vaccine_row_tr)
            }
        }
    })
})();