<?php
    include('connection.php');
    session_start();
    
    if(isset($_SESSION['id']))
    {
        $user_check=$_SESSION['id'];
        $sql = mysqli_query($db,"SELECT * FROM comm_user WHERE id='$user_check' ");
        $row=mysqli_fetch_array($sql,MYSQLI_ASSOC);
        $_SESSION['username']=$row['username'];
        $_SESSION['uid']=$row['id'];
        $_SESSION['name']=$row['name'];
        $_SESSION['phone']=$row['phone_num'];
        $_SESSION['email']=$row['email'];
        $_SESSION['address1']=$row['address1'];
        $_SESSION['address2']=$row['address2'];
        $_SESSION['address3']=$row['address3'];
        $_SESSION['postcode']=$row['postcode'];
        $_SESSION['state']=$row['state'];
        $_SESSION['cart_data']=$row['cart_data'];
//        header("Location: ../");
    }
?>