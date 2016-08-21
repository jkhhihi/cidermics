// JavaScript Document
$(document).ready(function(){
	
$(".mob-menu").click(function() {
  $("#menu").addClass("open");
});

$(".close").click(function() {
  $("#menu").removeClass("open");
});
$(".mob-menu").click(function () {
    $("#menu,.page_cover,html").addClass("open");
    window.location.hash = "#open"; 
});

window.onhashchange = function () {
    if (location.hash != "#open") { 
        $("#menu,.page_cover,html").removeClass("open");
    }
};

});

/*
$(document).ready(function(){
    $(".contents_menu").click(function(){
        $(".contents_sub_menu").slideToggle();
    });
});
*/