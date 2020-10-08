<?php
include_once('../config/header_require.php');
include_once('../config/connection.php');
include_once('../model/response.php');
include_once('../controllers/insertLog.php');
try {

    $request_method=$_SERVER["REQUEST_METHOD"];
	switch($request_method)
	{
        case 'POST':
			$request = json_decode(file_get_contents("php://input"));
            $arr = $request->records;
            $i=0; $j=0;
            $item = false;
			foreach($arr as $row){
                $sqlExist = "Select * from tb_transaction where shop_id='".$row->shop_id."' AND shop_email='".$row->shop_email."' AND  trans_id='".$row->trans_id."' ";
                $itemExist = mysqli_query($con, $sqlExist);
                if (mysqli_num_rows($itemExist) == 0) {
                    $sql = "Insert into tb_transaction (trans_id, trans_date, amount, vehicle_id, vehicle_name, vehicle_number, user_id, status, trans_time, shop_id, shop_email) " 
                    . " values('" . $row->trans_id . "','" . $row->trans_date . "','" . $row->amount . "','" . $row->vehicle_id . "', '". $row->vehicle_name ."' ,'" . $row->vehicle_number . "', '" . $row->user_id . "', '".$row->status."', '" . $row->trans_time . "', '".$row->shop_id."', '".$row->shop_email."')";
                    $item = mysqli_query($con, $sql);
                    $i++;
                }else{
                    $j++;
                    $sms = "This is transaction ". $row->trans_id ." was already save. vehicle number : ". $row->vehicle_id. ", amount : ". $row->vehicle_id;
                    insertLog($con, "Try save many times", $sms, "Transaction Report", $row->shop_id, $row->shop_email, $row->user_id);
                }
                if ($item == true) {
                    $data['response_code']        = constant::SUCCESS;
                    $data['response_description'] = constant::SAVE_DATA_SUCCESS;
                    $data['status']               = true;
                    $data['totalSuccess']         = $i;
                    $data['totalFalse']           = $j;
                    $data['total']                = $j+$i;
                }else{
                    $data['response_code']        = 10122;
                    $data['response_description'] = "Cann not save data.";
                    $data['status']               = false;
                    $data['totalSuccess']         = $i;
                    $data['totalFalse']           = $j;
                    $data['total']                = $j+$i;
                }
            }
            echo json_encode($data);
			exit();
			break;
		default:
			// Invalid Request Method
            header("HTTP/1.0 405 Method Not Allowed");
            $data['response_code']        =  "100293";
            $data['response_description'] = "Invalid format";
            $data['status']               = false;
            $data['fields']               = array(
                null
            );
            header('Content-Type: application/json');
            insertLog($con, "Invalid format", "Send data invalid method", "Transaction Report", null, null, null);
            echo json_encode($response);
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
    insertLog($con, "Exception", $ex, "Transaction Report", null, null, null);
    echo json_encode($data);
}
echo json_encode($data);
mysqli_close($con);
?>