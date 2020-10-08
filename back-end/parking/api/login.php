<?php
include_once('../config/connection.php');
include_once('../model/response.php');
include_once('../controllers/insertLog.php');
try {
    $shop_id     = $_GET["shop_id"];
    $shop_email    = $_GET["shop_email"];
    $password      = $_GET["password"];
    $email = $_GET["email"];
    $device_uid  = $_GET["device_uid"];

    $sql  = "SELECT s.*, u.* FROM tb_shop s JOIN tb_user u ON s.shop_id = u.shop_id AND u.shop_email = s.shop_email ".
            " Where u.shop_email='" . $shop_email . "' AND s.shop_id='" . $shop_id . "' AND u.email='".$email."' AND u.password='".$password."' ";
    $item = mysqli_query($con, $sql);
    $fields =& $data['fields'];
    if (mysqli_num_rows($item) != 0) {
        $result = mysqli_fetch_array($item);
        switch ($result['shop_permission']) {
            case 0:
                //not have permission
                $data['response_code']        = constant::SHOP_NOT_HAVE_PERMISSION;
                $data['response_description'] = constant::SHOP_NOT_HAVE_PERMISSION_DES;
                $data['status']               = false;
                break;
            case 1:
                //active
                if($device_uid != $result['device_uid']){
                    //login differant mobile
                    $data['response_code']        = constant::ACCOUNT_LOGIN_DIFFERENT;
                    $data['response_description'] = constant::ACCOUNT_LOGIN_DIFFERENT_DES;
                    $data['status']               = false;
                    insertLog($con, "Login different device" ,constant::ACCOUNT_LOGIN_DIFFERENT_DES, "Login", $shop_id, $shop_email , $email);
                    echo json_encode($data);
                    return;
                }else{
                    $data['response_code']        = constant::SUCCESS;
                    $data['response_description'] = constant::LOGIN_SUCCESS;
                    $data['status']               = true;
                    while ($rs = mysqli_fetch_array($item)) {
                        $fields[] = array(
                            "shop_id"       => $rs['shop_id'],
                            "shop_name"     => $rs['shop_name'],
                            "shop_email"    => $rs['shop_email'],
                            "shop_phone"    => $rs['shop_phone'],
                            "shop_permission" => $rs['shop_permission'],
                            "latitude"      => $rs['latitude'],
                            "long_latitude" => $rs['long_latitude'],
                            "shop_address"  => $rs['shop_address'],
                            "total_device"  => $rs['total_device'],
                            "device_uid"    => $rs['device_uid'],
                            "email"         => $rs['email'],
                            "user_state"    => $rs['user_state'],
                            "user_name"     => $rs['user_name'],
                            "device_token"  => $rs['device_token'],
                        );
                    }
                }
                break;
            case -1:
                $data['response_code']        = constant::ACCOUNT_CANCLE;
                $data['response_description'] = constant::ACCOUNT_CANCLE_DES;
                $data['status']               = false;
                break;
            case 2:
                $data['response_code']        = constant::ACCOUNT_BLOCK;
                $data['response_description'] = constant::ACCOUNT_BLOCK_DES;
                $data['status']               = false;
                break;
        }
    } else {
        $data['response_code']        = constant::ACCOUNT_NOT_REGISTER;
        $data['response_description'] = str_replace('{email}', $shop_email, constant::ACCOUNT_NOT_REGISTER_DES);
        $data['status']               = false;
        $sms = str_replace('{email}', $shop_email, constant::ACCOUNT_NOT_REGISTER_DES);
        insertLog($con, "Not yet register but want to use our service" , $sms, "Login", $shop_id, $shop_email , $email);
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