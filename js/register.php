<?php 
header("content-type:text/html;charset=utf-8");
$uname = $_GET['uname'];
$upwd  = $_GET['upwd'];
$flag = $_GET['flag'];


mysql_connect("127.0.0.1","root","root");
mysql_select_db("1127");
mysql_query("set names utf8");
$sql = "select * from `user` where uname='$name'";
$res = mysql_query($sql);
$arr = mysql_fetch_assoc($res);
if($flag =="register1"){
   if($arr){
       echo 0;
   }else{
       $sql = "insert into `user` (uname,upwd) VALUES ('$name','$pwd')";
       $res=mysql_query($sql);
       if($res){
           echo 1;
       }else{
           echo 2;
       }
   }

   else if($flag == "login1"){
    if($arr){
        if($pwd == $arr["upwd"]){
            echo 1;
        }else{
            echo 2;
        }
    }else {
        echo 0;

    }
}





?>