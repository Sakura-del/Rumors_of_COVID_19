
$.ajax({
    url: "/rumor/views",
    type: "GET",
    data: { action: "list_rumors" },
    dataType: "json",
    success: function (result) {
        console.log(result);
        var titles = document.getElementsByName("title");
        var dates = document.getElementsByName("date");
        var types = document.getElementsByName("type");
        var tags = document.getElementsByName("tag");
        var pics = document.getElementsByName("pic");
        var tmptag;
        for (var i = 0; i < 5; i++) {
            titles[i].innerHTML = result["retlist"][i]["title"];
            dates[i].innerHTML = result["retlist"][i]["date"];

            if (result["retlist"][i]["markstyle"] == "true") {
                types[i].innerHTML = "确实如此"
                types[i].style.backgroundColor = 'rgb(66, 161, 99)'
            }
            else if (result["retlist"][i]["markstyle"] == "fake") {
                types[i].innerHTML = "谣言"
                types[i].style.backgroundColor = 'rgb(196, 31, 32)'
            }
            else {
                types[i].innerHTML = "尚无定论"
                types[i].style.backgroundColor = 'rgb(72, 72, 72)'
            }

            pics[i].src = result["retlist"][i]["coversqual"];
            var objKeys = Object.keys(result["retlist"][i]["tag"]);
            for (var j = 0; j < objKeys.length; j++) {
                if (j == 0) {
                    tmptag = result["retlist"][i]["tag"][j];
                }
                else {
                    tmptag = tmptag + ", " + result["retlist"][i]["tag"][j];
                }
            }
            tags[i].innerHTML = tmptag;
        }
    }
});


$("#search_btn").click(function () {
    var input_content = document.getElementById("inputid").value
    window.location.href = "rumor_search_result.html" + "?content=" + input_content;
})


$("#identify_btn").click(function () {
    var input_content = document.getElementById("inputid").value
    
})