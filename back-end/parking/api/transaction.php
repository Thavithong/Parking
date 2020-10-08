<?php
include_once('../config/connection.php');
include_once('../model/response.php');
try {
    $amount         = $_POST["amount"];
    $vehicle_id     = $_POST["vehicle_id"];
    $vehicle_name   = $_POST["vehicle_name"];
    $vehicle_number = $_POST["vehicle_number"];
    $user_id        = $_POST["user_id"];
    $status         = $_POST["status"];
    $shop_id        = $_POST["shop_id"];
    $shop_email     = $_POST["shop_email"];
    $trans_time     = $_POST["trans_time"];
    $trans_date     = $_POST["trans_date"];
    $transId="";

    $sqlTranId = "Select Max(trans_id) as trans_id from tb_transaction where shop_id='".$shop_id."' AND shop_email='".$shop_email."' ";
    $itemTranId = mysqli_query($con, $sqlTranId);
    if (mysqli_num_rows($itemTranId) != 0) {
        $result = mysqli_fetch_array($itemTranId);
        $transId =  $result['trans_id'] + 1;
    }else{
        $transId = 1;
    }

    $sql = "Insert into tb_transaction (trans_id, trans_date, amount, vehicle_id, vehicle_name, vehicle_number, user_id, status, trans_time, shop_id, shop_email) " 
        . " values('" . $transId . "','" . $trans_date . "','" . $amount . "','" . $vehicle_id . "', '". $vehicle_name ."' ,'" . $vehicle_number . "', '" . $user_id . "', '".$status."', '" . $trans_time . "', '".$shop_id."', '".$shop_email."')";
    $item = mysqli_query($con, $sql);
    if ($item == true) {
        $data['response_code']        = constant::SUCCESS;
        $data['response_description'] = constant::SAVE_DATA_SUCCESS;
        $data['status']               = true;
    }else{
        $data['response_code']        = constant::SAVE_DATA_FAIL;
        $data['response_description'] = constant::SAVE_DATA_FAIL_DES;
        $data['status']               = false;
    }
}
catch (Exception $ex) {
    $data['response_code']        = constant::FAIL;
    $data['response_description'] = $ex;
    $data['status']               = false;
    $data['fields']               = array(
        null
    );
}
echo json_encode($data);
mysqli_close($con);
?>