<?php
    header("content-type:text/html;charset=utf-8");
    $uname = $_GET['uname'];
    $upwd  = $_GET['upwd'];


    mysql_connect("127.0.0.1","root","root");
    mysql_select_db("1127");
    mysql_query("set names utf8");
    $sql = "select * from `user` where uname='$uname'";
    $res = mysql_query($sql);
    $arr = mysql_fetch_assoc($res);
    if($arr){
        echo 0;
    }else{
        $sql = "insert into `user` (uname,upwd) VALUES ('$uname','$upwd')";
        $res = mysql_query($sql);//返回布尔值;添加成功返回true;
        if($res){//添加成功
            echo 1;
        }else{
            echo 2;
        }
    }