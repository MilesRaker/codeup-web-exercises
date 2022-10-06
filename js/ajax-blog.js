"use strict"

$.get("data/blog.json").done(function(data){
    let htmlString = "";
    data.forEach(function(bPost){
        htmlString += `<div class="bPost card shadow"><h2>${bPost.title} <small class="text-muted">${bPost.date}</small></h2><p>${bPost.content}</p></div><br>`;
    })
    $("#posts").html(htmlString);
});