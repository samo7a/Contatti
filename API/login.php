<?php
    //STEVEN - NOT FINISHED!!!!!!!!!
    
    //FUNCTIONS

    //This returns an error in a JSON format
    function error($err){
        $result = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        toJSON($result);
    }

    //This takes the user to the landing page 
    //It will also send the user info to the landing page
    function returnUser($firstN, $lastN, $id){
        $ret = '{firstName: "'.$firstN.',lastName:"'.$lastN.',id:"'.$id.'",}';
        toJSON($ret);
    }

    //This return JSON files to JS
    function toJSON($obj){
        header('Content-type: application/json');
		echo $obj;
    }
        
    //RECEIVING
    $input = json_decode_(file_get_contents('php://input'),true);
        
    //CONNECTING to SQL server
    $dbServerName = "localhost";
    $dbUserName = "superUser";
    $dbPassWord = "superPassword";
    $dbName = "Contatti";

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);
    
    //Start Reading Sequence
        if ($conn->connect_error)
        {
            error( $conn->connect_error );
        }
        else{
            //Getting login and password from json
            $login = $input["login"];
            $password = $input["password"];
            //query to DB
            $query = "SELECT ID,firstName,lastName FROM Users where Login = '" . $login . "' and Password = '" . $password . "'";
            $result = mysqli_query($conn, $query);
            //Review SQL Result
            $numRows = mysqli_num_row($result);
            if($numRows>0){
                //User found
                $user = $result->fetch_assoc();
                $firstName = $user["firstName"];
                $lastName = $user["lastName"];
                $id = $user["ID"];

                returnUser($firstName,$lastName,$id);

            }
            else{
                error("User Not in Our Records");
            }
        }
?>