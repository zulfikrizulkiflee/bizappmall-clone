<?php
include("connection.php");

$action=$_GET['action'];
$target=$_GET['target'];
$id=(int)$_GET['id'];

if($action == 'check'){
    if($target == 'product'){
        $myArray = array();
        if ($result = $db->query("SELECT userid FROM comm_prod_like WHERE prod_id=".$id)) {
            $tempArray = array();
            while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
            }
            echo json_encode($myArray);
        }
        $result->close();
    }

    if($target == 'shop'){
        $myArray = array();
        if ($result = $db->query("SELECT userid FROM comm_shop_like WHERE pid=".$id)) {
            $tempArray = array();
            while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
            }
            echo json_encode($myArray);
        }
        $result->close();
    }
}

if($action == 'get'){
    if($target == 'product'){
        $myArray = array();
        if ($result = $db->query("SELECT * FROM comm_prod_like WHERE prod_id=".$id)) {
            $tempArray = array();
            while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
            }
            echo json_encode($myArray);
        }
        $result->close();
    }

    if($target == 'shop'){
        $myArray = array();
        if ($result = $db->query("SELECT * FROM comm_shop_like WHERE pid=".$id)) {
            $tempArray = array();
            while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
            }
            echo json_encode($myArray);
        }
        $result->close();
    }
}

if($action == 'set'){
    $userid = $_GET['userid'];
    if($target == 'product'){
        $like_number=1;
        $sql="INSERT INTO comm_prod_like (prod_id,userid) VALUES(".$id.",".$userid.")";
        $db->query($sql);
    }
    if($target == 'shop'){
        $like_number=1;
        $sql="INSERT INTO comm_shop_like (pid,userid) VALUES(".$id.",".$userid.")";
        $db->query($sql);
    }
    
}


$db->close();
?>