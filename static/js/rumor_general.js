$("#btn").click(function () {
    var input_content = document.getElementById("inputid").value
    window.location.href="search_result.html"+"?content="+input_content;
})