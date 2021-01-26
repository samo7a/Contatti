<?php
    //STEVEN 
    
 
   //RECEIVING
    $input = getInput();
        
    //CONNECTING to SQL server
    $dbServerName = "localhost";
    $dbUserName = "superUser";
    $dbPassword = "superPassword";
    $dbName = "Contatti";

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);
    
    //Start Reading Sequence
        if ($conn->connect_error)
        {
            error( $conn->connect_error);
        }
        else{
            //Getting login and password from json
            $login = $input["login"];
            $password = $input["password"];
            //query to DB
            $query = "SELECT u_id, u_firstName, u_lastName FROM Users WHERE userName = '".$login."' and password = '".$password."';";
            $result = mysqli_query($conn, $query);
            $numRows = mysqli_num_rows($result);
            //Review SQL Result
            if($numRows>0){
                //User found
                $user = $result->fetch_assoc();
                $firstName = $user["u_firstName"];
                $lastName = $user["u_lastName"];
                $id = $user["u_id"];

                returnUser($firstName,$lastName,$id);

            }
            //User not found
            else{
                error("User Not in Our Records");
            }
            $conn->close();
        }

    //FUNCTIONS

    //This returns an error in a JSON format
    function getInput(){
        return json_decode(file_get_contents('php://input'), true);
    }

    function error($err){
        $result = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        toJSON($result);
    }

    //This takes the user to the landing page 
    //It will also send the user info to the landing page
    function returnUser($firstName, $lastName, $id){
        $ret = '{"firstName": "'.$firstName.'","lastName":"'.$lastName.'","id":"'.$id.'"}';
        toJSON($ret);
    }

    //This return JSON files to JS
    function toJSON($json){
        header('Content-type: application/json');
		echo $json;
    }
        
?>
