<?php
	$inData = getRequestInfo();
	
	$conn = new mysqli("localhost", "superUser", "superPassword", "Contatti");
	
	$u_id = $inData["u_id"];
	$firstName = mysqli_real_escape_string($conn, $inData["c_firstName"]);
	$lastName = mysqli_real_escape_string($conn, $inData["c_lastName"]);
	$phoneNumber = mysqli_real_escape_string($conn, $inData["c_phoneNumber"]);
	$email = mysqli_real_escape_string($conn, $inData["c_email"]);
	$address = mysqli_real_escape_string($conn, $inData["address"]);
	$city = mysqli_real_escape_string($conn, $inData["city"]);
	$state = mysqli_real_escape_string($conn, $inData["state"]);
	$zip = mysqli_real_escape_string($conn, $inData["zip"]);
	
	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else
	{	
		$sql = "INSERT INTO Contacts(u_id, c_firstName, c_lastName, c_phoneNumber, c_email, address, city, state, zip) VALUES (".$u_id.", '".$firstName."', '".$lastName."', '".$phoneNumber."', '".$email."', '".$address."', '".$city."', '".$state."', '".$zip."')";
		
		if($conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		else
		{
			returnWithInfo("Successfully added");
		}
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
	
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $info )
	{
		$retValue = '{"msg":"' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>