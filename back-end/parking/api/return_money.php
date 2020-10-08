<?php
include_once('../config/connection.php');
include_once('../model/response.php');
try {
    $vehicle_id     = $_POST["vehicle_id"];
    $vehicle_name   = $_POST["vehicle_name"];
    $vehicle_number = $_POST["vehicle_number"];
    $user_id        = $_POST["user_id"];
    $amount         = $_POST["amount"];
    $shop_id        = $_POST["shop_id"];
    $shop_email     = $_POST["shop_email"];
    $trans_date     = $_POST["trans_date"];
    $trans_time     = $_POST["trans_time"];
    $return_id="";

    $sqlTranId = "Select Max(return_id) as return_id from tb_returnmoney where shop_id='".$shop_id."' AND shop_email='".$shop_email."' ";
    $itemTranId = mysqli_query($con, $sqlTranId);
    if (mysqli_num_rows($itemTranId) != 0) {
        $result = mysqli_fetch_array($itemTranId);
        $return_id =  $result['return_id'] + 1;
    }else{
        $return_id = 1;
    }

    $sql = "Insert into tb_returnmoney (return_id, vehicle_id, vehicle_number, user_id, amount, trans_date, shop_id, shop_email) " 
        . " values('" . $return_id . "','" . $vehicle_id . "','" . $vehicle_number . "','" . $user_id . "', '". $amount ."' ,'" . $trans_date . "', '".$shop_id."', '".$shop_email."')";
    $item = mysqli_query($con, $sql);
    if ($item == true) {
        $sqlup = "Update tb_transaction set status=-1 Where shop_id='".$shop_id."' AND shop_email='".$shop_email."' AND vehicle_number='". $vehicle_number ."' AND user_id ='".$user_id."' AND trans_date ='".$trans_date ."' AND trans_time='".$trans_time."' ";
        $resultup = mysqli_query($con, $sqlup);
        if($resultup == true){
            $data['response_code']        = constant::SUCCESS;
            $data['response_description'] = constant::SAVE_DATA_SUCCESS;
            $data['status']               = true;
        }else{
            $data['response_code']        = constant::SAVE_DATA_FAIL;
            $data['response_description'] = constant::SAVE_DATA_FAIL_DES;
            $data['status']               = false;
        }
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