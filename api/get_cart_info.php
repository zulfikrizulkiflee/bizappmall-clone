<?php
include("connection.php");

$action  = $_GET['action'];

$user_id = $_GET['uid'];

if($action == "updateComplete"){
    $id=$_GET['id'];
    $sql = "UPDATE comm_cart SET completed='1' WHERE user_id='".$user_id."' AND id='".$id."'";
    
    if($data = $db->query($sql)){
        echo "Completed";
    }else{
        echo "Something gone wrong";
    }
}

if($action == "history"){
    $myArray = array();
    if ($result = $db->query("SELECT id,batch_id,seller_id, product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, quantity1, quantity2, quantity3, quantity4, quantity5, quantity6, quantity7, quantity8, quantity9, quantity10, price_sum, delivery_name, delivery_address1, delivery_address2, delivery_address3, delivery_phone, delivery_postcode, delivery_state, checkin_date, emall_fpxurl, payment_status,trackingno,completed FROM comm_cart WHERE user_id='".$user_id."' AND checkout=1 ORDER BY checkin_date DESC")) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
            $tempArray = $row;
            array_push($myArray, $tempArray);
        }
        echo json_encode($myArray);
    }
    $result->close();
}

if($action == "updatecheckout"){
    $batchid=$_GET['batchid'];
    
    $sql = "UPDATE comm_cart SET checkout='1' WHERE user_id='".$user_id."' AND batch_id='".$batchid."'";
    
    if($data = $db->query($sql)){
        echo "Checkout successful";
    }else{
        echo "Something gone wrong";
    }
}

if($action == "updatefpx"){
    $batchid=$_GET['batchid'];
    $fpxurl=$_GET['fpxurl'];
    
    $sql = "UPDATE comm_cart SET emall_fpxurl='".$fpxurl."' WHERE user_id='".$user_id."' AND batch_id='".$batchid."'";
    
    if($data = $db->query($sql)){
        echo "Continue to pay";
    }else{
        echo "Something gone wrong";
    }
}

if($action == "EMALL_UPDATE_PAYMENT_STATUS"){
    $batchid=$_GET['batchid'];
    $paymentstatus=$_GET['pay-status'];
    
    $sql = "UPDATE comm_cart SET payment_status='".$paymentstatus."' WHERE user_id='".$user_id."' AND batch_id='".$batchid."'";
    
    if($data = $db->query($sql)){
        echo "Payment Status Updated";
    }else{
        echo "Something gone wrong";
    }
}

if($action == "EMALL_UPDATE_TRACKINGNO"){
    $batchid=$_GET['batchid'];
    $trackingno=$_GET['trackingno'];
    
    $sql = "UPDATE comm_cart SET trackingno='".$trackingno."' WHERE user_id='".$user_id."' AND batch_id='".$batchid."'";
    
    if($data = $db->query($sql)){
        echo "OK";
    }else{
        echo "Something gone wrong";
    }
}

if($action =="insert"){
    $product1 = $_GET['product1'];
    $product2 = $_GET['product2'];
    $product3 = $_GET['product3'];
    $product4 = $_GET['product4'];
    $product5 = $_GET['product5'];
    $product6 = $_GET['product6'];
    $product7 = $_GET['product7'];
    $product8 = $_GET['product8'];
    $product9 = $_GET['product9'];
    $product10 = $_GET['product10'];
    
    $quantity1 = $_GET['quantity1'];
    $quantity2 = $_GET['quantity2'];
    $quantity3 = $_GET['quantity3'];
    $quantity4 = $_GET['quantity4'];
    $quantity5 = $_GET['quantity5'];
    $quantity6 = $_GET['quantity6'];
    $quantity7 = $_GET['quantity7'];
    $quantity8 = $_GET['quantity8'];
    $quantity9 = $_GET['quantity9'];
    $quantity10 = $_GET['quantity10'];
    
    $seller_id = $_GET['pid'];
    
    $name = $_GET['delivery_name'];
    $email = $_GET['delivery_email'];
    $phone = $_GET['delivery_phone'];
    $address1 = $_GET['delivery_address1'];
    $address2 = $_GET['delivery_address2'];
    $address3 = $_GET['delivery_address3'];
    $postcode = $_GET['delivery_postcode'];
    $state = $_GET['delivery_state'];
    
    $price_sum=$_GET['price_sum'];
    
    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product1." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity1);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product2." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity2);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product3." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity3);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product4." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity4);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product5." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity5);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product6." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity6);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product7." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity7);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product8." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity8);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product9." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity9);
//    
//    $sql_price = "SELECT price FROM track_product WHERE id=".$product10." LIMIT 1";
//    $result = mysqli_query($db, $sql_price);
//    $row = mysqli_fetch_assoc($result);
//    $price_per = $row['price'];
//    $price_sum = $price_sum+((float)$price_per * (int)$quantity10);
    
    $batch_id = $_GET['batch_id'];
  
    $sql = "INSERT INTO comm_cart (batch_id,user_id,seller_id,product1,product2,product3,product4,product5,product6,product7,product8,product9,product10,quantity1,quantity2,quantity3,quantity4,quantity5,quantity6,quantity7,quantity8,quantity9,quantity10,price_sum,checkout,delivery_name,delivery_phone,delivery_address1,delivery_address2,delivery_address3,delivery_postcode,delivery_state,delivery_email,emall_fpxurl,trackingno) VALUES ('".$batch_id."','".$user_id."','".$seller_id."','".$product1."','".$product2."','".$product3."','".$product4."','".$product5."','".$product6."','".$product7."','".$product8."','".$product9."','".$product10."','".$quantity1."','".$quantity2."','".$quantity3."','".$quantity4."','".$quantity5."','".$quantity6."','".$quantity7."','".$quantity8."','".$quantity9."','".$quantity10."','".$price_sum."','0','".$name."','".$phone."','".$address1."','".$address2."','".$address3."','".$postcode."','".$state."','".$email."','0','0')"; 

    $data = $db->query($sql); 
    
//    echo $batch_id;
    
    $myArray = array();
    if ($result = $db->query("SELECT * FROM comm_cart WHERE user_id='".$user_id."' AND batch_id='".$batch_id."' AND checkout=0 ORDER BY checkin_date DESC")) {
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
