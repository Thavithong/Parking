<?php
include_once('../config/connection.php');
include_once('../model/response.php');
try {
    $_language            = $_GET["language"];
    $fields =& $data['fields'];
    $sql  = "Select * from tb_version Where language='".$_language."' ";
            $item  = mysqli_query($con, $sql);
            if (mysqli_num_rows($item) != 0) {
                $data['response_code']        = constant::SUCCESS;
                $data['response_description'] = constant::SUCCESS;
                $data['status']               = true; 
                while ($rs = mysqli_fetch_array($item)) {
                    $fields[]  = array(
                        "version_title"         => $rs['version_title'],
                        "version_description"   => $rs['version_description'],
                        "version_android"       => $rs['version_android'],
                        "version_ios"           => $rs['version_ios'],
                        "update_time_android"   => $rs['update_time_android'],
                        "update_time_ios"       => $rs['update_time_ios'],
                        "language"              => $rs['language']
                    );
                }
            }else{
                $data['response_code']        = constant::NO_DATA_FOUND;
                $data['response_description'] = constant::NO_DATA_FOUND_DES;
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