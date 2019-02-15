//提示添加收藏
$("#index_collection p").click(function(){
    $(this).parents(".index_collection").remove();
});

//导航栏手机版二维码
$(".header_phone").mouseover(function(){
    $("header ul .phone_code").css("display","block");
});

$(".header_phone").mouseout(function(){
    $("header ul a .phone_code").css("display","none");
})

//签到活动
$(".sign_last").mouseover(function(){
    $(this).find(".sign_ad").css("display","block");
})
$(".sign_last").mouseout(function(){
    $(this).find(".sign_ad").css("display","none");
})





//楼梯
// function louTi(){
//     var flag = true;//假设值为true时  可以触发滚动条
// 	$(".biaoti li:not(.last)").click(function(){
//         console.log($(".biaoti li:not(.last)"))
// 		flag = false;
// 		//操作当前的li中span的样式类为 active
// 		$(this).addClass("active")
// 			   .end()
// 			   .siblings()
// 			   .removeClass("active");
// 		//获取当前点击的楼层号的下标
// 		var index = $(this).index();
// 		//根据index找到对应楼层的offset().top值
//         var t = $(".main_aside ol").eq(index).offset().top;
//         console.log($(".main_aside ol").eq(index))
// 		//设置页面滚走的距离为t
// 		$("body,html").animate({scrollTop : t},1000,function(){
// 			//运动完成后 开启开关变量的值
// 			flag = true;
// 		});
// 	})
	
// 	//操作滚动条
// 	$(window).scroll(function(){
// 		if( flag ){
// 			//获取页面滚走的距离
// 			var sTop = $(document).scrollTop();
			
// 			//遍历所有楼层  找到在可视区最高的楼层  
// 			// 这个楼层满足 ：   abs(楼层的top值-页面滚走的距离)<楼层高度的一半
// 			$floor = $(".Louti").filter( function(){
// 				//返回满足某个条件的楼层
// 				return Math.abs( $(this).offset().top-sTop ) < $(this).height()/2;
// 			} )
// 			//获取当前在可视区显示最高的楼层的index下标
// 			var index = $floor.index();
// 			if( index!=-1 ){
// 				//根据index找到对应的楼层号
// 				$("#LoutiNav li:not(.last)").eq(index)
// 									        .find("span")
// 									        .addClass("active")
// 									        .end()
// 									        .siblings()
// 									        .find("span")
// 									        .removeClass("active");
// 			}
// 			//当页面滚走的距离小于某个值时  把第一个楼层号的样式清除
// 			if( sTop < 100 ){
// 				$("#LoutiNav li:not(.last)").eq(0).find("span").removeClass("active");
// 			}
// 		}
		
// 	})
// }
// louTi();



