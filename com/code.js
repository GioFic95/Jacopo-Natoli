$(document).ready(function () {
    $.get("/.netlify/functions/getPics", function(data) {
        let imgs = JSON.parse(data);
        let html_text = "<div class=\"row\">"
        let i = 0;
        for (let img of imgs) {
            if (i === 0)
                html_text += "<div class='col-lg-4 col-md-12 mb-4 mb-lg-0'>";
            else if (i % (imgs.length/3) === 0)
                html_text += "</div>\n<div class='col-lg-4 mb-4 mb-lg-0'>";
            html_text += img + "\n";
            i++;
        }
        html_text += "</div></div>";
        $("#my-imgs").html(html_text);
    }).fail(function() {
        $("#my-imgs").text("Error!");
    });
});