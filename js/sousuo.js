var search = document.getElementById("search");
var s_list = document.getElementById("sousuo_list");

search.addEventListener("input",_throttle(handlerSearch,500));
var showNum = 4;
var timer = null;

function handlerSearch(){
    var url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${search.value}&json=1&p=3&sid=1422_21089_28131_26350_28266&req=2&csor=2`;
    jsonp(url,"cb")
    .then(function(res){
          // console.log(res.s);
          var html = "";
          res.s.every((item,index)=>{

                html += `<li>${item}</li>`
                return index < showNum;
          })
          list.innerHTML = html;
    }) 
}
function _throttle(callback,dealy){
    
    var timer = null;
    return function(){
          clearTimeout(timer);
         
          timer = setTimeout(function(){
               callback(); 
          },dealy)
    }
}