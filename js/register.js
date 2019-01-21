$(function(){

var SlideVerifyPlug = window.slideVerifyPlug;
var slideVerify2 = new SlideVerifyPlug('#verify-wrap2',{
wrapWidth:'238',
initText:'请按住滑块',
sucessText:'验证通过',
})
})
/*登录隐藏显示 */
$("section .right .tiao").click(function(){
	$(".right").css("display","none")
	$(".right1").css("display","block")
})
$("section .right1 .tiao1").click(function(){
	$(".right1").css("display","none")
	$(".right").css("display","block")
})


