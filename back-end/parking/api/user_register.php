<?php
include_once('../config/connection.php');
include_once('../model/response.php');
include_once('../controllers/sendNotification.php');
try {
    $shop_id     = $_GET["shop_id"];
    $shop_email    = $_GET["shop_email"];
    $user_name    = $_GET["user_name"];
    $password      = $_GET["password"];
    $email = $_GET["email"];
    $device_uid  = $_GET["device_uid"];
    $device_token  = $_GET["device_token"];
    $item_reg = false;
    //user login info
    if ($user_name == "" || $password == "" || $password == "") {
        $data['response_code']        = constant::USER_LOGIN_EMPTY;
        $data['response_description'] = constant::USER_LOGIN_EMPTY_DES;
        $data['status']               = false;
        echo json_encode($data);
        return;
    }
    //shop info
    if ($shop_id == "" || $shop_email == "") {
        $data['response_code']        = constant::SHOP_EMPTY;
        $data['response_description'] = constant::SHOP_EMPTY_DES;
        $data['status']               = false;
        echo json_encode($data);
        return;
    }

    $sql  = "Select * from tb_shop Where shop_email='" . $shop_email . "' AND shop_id='" . $shop_id . "'";
    $item = mysqli_query($con, $sql);
    $fields =& $data['fields'];
    if (mysqli_num_rows($item) != 0) {
        $sql_reg = "Insert into tb_user (user_name, password, email, shop_id, shop_email, device_uid, user_state, device_token) " .
             "values('" . $user_name . "','" . $password . "','" . $email . "','" . $shop_id . "','" . $shop_email . "', '" . $device_uid . "', 0 ,'" . $device_token . "')";
        //check total device for shop was registered 
        $check = mysqli_fetch_array($item);
        if($check['total_device'] > 0){
            $sqlUser = "Select * from tb_user Where shop_email='" . $shop_email . "' AND shop_id='" . $shop_id . "'"; 
            $checkUser = mysqli_query($con, $sqlUser);
            $rowCount = mysqli_num_rows($checkUser);
            if($check['total_device'] > $rowCount){
                $sqlUserExist =  "Select * from tb_user Where email='" . $email . "'";
                $checExist = mysqli_query($con, $sqlUserExist);
                if (mysqli_num_rows($checExist ) != 0) {
                    $data['response_code']        = constant::EXIST_EMAIL;
                    $data['response_description'] = str_replace('{email}', $shop_email, constant::EXIST_EMAIL_DES);
                    $data['status']               = false;
                    echo json_encode($data);
                    return;
                }
                $item_reg = mysqli_query($con, $sql_reg);
            }
            if($item_reg == true){
                $data['response_code']        = constant::SUCCESS;
                $data['response_description'] = constant::REGISTER_SUCCESS;
                $data['status']               = true;
                sendGCM(constant::REGISTER_SUCCESS,"Registation success",$device_token);
            }else{
                $data['response_code']        = constant::SHOP_REGISTER_COUNT;
                $data['response_description'] = str_replace('{account}', $check['total_device'], constant::SHOP_REGISTER_COUNT_DES);
                $data['status']               = false;
                sendGCM(str_replace('{account}', $check['total_device'], constant::SHOP_REGISTER_COUNT_DES),"Registation unsuccess",$device_token);
            }
        }
    } else {
        $data['response_code']        = constant::ACCOUNT_NOT_REGISTER;
        $data['response_description'] = str_replace('email', $shop_email, constant::ACCOUNT_NOT_REGISTER_DES);
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