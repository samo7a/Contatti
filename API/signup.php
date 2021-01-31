<?php
	$inputFromJson = json_decode(file_get_contents('php://input'), true);

	$dbServerName = "localhost";
	$dbUserName = "superUser";
	$dbPassword = "superPassword";
	$dbName = "Contatti";

	$conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

    $firstName = mysqli_real_escape_string($conn, $inputFromJson['firstName']);
    $lastName = mysqli_real_escape_string($conn, $inputFromJson['lastName']);	
    $password = mysqli_real_escape_string($conn, $inputFromJson['password']);
    $userName = mysqli_real_escape_string($conn, $inputFromJson['userName']);
    $phoneNumber = mysqli_real_escape_string($conn, $inputFromJson['phoneNumber']);
    $email = mysqli_real_escape_string($conn, $inputFromJson['email']);
    $sql;

    if(!empty($email) && !empty($phoneNumber)) {
        $sql = "INSERT INTO Users (u_firstName, u_lastName, password, userName, u_phoneNumber, u_email) VALUES ('".$firstName."','".$lastName."','".$password."','".$userName."','".$phoneNumber."','".$email."');";
    }
    else if (empty($email) && empty($phoneNumber))
        $sql = "INSERT INTO Users (u_firstName, u_lastName, password, userName) VALUES ('".$firstName."','".$lastName."','".$password."','".$userName."');";
    else if (empty($phoneNumber) && !empty($email)) 
        $sql = "INSERT INTO Users (u_firstName, u_lastName, password, userName, u_email) VALUES ('".$firstName."','".$lastName."','".$password."','".$userName."','".$email."');";
    else 
        $sql = "INSERT INTO Users (u_firstName, u_lastName, password, userName, u_phoneNumber) VALUES ('".$firstName."','".$lastName."','".$password."','".$userName."','".$phoneNumber."');";
    
	if($conn->connect_error){
		returnError($conn->connect_error);
	}
	else {
        if($conn->query($sql) != TRUE )
		{
			returnError( $conn->error );
		}
		else
		{
			returnInfo("done");
		}
		$conn->close();
        
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
	
