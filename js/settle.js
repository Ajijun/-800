
//可能喜欢
$(function(){
    $.ajax({
        url:"./data/settle.json",
        type:"GET",
        dataType:"json",
        success:function(res){
            var str = "";
            for(var i = 0;i < res.length;i ++){
                // console.log(res[i])
                str += `
                        <li>
                            <a href="">
                                <img src="${res[i].src}" alt=""> 
                                <p>${res[i].title}</p>
                                <p><span>${res[i].price}</span><span>新品上架</span></p>
                            </a>
                        </li> 
                        `;
            }
            $(".maybelist").html(str)
        }
    })
})

//接收cookie传值
$(function(){
    var arr = getCookie("shopCookie");
    var str = "";
    for(var i = 0; i < arr.length;i ++){
        var shopinfo = arr[i];
        // console.log(shopinfo)
        str += '<li class="shopitem">'+
                    '<a href=""><input type="checkbox" class="ck"></a>'+
                    '<a href=""><img src="' + shopinfo.src + '" alt=""></a>'+
                    '<a href=""><span>' + shopinfo.title + '</span><br><i>7</i></a>'+
                    '<a href="">'+
                        '<span>颜色：9189樱桃粉</span><br>'+
                        '<span>尺码：M</span>'+
                    '</a>'+
                    '<a href="">'+
                        '<span>' + (Number(shopinfo.price)).toFixed(2) + '</span><br>'+
                        '<span>' + (Number(shopinfo.last_price)).toFixed(2) + '</span>'+
                    '</a>'+
                    '<a href="javascript:;" data-id="'+ shopinfo.id +'">'+
                        '<em class="updateCount" data-number="-1">-</em>'+
                        '<span class="shopcount">' + shopinfo.count + '</span>'+
                        '<em class="updateCount" data-number="1">+</em>'+
                    '</a>'+
                    '<a href=""><b class="sumPrice">' + (Number(shopinfo.price * shopinfo.count)).toFixed(2) + '</b></a>'+
                    '<span>'+
                        '<a href="javascript:;" class="delself">删除</a><br>'+
                        '<a href="javascript:;">移入收藏</a>'+
                    '</span>'
                '</li>';
    }
    $(".shoplist").html(str)


    //全选结算
    // $("#qx").click(function(){ 
    //     $(this).prop("checked",true);
    //     var ck = $(".shoplist").find(".ck");
    //     ck.prop("checked",!ck.prop("checked"));
    //     settle()
    //     if($(".ck:checked").length == 0){
    //         $(".sumCount").html(0);
    //         $(".pay").html("￥0.00")
    //     }

    // })


    
    //全选2
    $(function() {
        // 获取全选多选框
        var $all = $("#qx");
        var $allBot = $(".qxdel");
        // 获取tbody下的input
        var $inputs = $(".shoplist").find(".ck");
        // inputs的长度
        var $len = $inputs.length;
        // 为all添加点击事件
        $all.on("click", function() {
            // 因为属性是checked所以要用prop，如果用attr，有问题
            $inputs.prop("checked",this.checked);
            settle()
            if($(".ck:checked").length == 0){
                $(".sumCount").html(0);
                $(".pay").html("￥0.00")
            }

        });
        $allBot.on("click", function() {
            // 因为属性是checked所以要用prop，如果用attr，有问题
            $inputs.prop("checked",this.checked);
            settle()
            if($(".ck:checked").length == 0){
                $(".sumCount").html(0);
                $(".pay").html("￥0.00")
            }
        });
        // 为每个tbody下的input添加点击事件
        $inputs.on("click", function() {
            // 定义一个变量，默认为true
            var flag = true;
            /*这里如果直接用$inputs获取checked，只能获取第一个input的值，jquery的隐式迭代，设置的时候，都设置相同的值，而获取的时候，只获取第一个中的值*/
            // 所以还是要用for循环遍历inputs
            for(let i = 0; i < $len; i ++) {
                // $inputs[i]返回的是DOM对象
                if(!$inputs[i].checked){
                    flag = false;
                }
            }
            $all.prop("checked",flag);
            $allBot.prop("checked",flag);
            settle()
            if($(".ck:checked").length == 0){
                $(".sumCount").html(0);
                $(".pay").html("￥0.00")
            }
        });
    });





    //自删部分
    $(".shoplist>li").on("click",".delself",function(){
        console.log(1)
        $(this).parents(".shopitem").remove()
    })


    //批量删除
    $(".countall .delmass").click(function(){
        $(".shoplist").find(".ck:checked").parents(".shopitem").remove()
    })

    // //全选删除
    // $(".countall .qxdel").click(function(){
    //     $(this).prop("checked",true);
    //     $(".shoplist").find(".ck").prop("checked",true);
    // })

    //结算功能
    function settle(){
        var count = 0;  //计件器
        var money = 0;  //总价
        $(".ck:checked").each(function(index,item){  //遍历所有被选中的商品
            count += parseInt($(this).parents(".shopitem").find(".shopcount").html());  //每个计件器名字都相同，只能通过其父级来找
            money += parseFloat($(this).parents(".shopitem").find(".sumPrice").html());  //money也一样
            $(".sumCount").html(count);   //将结果放入相应位置
            $(".pay").empty().html(money.toFixed(2));


            $(this).parents(".shoplist").next().css({
                borderColor:"#e70414"
            })
            $(this).parents(".shoplist").next().find("button").css({
                background:"#e70414",
                color:"#fff"
            })
            
        })
    }

    $(".ck").click(function(){
        settle();
    })


    // //修改count
    $(".shoplist>li").on("click",".updateCount",function(){  //点击增或减
        var pid = $(this).parent().data("id");  //获取产品id
        var sign = $(this).data("number"); //获取number属性值，判断是增是减
        var count = $(this).parent().find(".shopcount").html();//因为每个商品都有计件器，所以要通过其父元素来获取当前计件器数值
        if(sign == -1 && count == 1){  //当计件器里数量为1，且sign是减时
            return   //终止减少
        }
        for(var i = 0; i < arr.length;i ++){  //遍历cookie数组对象
            if(pid == arr[i].id){  //如果现有的cookie中存在当前商品信息
                arr[i].count += sign;  //修改cookie中商品的数量
                setCookie("shopCookie",JSON.stringify(arr));  //将修改后的数据转化为字符串存到cookie中

                //在结算修改商品数量
                $(this).parent().find(".shopcount").html(arr[i].count);
                $(this).parent().next().find(".sumPrice").html((arr[i].count * arr[i].price).toFixed(2));
                settle();
                break;
            }
        }
    })
    























    // //全选部分
    // console.log($(".sect_top #qx").attr("checked"))
    // if($(".sect_top #qx").attr("checked") == "true"){

    //     $(".ck").prop("checked",true)
    // }












})




















