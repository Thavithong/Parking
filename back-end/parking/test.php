<?php
    error_reporting(0);
    include_once('./connection.php');
    try{
        $sql = "Select * from tb_shop1";
        $item = mysqli_query($con, $sql);
        $data = array(
            'response_code' => "",
            'response_description' => "",
            'status' => false,
            'fields' => array()
        );   
        $fields =& $data['fields'];
        if(mysqli_num_rows($item) != 0){
            $data['response_code'] = "000000";
            $data['response_description'] = "Login succes";
            $data['status'] = true;
            while($result = mysqli_fetch_array($item)){
                $fields[] = array(
                    "shop_id"           => $result['shop_id'],
                    "shop_name"          => $result['shop_name'],
                    "shop_email"           => $result['shop_email']
                ); 
            }
        }else{
            $data['response_code'] = "990000";
            $data['response_description'] = "Login fail";
            $data['status'] = false;
            $data['fields'] = array(null); 
        }
    }catch(Exception $ex){
        $data['response_code'] = "999999";
        $data['response_description'] = $ex;
        $data['status'] = false;
        $data['fields'] = array(null); 
    }
echo json_encode($data);
mysqli_close($con); 
?>