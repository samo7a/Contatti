<?php
    //STEVEN 
    
    //FUNCTIONS

    //This returns an error in a JSON format
    function error($err){
        $result = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        toJSON($result);
    }

    //This takes the user to the landing page 
    //It will also send the user info to the landing page
    function returnUser($firstName, $lastName, $id){
        $ret = '{firstName: "'.$firstName.',lastName:"'.$lastName.',id:"'.$id.'",}';
        toJSON($ret);
    }

    //This return JSON files to JS
    function toJSON($json){
        header('Content-type: application/json');
		echo $json;
    }
        
    //RECEIVING
    $input = json_decode(file_get_contents('php://input'),true);
        
    //CONNECTING to SQL server
    $dbServerName = "localhost";
    $dbUserName = "superUser";
    $dbPassword = "superPassword";
    $dbName = "Contatti";

    $conn = mysqli_connect("localhost", "superUser", "superPassword", "Contatti");
    
    //Start Reading Sequence
        if ($conn->connect_error())
        {
            error( $conn->connect_error());
        }
        else{
            //Getting login and password from json
            $login = $input["login"];
            $password = $input["password"];
            //query to DB
    //$query = "SELECT u_id,u_firstName,u_lastName FROM Users where userName = '" . $login . "' and password = '" . $password . "';";
            $query = "SELECT u_id, u_firstName, u_lastName FROM Users WHERE userName = '".$login."' and password = '".$password."';";
            $result = mysqli_query($conn, $query);
            //Review SQL Result
            $numRows = mysqli_num_rows($result);
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