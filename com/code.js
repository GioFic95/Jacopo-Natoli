$(document).ready(function () {
    console.log("pre");

    $.get("/.netlify/functions/getPics", function(data) {
        console.log("success");
        console.log(data);
        let html_text = ""
        for (let img of JSON.parse(data)) {
            html_text += img + "\n";
        }
        $("#my-imgs").html(html_text);
    }).fail(function() {
        alert( "error" );
    });

    // $("#my-imgs").load("/.netlify/functions/getPics");
    console.log("post");
});