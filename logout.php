<?php
    session_start();
    if(session_destroy())
    {
        if($_SERVER['SERVER_NAME']=="localhost"){
            $home=$_SERVER['SERVER_NAME']."/Project BizApp/bizappmall";
        }else if($_SERVER['SERVER_NAME']=="www.ansi.com.my"){
            $home=$_SERVER['SERVER_NAME']."/bizappmall";
        }else{
            $home=$_SERVER['SERVER_NAME'];
        }
        
        header("Location: http://".$home);
    }
?>