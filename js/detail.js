window.onload=function(){
	var url=window.location.href;
	var obj=addres(url);
	var pid=obj.uid;
	
	$.ajax({
		type:"get",
		url:"data.json",
		cache:true,
		async:true,
		success:function(res){
			
			var str="";
			for(var i=0; i<res.length; i++){
				var cur=res[i];
				
				if (cur.id==pid) {
					str+=`
					<p>${cur.min}</p>
					<aside>
						<p>
							<b>${cur.prise}</b>
							<span>￥149.00</span>
							<img src="" />
							<span>
								去客户端签到领好礼
							</span>
						</p>
						<p>
							<span>积分</span>
							<b>zo最多返40积分﹀</b>
							<b>积分可抵订单金额</b>
						</p>
						<p>
							<span>优惠</span>
							<span>指定商品无条件优惠3元</span>
							<span>点击领卷</span>
							<span>更多优惠活动</span>
						</p>

					</aside>
					<article>

						<p>
							<span>运费</span>
							<span>江苏</span>
							<span>苏州</span>
							<span>至</span>
							<span>北京</span>
							<span>免运费</span>
						</p>
						<p>
							<span>服务</span>
							<span>折</span>
							<span>本商品有折800买手砍价</span>
						</p>
						<p>
							<span>折</span>
							<span>支付成功后24小时发货</span>
						</p>
						<p>
							<span>颜色</span>
							<img src=""../images/tu3.jpg" />
							<img src=""../images/tu4.jpg" />
							

						</p>

						<p>
							<span>尺码</span>
							<span>${cur.w}</span>
							<span>${cur.w2}</span>

						</p>
						<div class="count">
							<a>数量</a>
							<p>
								<b>-</b>
								<b>5</b>
								<b>+</b>
							</p>

						</div> 
						<div class="btn">
							<button>立即购买</button>
							<button pid=${cur.id} name=${cur.min} src=${cur.ig} price=${cur.prise} color=${cur.color} id="btn">加入购物车</button>
						</div>

					</article>

					`;
				}
			}
			$(".right").html(str);
		}
    })
	//利用时间委托   加入购物车把这个商品的id name price src 都存进cookie
		 var arr = [];
		 $(".right").on('click','button',function(){
			 var flag = true;
			 var obj = {//即将加入购物车的信息
				 id : $(this).attr('pid'),
				 min : $(this).attr('name'),
				 prise:$(this).attr('price'),
				 ig:$(this).attr('src'),
				 color:$(this).attr('color'),
				 count :1
			 }
			 var cookieInfor = getCookie("shopList");
			 if(cookieInfor.length != 0){
				 arr = cookieInfor;
				 for(var i = 0;i< arr.length;i++){
					 if(arr[i].id == obj.id){
						 arr[i].count++;
						 flag = false;
					 }
				 }
			 }
			 if(flag){
				 arr.push(obj)
			 }
	
			 setCookie("shopList",JSON.stringify(arr));
			 if(!confirm("确定-继续购物, 取消-去购物车结算")){
				 window.location.href = "douwuche.html"
			 }
		 })
}

function TabChange(){
	this.tabs = document.getElementById("bottom1").children;
	this.con = document.getElementById("big").children;
	
	this.init = function(){
		for(let i = 0 ;i< this.tabs.length;i++){
			this.tabs[i].onmouseover = function(){
				this.clearAll();

				this.change(i);
			}.bind(this)
		}
	}

	this.clearAll = function(){
		for(var i = 0;i< this.tabs.length;i++){
			this.tabs[i].className = "";
			this.con[i].className = "";
		}
	}
	this.change = function(index){
		this.tabs[index].className = "purple";
		this.con[index].className = "show";
	}
}
var res = new TabChange();
res.init();


// $("#small li").mouseover(function(){
// 	var index = $(this).index();
// 	$("#big img").eq(index).show().siblings("img").hide();
// })


