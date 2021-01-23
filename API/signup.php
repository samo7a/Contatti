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
		$sql = "INSERT INTO Users (u_firstName, u_lastName, password, userName, u_phoneNumber, u_email) VALUES (?, ?, ?, ?, ?, ?);";
		$stmt = mysqli_stmt_init($conn);

		if(! mysqli_stmt_prepare($stmt, $sql)){
			returnError($stmt->error); ;
		}
		else {
			mysqli_stmt_bind_param($stmt, "ssssss", $firstName, $lastName, $password, $userName, $phoneNumber, $email);
            if(mysqli_stmt_execute($stmt)){
                returnInfo("done");
            }
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
		}
	}
    
	function returnError($error){
        $retval = '{"msg":"' .$error.'"}';
		outputJson($retval);
	}
	
	function returnInfo($info){
        $retval = '{"msg":"' .$info.'"}';
		outputJson($retval);
	}
	
	function outputJson ($file){
		header("Content-type:application/json");
		echo $file;
	}
	