//详情页
window.onload = function(){
    var url = window.location.href;
    var obj = addres(url);
    // console.log(obj);
    var pid = obj.id;
    // console.log(pid);
    $.ajax({
        type:"get",
        url:"./data/youpin.json",
        async:"true",
        success:function(res){
            // console.log(res)
            var arr = Array.from(res);
            // console.log(arr.length)
            var str1 = "";
            var str2 = ""; 
            var str3 = "";
            for(var i = 0 ;i < arr.length;i ++){
                // console.log(arr[i].id)
                // console.log(arr[i].title)
                if(arr[i].id == pid){
                    str1 += `
                            <div id="floatbox"></div>
                            <li><img z-index="6" src="${arr[i].src}" alt=""/></li>
                            <li><img z-index="5" src="img/details/big2.jpg" alt=""/></li>
                            <li><img z-index="4" src="img/details/big3.jpg" alt=""/></li>
                            <li><img z-index="3" src="img/details/big4.jpg" alt=""/></li>
                            <li><img z-index="2" src="img/details/big5.jpg" alt=""/></li>
                            <li><img z-index="1" src="img/details/big6.jpg" alt=""/></li> `;
                    str2 = `
                            <li><img z-index="6" src="${arr[i].src}" alt=""/></li>
                            <li><img z-index="5" src="img/details/big2.jpg" alt=""/></li>
                            <li><img z-index="4" src="img/details/big3.jpg" alt=""/></li>
                            <li><img z-index="3" src="img/details/big4.jpg" alt=""/></li>
                            <li><img z-index="2" src="img/details/big5.jpg" alt=""/></li>
                            <li><img z-index="1" src="img/details/big6.jpg" alt=""/></li> `;
                    str3 = `
                            <button><a href="">立即购买</a></button>
                            <button id="addToCar" pid=${arr[i].id} title=${arr[i].title} src="${arr[i].src}" price=${arr[i].price} last_price=${arr[i].last_price}><a href="javascript:;">加入购物车</a></button>
                            `;
                    
                    $(".main_center h3").html(arr[i].title);
                    $(".centpink p b").html(arr[i].price);
                    $(".centpink p i").html(arr[i].last_price);
                }
            }
            $("#midImg").html(str1);
            $("#bottom").html(str2);
            $("#bigImg").html(str2);
            $(".main_center .button").html(str3);


            //放大镜功能
            var mainLeft = $(".main_left");
            var leftBox = $id("leftBox");
            var oFloat = $id("floatbox");
            var oMid = $id("midImg");
            var sMid = document.querySelectorAll("#midImg li");
            var aBot = document.querySelectorAll("#bottom li");
            var oBig = $id("bigImg");
            var aBig = document.querySelectorAll("#bigImg li");
           
            //鼠标移入midImg时，浮动框显示，大图显示
            oMid.onmouseover = function(){
                oFloat.style.display = "block";
                oBig.style.display = "block";
            }
            //鼠标移出时浮动框消失，大图消失
            oMid.onmouseout = function(){
                oFloat.style.display = "none";
                oBig.style.display = "none";
            }
            //鼠标移入小图时对应下标大图显示 
            for(var i = 0; i < aBot.length;i ++){
                aBot[i].index = i;
                aBot[i].onmouseover = function(){
                    this.style.borderColor = "#ec1611";
                    for(var j = 0; j < sMid.length; j ++){
                        sMid[j].style.display = "none";
                        sMid[j].index = j;
                        sMid[j].onmouseover = function(){  //放大镜对应的大图显示
                            for(var k = 0; k < aBig.length; k ++){
                                aBig[k].style.display = "none";
                            }
                            aBig[this.index].style.display = "block";
                        }
                    }
                    sMid[this.index].style.display = "block";
                }
                aBot[i].onmouseout = function(){
                    this.style.borderColor = "#cccccc";
                }
            }

            //鼠标在midImg内移动时
            oMid.onmousemove = function(evt){
                var e = evt || event;
                // console.log(e.pageX,e.pageY)
                // console.log( oMid.offsetLeft)
                var x = e.pageX - (mainLeft[0].offsetLeft + leftBox.offsetLeft + oMid.offsetLeft)- oFloat.offsetWidth / 2;
                var y = e.pageY - (mainLeft[0].offsetTop + leftBox.offsetTop + oMid.offsetTop) - oFloat.offsetHeight / 2;
                var maxL = oMid.offsetWidth - oFloat.offsetWidth;
                var maxT = oMid.offsetHeight - oFloat.offsetHeight;
                x = x < 0 ? 0 : x > maxL ? maxL : x;
                y = y < 0 ? 0 : y > maxT ? maxT : y;
                oFloat.style.left = x + "px";
                oFloat.style.top = y + "px"; 
                //计算比例
                var propX = oMid.offsetWidth / oFloat.offsetWidth;
                var propY = oMid.offsetHeight / oFloat.offsetHeight;
                for(var i = 0;i < aBot.length;i ++){
                    aBig[i].style.left = - x * propX + "px";
                    aBig[i].style.top = - y * propY + "px";
                }
                
            }



            //加入购物车
            var addCart = $id( "addToCar" );
            var shopCart = $id( "shopCar" );
            var oP = $id("shopNum");
            //  console.log(addCart,shopCart,oP)
            var num = 0;
            addCart.onclick = function(){
                // console.log(addCart.offsetLeft)
                //确定三点坐标
                var startPoint = {
                    x : addCart.offsetLeft + addCart.offsetWidth/2,
                    y : addCart.offsetTop
                }
                var endPoint = {
                    x : shopCart.offsetLeft + shopCart.offsetWidth/2,
                    y : shopCart.offsetTop
                }
                var topPoint = {
                    x : endPoint.x - 100,
                    y :endPoint.y - 80
                }
                
                //根据三点坐标确定抛物线系数
                var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x) - (startPoint.y - topPoint.y) * (startPoint.x - endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x)-(startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));  
                
                var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x - startPoint.x);  
                
                var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;
                
                //创建商品
                var good = document.createElement("div");
                good.className = "god";
                document.body.appendChild( good );
                good.style.left = startPoint.x + "px";
                good.style.top = startPoint.y + "px";
                var x = startPoint.x;
                //商品运动   
                var  timer = setInterval(function(){
                    x = x + 20;
                    y = a*x*x + b*x + c;
                    if( x < endPoint.x ){ //运动的横向区间
                        good.style.left = x + "px";
                        good.style.top = y + "px";
                    }else{
                        good.remove();
                        clearInterval(timer);
                        oP.innerHTML = ++num;
                    }
                },30)
            }




        }
    })
  
    // //传值到购物车
    // $(function(){
        var arr = [];
        $(".main_center .button").on("click","button",function(){
            // console.log(1)
            var flag = true;
            obj = {
                id : $(this).attr("pid"),
                title:$(this).attr("title"),
                src:$(this).attr("src"),
                price:$(this).attr("price"),
                last_price:$(this).attr("last_price"),
                count:1
            }
            // console.log(obj)
            var shopCookie = getCookie("shopCookie");
            if(shopCookie.length != 0){
                arr = shopCookie;
                // console.log(arr)
                for(var i = 0; i < arr.length;i ++){
                    if(arr[i].id == obj.id){
                        arr[i].count ++ ;
                        flag = false;
                    } 
                }
            }
            if(flag){
                arr.push(obj);
            }
            console.log(arr)
            setCookie("shopCookie",JSON.stringify(arr));

            if(!confirm("确定-继续购物，取消-去购物车结算")){
                window.location.href = "settle.html"
            }else{
                window.location.href = "list.html"
            }
        })

    // })



}
// //传值到购物车
// $(function(){
//     var arr = [];
//     $(".main_center .button").on("click",".addToCar",function(){
//         var flag = true;
//         obj = {
//             id : $(this).attr("pid"),
//             title:$(this).attr("title"),
//             src:$(this).attr("src"),
//             price:$(this).attr("price"),
//             count:1
//         }

