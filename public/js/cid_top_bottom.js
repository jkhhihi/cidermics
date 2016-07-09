// JavaScript Document
$(document).ready(function(){

$(".mob-menu").click(function() {
  $("#menu").addClass("open");
});

$(".close").click(function() {
  $("#menu").removeClass("open");
});
$(".mob-menu").click(function () {
    $("#menu,.page_cover,html").addClass("open"); // �޴� ��ư�� �������� �޴�, Ŀ��, html�� open Ŭ������ �߰��ؼ� ȿ���� �ش�.
    window.location.hash = "#open"; // �������� �̵��Ѱ� ó�� URL �ڿ� #�� �߰��� �ش�.
});

window.onhashchange = function () {
    if (location.hash != "#open") { // URL�� #�� ���� ��� �Ʒ� ����� �����Ѵ�.
        $("#menu,.page_cover,html").removeClass("open"); // open Ŭ������ ���� ������� ������.
    }
};

});