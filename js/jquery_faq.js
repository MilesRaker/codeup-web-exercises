"use strict"

$("#showAnswers").click(function(){
    $("dd").toggleClass("invisible");
})

$("dt").click(function(){
    $(this).css("background-color", "yellow");
})