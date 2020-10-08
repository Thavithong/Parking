<?php
    define( 'API_ACCESS_KEY', 'AAAAkX95oEs:APA91bFQd_8NroIpffaVNzWVsCntaSc0btufUVQrkfYbw01CAwCeTcguEDzzb_DK5XsKdUQj6aCcdwT49Uflwchcey5rfBcZDNdSePiKZz8zHbS2yxxTnofSQeWdhYW0kCNBE-dQzy3v');
    
    function sendGCM($content, $title ,$id) {
        $url = 'https://fcm.googleapis.com/fcm/send';
        $msg = array
        (
            'message' 	=> $content,
            'title'		=> $title,
            'vibrate'	=> 1,
            'sound'		=> 1,
            'largeIcon'	=> 'large_icon',
            'smallIcon'	=> 'small_icon'
        );

        $registrationIds = array($id);
        $fields = array
        (
            'registration_ids' 	=> $registrationIds,
            'data'			=> $msg
        );
        
        $headers = array
        (
            'Authorization: key=' . API_ACCESS_KEY,
            'Content-Type: application/json'
        );
        
        $ch = curl_init();
        curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
        curl_setopt( $ch,CURLOPT_POST, true );
        curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
        curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
        curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
        $result = curl_exec($ch );
        curl_close( $ch );
    }
?>