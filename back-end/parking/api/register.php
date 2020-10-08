<?php
header("Content-Type: application/json; charset=UTF-8");
    include_once('../config/connection.php');
    include_once('../model/response.php');
    //$error_code = new error_code();
    try{
        $shop_name  = $_GET["shop_name"];
        $shop_email = $_GET["shop_email"];
        $shop_phone = $_GET["shop_phone"];
        $latitude   = $_GET["latitude"];
        $long_latitude  = $_GET["long_latitude"];
        $shop_address   = $_GET["shop_address"];

        $sql = "Select * from tb_shop Where shop_email='".$shop_email."'";
        $item = mysqli_query($con, $sql); 
        $fields =& $data['fields'];
        if(mysqli_num_rows($item) != 0){
            $data['response_code'] = constant::EXIST_SHOP_EMAIL;
            $data['response_description'] = str_replace('{email}',$shop_email,constant::EXIST_SHOP_EMAIL_DES);
            $data['status'] = false;
        }else{
            $shop_id = time();
            $sql_shop_reg = "Insert into tb_shop (shop_id, shop_name, shop_email, shop_phone, shop_permission, latitude, long_latitude, shop_address, total_device) ". 
                            "values('".$shop_id."','".$shop_name."','".$shop_email."','".$shop_phone."', 0 ,'".$latitude."', '".$long_latitude."', '".$shop_address."', 1)";
            $result = mysqli_query($con, $sql_shop_reg);
            if($result == true){
                $sql_load = "Select * from tb_shop Where shop_email='".$shop_email."' AND shop_id='".$shop_id."'";
                $check = mysqli_query($con, $sql_load);
                if(mysqli_num_rows($check) != 0){
                    $result_load = mysqli_fetch_array($check);
                    
                    $data['response_code'] = constant::SUCCESS;
                    $data['response_description'] = constant::REGISTER_SUCCESS;
                    $data['status'] = true;
                    $data['fields'] = array(
                        "shop_id"           => $result_load['shop_id'],
                        "shop_name"         => $result_load['shop_name'],
                        "shop_email"        => $result_load['shop_email'],
                        "shop_phone"        => $result_load['shop_phone'],
                        "shop_permission"   => $result_load['shop_permission'],
                        "latitude"          => $result_load['latitude'],
                        "long_latitude"     => $result_load['long_latitude'],
                        "shop_address"      => $result_load['shop_address'],
                        "total_device"      => $result_load['total_device']
                    );
                } 
            }else{
                $data['response_code'] = constant::REGISTER_FAIL;
                $data['response_description'] = constant::REGISTER_FAIL_DES;
                $data['status'] = false;
                $data['fields'] = array(null); 
            }
        }
    }catch(Exception $ex){
        $data['response_code'] =  constant::FAIL;
        $data['response_description'] = $ex;
        $data['status'] = false;
        $data['fields'] = array(null); 
    }
echo json_encode($data);
mysqli_close($con); 
?>