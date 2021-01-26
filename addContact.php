<?php
	$inData = getRequestInfo();
	
	$firstName = mysqli_real_escape_string($conn, $inData["firstName"]);
	$lastName = mysqli_real_escape_string($conn, $inData["lastName"]);
	$phoneNumber = mysqli_real_escape_string($conn, $inData["phoneNumber"]);
	$email = mysqli_real_escape_string($conn, $inData["email"]);
	$address = mysqli_real_escape_string($conn, $inData["address"]);
	$city = mysqli_real_escape_string($conn, $inData["city"]);
	$state = mysqli_real_escape_string($conn, $inData["state"]);
	$zip = mysqli_real_escape_string($conn, $inData["zip"]);
	
	$conn = new mysqli("localhost", "superUser", "superPassword", "Contatti");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		$sql = "insert into Contacts(c_firstName, c_lastName, c_phoneNumber, c_email, address, city, state, zip) VALUES ('".$firstName."', '".$lastName."', '".$phoneNumber."', '".$email."', '".$address."', '".$city."', '".$state."', '".$zip."')";
		if($conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
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
?>
