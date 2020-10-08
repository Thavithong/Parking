<?php
include_once('../config/connection.php');
include_once('../model/response.php');
try {
    $shop_id            = $_POST["shop_id"];
    $shop_email         = $_POST["shop_email"];
    $action_id          = $_POST["action_id"];

    $fields =& $data['fields'];
    switch($action_id ){
        case 0:
            //select
            $sql  = "Select * from tb_vehicle Where shop_id='".$shop_id."' AND shop_email='".$shop_email."'";
            $item  = mysqli_query($con, $sql);
            if (mysqli_num_rows($item) != 0) {
                $data['response_code']        = constant::SUCCESS;
                $data['response_description'] = constant::GET_DATA_SUCCESS_DES;
                $data['status']               = true; 
                while ($rs = mysqli_fetch_array($item)) {
                    $fields[]  = array(
                        "vehicle_id"        => $rs['vehicle_id'],
                        "vehicle_name"      => $rs['vehicle_name'],
                        "vehicle_price"     => $rs['vehicle_price'],
                        "shop_id"           => $rs['shop_id'],
                        "shop_email"        => $rs['shop_email']
                    );
                }
            }else{
                $data['response_code']        = constant::NO_DATA_FOUND;
                $data['response_description'] = constant::NO_DATA_FOUND_DES;
                $data['status']               = false; 
            }
        break;
        case 1:
            //save
            $vehicle_name       = $_POST["vehicle_name"];
            $vehicle_price      = $_POST["vehicle_price"];
            $sql_check  = "Select * from tb_vehicle Where shop_id='".$shop_id."' AND shop_email='".$shop_email."'";
            $count_check  = mysqli_query($con, $sql_check);
            $sql = "Insert into tb_vehicle (vehicle_name, vehicle_price, shop_id, shop_email) values('" . $vehicle_name . "','" . $vehicle_price . "','" . $shop_id . "','" . $shop_email . "')";
            $result  =false;
            if (mysqli_num_rows($count_check) != 0) {
                $rowCount = mysqli_num_rows($count_check);
                if($rowCount < 2){
                    $result  = mysqli_query($con, $sql);
                }else{
                    $result = false;
                }
            }else{
                $result  = mysqli_query($con, $sql);
            }
            if ($result == true) {
                $data['response_code']        = constant::SUCCESS;
                $data['response_description'] = constant::SAVE_DATA_SUCCESS;
                $data['status']               = true;             
            } else {
                $data['response_code']        = constant::SAVE_DATA_FAIl;
                $data['response_description'] = constant::SAVE_DATA_FAIl_DES;
                $data['status']               = false;
                $data['fields']               = array(null);
            }
        break;
        case 2:
            //edit
            $vehicle_id         = $_POST["vehicle_id"];
            $vehicle_name       = $_POST["vehicle_name"];
            $vehicle_price      = $_POST["vehicle_price"];
            $sql_up  = "Update tb_vehicle SET vehicle_name='".$vehicle_name ."', vehicle_price='".$vehicle_price."'  Where shop_id='".$shop_id."' AND shop_email='".$shop_email."' AND vehicle_id='".$vehicle_id."' ";
            if (mysqli_query($con, $sql_up)) {
                $data['response_code']        = constant::SUCCESS;
                $data['response_description'] = constant::SAVE_DATA_SUCCESS;
                $data['status']               = true; 
            }else{
                $data['response_code']        = constant::NO_DATA_FOUND;
                $data['response_description'] = constant::NO_DATA_FOUND_DES;
                $data['status']               = false; 
            }
        break;
        case 3:
            //delete
            $vehicle_id = $_POST["vehicle_id"];
            $sql  = "Delete from tb_vehicle Where shop_id='".$shop_id."' AND shop_email='".$shop_email."' AND vehicle_id='".$vehicle_id."'";
            $item  = mysqli_query($con, $sql);
            if ($item == true) {
                $data['response_code']        = constant::SUCCESS;
                $data['response_description'] = constant::DETELE_DATA_COMPLETE;
                $data['status']               = true; 
            }else{
                $data['response_code']        = constant::NO_DATA_FOUND;
                $data['response_description'] = constant::NO_DATA_FOUND_DES;
                $data['status']               = false; 
            }
        break;
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