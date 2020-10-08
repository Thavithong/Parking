<?php
    function insertLog($con, $error_code, $error_message, $action_name, $shop_id, $shop_email, $user_id){
        $time = date("H:i:s A");
        $date = date("Y-m-d");
        $sql = "Insert into history_log (id,create_date, create_time, error_code, error_message, action_name, shop_id, shop_email, user_id) " 
        . " values(null,'" . $date . "','" . $time . "','".$error_code ."' ,'".$error_message ."' ,'".$action_name ."','".$shop_id ."','".$shop_email ."','".$user_id ."' )";
        $item = mysqli_query($con, $sql);
        return true;
    }
?>