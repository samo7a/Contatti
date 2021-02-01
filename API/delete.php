<?php//
	$inData = getRequestInfo();
	
	$conn = new mysqli("localhost", "superUser", "superPassword", "Contatti");
    
    $c_id = $inData["c_id"];
	$u_id = $inData["u_id"];

	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else
	{	
		
		$sql = "DELETE FROM Contacts WHERE c_id = ? and u_id = ? LIMIT 1";
		if($conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		else
		{
			returnWithInfo("Successfully deleted");
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