//         var shopCookie = getCookie("shopCookie");
//         if(shopCookie.length != 0){
//             arr = shopCookie;
//             for(var i = 0; i < arr.length;i ++){
//                 if(arr[i].id == obj.id){
//                     arr[i].count ++ ;
//                     flag = false;
//                 } 
//             }
//         }
//         if(flag){
//             arr.push(obj);
//         }
//         setCookie("shopCookie",JSON.stringify(arr));

//         if(!confirm("确定-继续购物，取消-去购物车结算")){
//             window.location.href = "settle.html"
//         }
//     })

// })




























































// //放大镜
// function magnifier(){
//     var mainLeft = $(".main_left");
//     var leftBox = $id("leftBox");
//     var oFloat = $id("floatbox");
//     var oMid = $id("midImg");
//     var sMid = document.querySelectorAll("#midImg li");
//     var aBot = document.querySelectorAll("#bottom li");
//     var oBig = $id("bigImg");
//     var aBig = document.querySelectorAll("#bigImg li");
//     // console.log(oFloat)
//     // console.log(aMid)
//     // console.log(aBot)
//     // console.log(aBig)
//     // console.log(mainLeft)
//     //鼠标移入midImg时，浮动框显示，大图显示
//     oMid.onmouseover = function(){
//         oFloat.style.display = "block";
//         oBig.style.display = "block";
//     }
//     //鼠标移出时浮动框消失，大图消失
//     oMid.onmouseout = function(){
//         oFloat.style.display = "none";
//         oBig.style.display = "none";
//     }
//     //鼠标移入小图时对应下标大图显示 
//     for(var i = 0; i < aBot.length;i ++){
//         aBot[i].index = i;
//         aBot[i].onmouseover = function(){
//             this.style.borderColor = "#ec1611";
//             for(var j = 0; j < sMid.length; j ++){
//                 sMid[j].style.display = "none";
//                 sMid[j].index = j;
//                 sMid[j].onmouseover = function(){  //放大镜对应的大图显示
//                     for(var k = 0; k < aBig.length; k ++){
//                         aBig[k].style.display = "none";
//                     }
//                     aBig[this.index].style.display = "block";
//                 }
//             }
//             sMid[this.index].style.display = "block";
//         }
//         aBot[i].onmouseout = function(){
//             this.style.borderColor = "#cccccc";
//         }
//     }

//     //鼠标在midImg内移动时
//     oMid.onmousemove = function(evt){
//         var e = evt || event;
//         // console.log(e.pageX,e.pageY)
//         // console.log( oMid.offsetLeft)
//         var x = e.pageX - (mainLeft[0].offsetLeft + leftBox.offsetLeft + oMid.offsetLeft)- oFloat.offsetWidth / 2;
//         var y = e.pageY - (mainLeft[0].offsetTop + leftBox.offsetTop + oMid.offsetTop) - oFloat.offsetHeight / 2;
//         var maxL = oMid.offsetWidth - oFloat.offsetWidth;
//         var maxT = oMid.offsetHeight - oFloat.offsetHeight;
//         x = x < 0 ? 0 : x > maxL ? maxL : x;
//         y = y < 0 ? 0 : y > maxT ? maxT : y;
//         oFloat.style.left = x + "px";
//         oFloat.style.top = y + "px"; 
//         //计算比例
//         var propX = oMid.offsetWidth / oFloat.offsetWidth;
//         var propY = oMid.offsetHeight / oFloat.offsetHeight;
//         for(var i = 0;i < aBot.length;i ++){
//             aBig[i].style.left = - x * propX + "px";
//             aBig[i].style.top = - y * propY + "px";
//         }
        
//     }
// }
// magnifier();