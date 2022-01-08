$(document).ready(function () {
    console.log("pre");

    $.get("/.netlify/functions/getPics", function(data) {
        console.log("success");
        console.log(data);
        let imgs = JSON.parse(data);
        let html_text = ""
        let i = 0;
        for (let img of imgs) {
            if (i === 0)
                html_text += "<div class='col-lg-4 col-md-12 mb-4 mb-lg-0'>";
            else if (i % (imgs.length/3) === 0)
                html_text += "</div>\n<div class='col-lg-4 col-md-12 mb-4 mb-lg-0'>";
            html_text += img + "\n";
        }
        html_text += "</div>";
        $("#my-imgs").html(html_text);
    }).fail(function() {
        $("#my-imgs").text("Error!");
    });
    console.log("post");
});