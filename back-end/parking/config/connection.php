<?php
	include_once('../types/constant.php');
	//$con = mysqli_connect('localhost', 'root', '123', 'parking') or die(mysqli_connect_errno());
	$con = mysqli_connect(DB_HOST,DB_ROOT,DB_PASS, DB_NAME) or die(mysqli_connect_errno());
	mysqli_query($con, 'set names utf8');
?>