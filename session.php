<?php
    include('connection.php');
    session_start();
    
    if(isset($_SESSION['id']))
    {
        $user_check=$_SESSION['id'];
        $sql = mysqli_query($db,"SELECT * FROM comm_user WHERE id='$user_check' ");
        $row=mysqli_fetch_array($sql,MYSQLI_ASSOC);
        $_SESSION['username']=$row['username'];
//        header("Location: /Project%20BizApp/bizappmall");
    }
?>