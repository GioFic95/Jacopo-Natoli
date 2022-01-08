$(document).ready(function () {
    console.log("pre");
    $("#my-imgs").load("/.netlify/functions/getPics");
    console.log("post");
});