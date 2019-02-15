function move(obj,json,callback){// obj ： 运动的对象   data:代表所有的属性和目标值   callback:代表回调函数
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //设置开关变量，所有的属性都达到目标值才移出定时器
        var flag = true
        for(var attr in json){
            var cur = 0;    
            if(attr == "opacity"){   // "0.3"   js 小数容易出问题 ，咱们要把 小数变为整数
                cur = parseFloat(getStyle(obj,attr)) * 100;   // getStyle（）取出来的是字符串 ， 所以 parseFloat
            }else{
                cur = parseInt(getStyle(obj,attr));   //去掉单位px;
            }
            var speed = (json[attr] - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(cur != json[attr]){
                flag = false;
            }
            if(attr == "opacity"){
                obj.style[attr] = (cur + speed) / 100;
            }else{
                obj.style[attr] = cur + speed + "px";
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(callback){
                callback();  //没给callback传值，callback是undefined，执行报错
            }
        }
    },30)
}


//获取非行间样式封装函数
function getStyle(obj,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(obj,null)[attr];
    }else{
        return obj.currentStyle[attr];
    }
}