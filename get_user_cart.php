<?php
include("connection.php");

$action  = $_GET['action'];

$user_id = $_GET['uid'];

if($action == "update"){
    $cart_data=$_GET['cart_data'];
    
    $sql = "UPDATE comm_user SET cart_data='".$cart_data."' WHERE id='".$user_id."'";
    
    if($data = $db->query($sql)){
        echo "Cart updated";
    }else{
        echo "Something gone wrong";
    }
}

if($action =="read"){   
    $myArray = array();
        if ($result = $db->query("SELECT cart_data FROM comm_user WHERE id=".$user_id)) {
            $tempArray = array();
            while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
            }
            echo json_encode($myArray);
        }
        $result->close();
}

$db->close();
?>