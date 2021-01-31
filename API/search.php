<?php
	$inputFromJson = json_decode(file_get_contents('php://input'), true);

	$dbServerName = "localhost";
	$dbUserName = "superUser";
	$dbPassword = "superPassword";
	$dbName = "Contatti";

	$conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

    $searchResults = "{";
	$searchCount = 0;

    $searchItem = mysqli_real_escape_string($conn, $inputFromJson['searchItem']);
    $searchItem = "%".$searchItem."%";
    $u_id = $inputFromJson['u_id'];
    $sql = "SELECT * FROM Contacts WHERE u_id = ".$u_id." AND ( c_firstName LIKE '".$searchItem."' OR c_lastName LIKE '".$searchItem."' OR c_phoneNumber LIKE '".$searchItem."' OR c_email LIKE '".$searchItem."' OR address LIKE '".$searchItem."' OR city LIKE '".$searchItem."' OR state LIKE '".$searchItem."' OR zip LIKE '".$searchItem."');";
    
    if ($conn->connect_error) 
	{
		returnError( $conn->connect_error );
	} 
	else
	{
		$result = $conn->query($sql);
        if (!$result) {
            trigger_error('Invalid query: ' . $conn->error);
        }
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",{";
				}
				$searchCount++;
                $searchResults .= '"c_firstName":';
				$searchResults .= '"' . $row["c_firstName"] . '",';
                $searchResults .= '"c_lastName":';
                $searchResults .= '"' . $row["c_lastName"] . '",';
                $searchResults .= '"c_phoneNumber":';
                $searchResults .= '"' . $row["c_phoneNumber"] . '",';
                $searchResults .= '"c_email":';
                $searchResults .= '"' . $row["c_email"] . '",';
                $searchResults .= '"address":';
                $searchResults .= '"' . $row["address"] . '",';
                $searchResults .= '"city":';
                $searchResults .= '"' . $row["city"] . '",';
                $searchResults .= '"state":';
                $searchResults .= '"' . $row["state"] . '",';
                $searchResults .= '"zip":';
                $searchResults .= '"' . $row["zip"] . '"}';
                
			}
            returnInfo( $searchResults );
            
		}
		else
		{
			returnError( "No Contacts Found" );
		}
        $result -> free_result();
		$conn->close();
        
	}

    
    
	function returnError($error){
        $retval = '{"msg":"' .$error.'"}';
		outputJson($retval);
	}
	
	function returnInfo( $searchResults )
	{
		$retval = '['.$searchResults.']';
		outputJson( $retval );
	}
	
	function outputJson ($file){
		header("Content-type:application/json");
		echo $file;
	}