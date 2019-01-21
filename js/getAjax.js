//function getAjax(url,callback,data){
//    var xhr = null;
//    if(window.XMLHttpRequest){ // 高版本浏览器
//        xhr = new XMLHttpRequest();
//    }else{//低版本浏览器
//        xhr = new ActiveXObject('Microsoft.HTTP');
//    }
//    if(data){
//        url = url + data;
//    }
//    xhr.open("get",url,true);
//    xhr.send();
//    xhr.onreadystatechange = function () {
//        if(xhr.readyState == 4 && xhr.status == 200){
//            res = xhr.responseText;
//            callback(res);
//        }
//    }
//}
function getAjax(url,callback,data) {
    var xhr = null;
    if (window.XMLHttpRequest) { // 高版本浏览器
        xhr = new XMLHttpRequest();
    } else {//低版本浏览器
        xhr = new ActiveXObject('Microsoft.HTTP');
    }
    if (data) {
        url = url + data;
    }
    xhr.open("get", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            res = xhr.responseText;
            callback(res);
        }
    };
}
function promiseAjax(url,data){ // 发送Ajax是一个承诺， 数据拿到  成功执行
    var pro = new Promise(function(success,fail){
        if(data){
            url = url + "?" + data;
        }
        var xhr = new XMLHttpRequest;
        xhr.open("get",url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var res = xhr.responseText;
                success(res); // resolved
                /*fail();*/
            }
        };
        setTimeout(function(){
            fail("失败"); //rejected
        },5000)
    });
    return pro;
}