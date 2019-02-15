//求范围随机数
function random(min,max){
    return  Math.round(Math.random() * (max - min)) + min;
}

//通过ID名  获取元素
function $id(id){
    return document.getElementById(id);
}

//通过标签名  获取元素
function $tag(tagname){
    return document.getElementsByTagName(tagname);
}

//随机16进制颜色
function getColor(){
    var str = "0123456789abcdef";
    var color = "#";
    for(var i = 0;i < 6;i ++){
        color += str.charAt(random(0,15));
    }
    return color;
}

//某年某月某日 - 某年某月某日的 秒差
function diff(star,end){
    return Math.abs(star.getTime() - end.getTime()) / 1000;
}

//不足10  前面补0 
function zero(val){ 
    return val < 10 ? "0" + val : val;
}

//将URL里传的数据转化为对象
function addres(str){
	var reg = /([^?=&]+)=([^?=&]+)/g;
	var obj = {};
	str.replace(reg,function(){
		obj[arguments[1]] = arguments[2];
	})
	return obj;
}