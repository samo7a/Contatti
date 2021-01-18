<?php
	$inputFromJson = json_decode(file_get_contents('php://input'), true);

	$dbServerName = "localhost";
	$dbUserName = "superUser";
	$dbPassword = "superPassword";
	$dbName = "Contatti";

	$conn = mysqli_connect($dbServerName, $dbUserName, $dbpassword, $dbName);

	if($conn->connect_error){
		returnError($conn->connect_error);
	}
	else {
		$firstName = mysqli_real_escape_string($conn, $inputFromJson['firstName']);
		$lastName = mysqli_real_escape_string($conn, $inputFromJson['lastName']);	
		$password = mysqli_real_escape_string($conn, $inputFromJson['password']);
		$userName = mysqli_real_escape_string($conn, $inputFromJson['userName']);
		$phoneNumber = mysqli_real_escape_string($conn, $inputFromJson['phoneNumber']);
		$email = mysqli_real_escape_string($conn, $inputFromJson['email']);

		$sql = "INSERT INTO USERS (u_firstName, u_lastName, password, userName, u_phonerNumber, u_email) VALUES (?, ?, ?, ?, ?, ?);"
		$stmt = mysqli_stmt_init($conn);

		if(! mysqli_stmt_prepare($stmt, $sql)){
			returnError("Connection Failed, please try again.");
		}
		else {
			mysqli_stmt_bind_param($stmt, "ssssss",$firstName, $lastName, $password, $userName, $phoneNumber, $email);
			mysqli_stmt_execute($stmt);
		}
	}
	
	
	function returnError($err){
		$retval = ""; 
		outputJson($retval);
	}
	
	function returnInfo($info){
		$retval = "";
		outputJson($retval);
	}
	
	function outputJson ($file){
		header("Content-type:application/json");
		echo $file;
	}
	
?>
