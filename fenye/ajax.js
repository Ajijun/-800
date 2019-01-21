//解决异步的问题 ： 回调函数
function getAjax(url,callback,data){
	var xhr = null;
	var res = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest;
	}else{
	    xhr = ActiveXObject("Microsoft.XMLHTTP");			
	}
	if(data){
		url = url + data;
	}
	xhr.open("get",url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			res = xhr.responseText;
			callback(res);			
		}
	}
	
}

function promiseAjax(url,data){
	if(data){
		url = url + data;
	}
	var pro = new Promise(function(success,failed){//向后台发送ajax
		var xhr = new XMLHttpRequest;
		xhr.open("get",url,true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				success(xhr.responseText);
			}
		}
		setTimeout(function(){
			failed("失败");
		},5000)
	});
	return pro;	//resolved
}
/*var res = promiseAjax("data.json");
res.then(function(msg){
	console.log(msg)
},function(msg){
	console.log(msg)
})
*/











    