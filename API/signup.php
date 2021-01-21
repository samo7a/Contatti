<?php
	$inputFromJson = json_decode(file_get_contents('php://input'), true);

	$dbServerName = "localhost";
	$dbUserName = "superUser";
	$dbPassword = "superPassword";
	$dbName = "Contatti";

	$conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

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

		$sql = "INSERT INTO USERS (u_firstName, u_lastName, password, userName, u_phoneNumber, u_email) VALUES (?, ?, ?, ?, ?, ?);";
		$stmt = mysqli_stmt_init($conn);

		if(! mysqli_stmt_prepare($stmt, $sql)){
			returnError("<p>Signup Failed!</p><br>");
		}
		else {
			mysqli_stmt_bind_param($stmt, "ssssss",$firstName, $lastName, $password, $userName, $phoneNumber, $email);
			mysqli_stmt_execute($stmt);
            returnInfo("<p>Signed Up!</p><br>");
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
		}
	}
	
	
	function returnError($err){
		outputJson($err);
	}
	
	function returnInfo($info){
		outputJson($info);
	}
	
	function outputJson ($file){
		header("Content-type:application/json");
		echo $file;
	}
	
?>
