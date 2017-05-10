<?php
    if($_SERVER['SERVER_NAME']=="localhost"){
        define('DB_SERVER', '52.221.54.77');
        define('DB_USERNAME', 'admin');
        define('DB_PASSWORD', 'xs2admin_AWS');
        define('DB_DATABASE', 'bizappclassic');
        $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
    }else if($_SERVER['SERVER_NAME']=="www.ansi.com.my"){
        define('DB_SERVER', '52.221.54.77');
        define('DB_USERNAME', 'admin');
        define('DB_PASSWORD', 'xs2admin_AWS');
        define('DB_DATABASE', 'bizappclassic');
        $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
    }else{
        define('DB_SERVER', '52.221.54.77');
        define('DB_USERNAME', 'admin');
        define('DB_PASSWORD', 'xs2admin_AWS');
        define('DB_DATABASE', 'bizappclassic');
        $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
    }

    // Check connection
    if ($db->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
?>