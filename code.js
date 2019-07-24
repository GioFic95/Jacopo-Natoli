$(document).ready(function () {
    $("#my-quote").load("/.netlify/functions/getDoc");

    $("#my-img").load("/.netlify/functions/getPic");
});