
    var main = document.getElementById("main1");
	var left = document.getElementById("Left");
	var right = document.getElementById("Right");
	var page = document.getElementById("u");
	var index = 1;// index代表页码  默认第一页
	var num = 40;//每页显示40条数据
	var total = null;
	function showData() {
        getAjax("../js/updated.json",function(msg) {
            var str = "";
            var arr = JSON.parse(msg);
    console.log(arr)
            for (var i = (index - 1) * num; i < index * num; i++) {
                // i = 16; i < 20
                if (i < arr.length) {

                    str += `<li>
                        <a><img src="../images/${arr[i].img}" alt="" /></a>
                        <div>
						  <b><a>${arr[i].title}</a>剩余${arr[i].ddl}天</b>
                        <h3>${arr[i].description}</h3>
                        <a>★收藏品牌</a>
                        </div>
					</li>`;
                }

            }
            	main.innerHTML = str;


            	total = Math.ceil(arr.length / 40);
            	var str1 = "";
            	for(var i = 1; i <= total; i++){
            		str1 += `<li>${i}</li>`;
            	}
            	page.innerHTML = str1;
            	page.children[index - 1 ].className = "active";

            });
            }
            showData();

            page.onclick = function(e){
            var e = e || event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "LI"){
            	index = target.innerHTML;
            	showData();
            }

            }

            left.onclick = function(){
            if(index == 1){
            	index = 1;
            }else{
            	index--;
            }
            showData();

            }

            right.onclick = function(){
            if(index == total){
            	index = total;
            }else{
            	index++;
            }
            showData();
    }