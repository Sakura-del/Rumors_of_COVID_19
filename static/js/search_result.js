function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]); //解决中文乱码问题
    }
}
var input_content = getQueryString("content");
var father_div = document.getElementById("rumors_result");
$.ajax({
    url: "/home/",
    type: "GET",
    data: { action: "get_rumors", title: input_content },
    dataType: "json",
    success: function (result) {
        console.log(result);
        father_div.innerHTML="";
        for (var i = 0; i < 10 && i < result["rumors"].length; i++) {
            var new_col_sm_9_div = document.createElement("div");
            new_col_sm_9_div.className = "col-sm-9";


            var new_h3 = document.createElement("h3");
            new_h3.className="rumor_title_h3";
            // new_h3.style.fontSize = "18px";
            new_h3.innerHTML = result["rumors"][i]["title"];
            new_col_sm_9_div.appendChild(new_h3);

            var new_p = document.createElement("p");
            new_p.className = "text-muted";
            new_p.innerHTML = result["rumors"][i]["date"];
            new_col_sm_9_div.appendChild(new_p);

            var new_p = document.createElement("p");
            new_p.innerHTML = result["rumors"][i]["markstyle"];
            new_col_sm_9_div.appendChild(new_p);

            var new_p = document.createElement("p");
            new_p.className = "text-muted";
            var tmptag;
            for (var j = 0; j < result["rumors"][i]["tag"].length; j++) {
                if (j == 0) {
                    tmptag = result["rumors"][i]["tag"][j];
                }
                else {
                    tmptag = tmptag + ", " + result["rumors"][i]["tag"][j];
                }
            }
            new_p.innerHTML = tmptag;
            new_col_sm_9_div.appendChild(new_p);


            var new_col_sm_3_div = document.createElement("div");
            new_col_sm_3_div.className = "col-sm-3";
            var newimg = document.createElement("img");
            newimg.src = result["rumors"][i]["coversqual"];
            new_col_sm_3_div.appendChild(newimg);

            var new_row_div = document.createElement("div");
            new_row_div.className = "row";
            new_row_div.appendChild(new_col_sm_9_div);
            new_row_div.appendChild(new_col_sm_3_div);

            father_div.appendChild(new_row_div);
        }
    }
});