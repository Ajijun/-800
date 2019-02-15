// res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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


//商品列表页
$(function(){
    var index = 1;
    var count = 40;
    var total = null;
    function showData(){
        $.ajax({
            url:"../data/youpin.json",
            type:"GET",
            dataType:"json",
            success:function(data){
                // console.log(data)
                // console.log(typeof data)
                var arr = Array.from(data)
                // console.log(arr)
                var str = "";
                for(var i = (index - 1) * count;i < index * count;i ++){
                    // console.log(data[i])
                    if(i < arr.length){
                        str += `
                            <li>
                                <a href="details.html?id=${arr[i].id}">
                                    <img src="${arr[i].src}" alt="">
                                    <p>${arr[i].title}</p>
                                    <p><span>￥</span><b>${arr[i].price}</b><i>${arr[i].last_price}</i></p>
                                    <p>已售<span>${arr[i].sold}</span>件</p>
                                </a>
                            </li> `;
                    }
                }
                $(".main_list").html(str);
                total = Math.ceil(arr.length / 40);
                // console.log(total)
                var str1 = "";
                for(var i = 1;i <= total;i ++){
                    str1 += `<li>${i}</li>`;
                }
                $(".u").html(str1);
                // console.log($(".u li"))
                $(".u li").eq(index-1).addClass("active");
            }
        })
    }
    showData();
    $(".u").on("click","li",function(){
        $(this).css({
            color: "#fff",
            background: "#ff404c"
        });
        index = $(this).html();
        showData();
    })
        
    $(".left").click(function(){
       if(index == 1){
           index = 1;
           return
       }else{
           index--;
       }
       showData();
   })
    
   $(".right").click(function(){
        if(index == total){
            index = total;
            return
        }else{
            index++;
        }
        showData();
    })
})