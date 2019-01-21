function lunbo(){
    var index = 0;
    var timer = null;
    var page = $(".center ol li");
    var list = $(".center ul li");
    timer = setInterval(autoPlay,1500);
    function autoPlay(){
        index++;
        if(index==page.length){
            index=0;
        }
        list.eq(index).fadeIn(1000).siblings().fadeOut(1000);
        page.eq(index).addClass("current").siblings().removeClass("current");
    }
    page.mouseenter(function(){
        clearInterval(timer);
        index = $(this).index()-1;
        autoPlay();
    })
    page.mouseleave(function(){
        timer = setInterval(autoPlay,1500);
    })
    
}
lunbo();

$(".Img1 li p").fadeTo(0,0.7);
	$(".Img1 ul li ul li").each(function(index,item){
        $(this).mouseover(function(){
            $(this).find("p").animate({"top": 160},500);
        }).mouseout(function(){
            $(this).find("p").animate({"top":185},500)
        })
    })
    
// function xun(){
//     var index=0;
//     var Img = document.getElementById("Img1");
//     var list = document.getElementById("active");
//     var toLeft = document.getElementById("toLtft");
//     var toRight = document.getElementById("toRight");
//     toLeft.onclick = function(){
//         index--;
//         if(index==-1){
//             index=list.length;
//         }
//         move(list,{left:1200 * index})
//      }
//      toRight.onclick = function(){
//          index++;
//          if(index == 2){
//              index = 0;
//          }
//          move(list,{left :-1200 * index})
// }
// }
// xun()

$(function(){
    var flag = false;  //设置开关变量(判断是否正在运动)
    $(window).scroll(function(){  //window触发scroll事件
        // console.log(1);
        var scrollTop = $("html,body").scrollTop();  //获取滚动高度
        // console.log(scrollTop)
        if(scrollTop >= 500){   //判断scrollTop的高度是否满足条件
            if(flag){ //当正在运动时
                return 0
            };
            flag = true;  
            $("article").stop().animate({
                top:0
            },function(){
                flag = false;
            })
        }else{
            $("article").stop(true,true);
            $("article").css({
                top:-80
            })
        }
    })
})
// 回到顶部--------------------------------------------
function Stick(){
    $("figure .top").click(function(){
        //document.documentElement.scrollTop || document.body.scrollTop
        $("html,body").animate({
            scrollTop : 0
        },1000)
    })
}
Stick();

    function Fn(){
        var box = document.getElementById("box");
        var listH = document.getElementById("list").offsetHeight;
        console.log(listH)
        var num = 0;//用num记录着box的top值，刚开始top值为0
        function autoMove(){
            num--;
            box.style.top = num + "px";
            if(num < -listH){
                num = 0;
            }		
        }
        setInterval(autoMove,400)
    };
    Fn();
