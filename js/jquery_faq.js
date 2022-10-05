"use strict"

$("#showAnswers").click(function(){
    $("dd").toggleClass("invisible");
})

$("dt").click(function(){
    $(this).css("background-color", "yellow");
})

$("#last-li-yellow").click(function(){
    $("ul").each(function(){
        $(this).children().last().css("background-color", "yellow");
    })
})

$("h3").click(function(){
    $(this).next().children().css("font-weight", "bold");
});

$("li").click(function(){
    $(this).parent().children().first().css("color", "blue");
})

$("#swap-0").click(function(){

    //    swaps to the right and takes the image from the frame in the center
    // store src of 0
    // src0 = src1
    // src1 = src2
    // src3 = storedSrc
    // let storedSrc = $("frame-0").src;

    let frame0 = $("#frame-0");
    let frame1 = $("#frame-1");

    let storeSource = frame0.attr('src');
    frame0.attr("src", frame1.attr("src"));
    frame1.attr("src", storeSource);

});

$("#swap-1").click(function(){
// center frame swaps randomly to either the left or right
    // get frames
    // Random choose left or right (if else)

    let frame0 = $("#frame-0");
    let frame1 = $("#frame-1");
    let frame2 = $("#frame-2");
    let storeFrame1Src = frame1.attr("src");

    if(Math.random() > 0.5){
        // swap left
        frame1.attr("src", frame0.attr("src"))
        frame0.attr("src", storeFrame1Src);
    } else {
        // swap right
        frame1.attr("src", frame2.attr("src"));
        frame2.attr("src", storeFrame1Src);
    }
});

$("#swap-2").click(function(){
// right frame swaps to the left and takes the image from the frame in the center

    let frame1 = $("#frame-1");
    let frame2 = $("#frame-2");
    let storeFrame1 = frame1.attr("src");
    frame1.attr("src", frame2.attr("src"));
    frame2.attr("src", storeFrame1);
});

