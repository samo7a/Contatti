<?php
    //STEVEN 
//Receiving Info
$input = getInput();

//CONNECTING to SQL server
$dbServerName = "localhost";
$dbUserName = "superUser";
$dbPassword = "superPassword";
$dbName = "Contatti";

$conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);

//SQL query to insert
   //Start Reading Sequence
   if ($conn->connect_error)
   {
       error( $conn->connect_error);
   }
   else{
       //Getting all info
       $cID = $input["c_id"];
       $uID = $input["u_id"];
       $firstName = $input["c_firstName"];
       $lastName = $input["c_lastName"];
       $phoneNum = $input["c_phoneNumber"];
       $email = $input["c_email"];
       $address = $input["address"];
       $city = $input["city"];
       $state = $input["state"];
       $zip = $input["zip"];

       $query = "UPDATE Contacts SET c_firstName='".$firstName."',c_lastname='".$lastName."',city='".$city."',state='".$state."',zip='".$zip."' WHERE c_id ='".$cID."' and u_id ='".$uID."';";
       
       $submit = mysqli_query($conn, $query);
  
       //Query new contact information
       $contactQuery = "SELECT u_id, c_firstName, c_lastName, c_phoneNumber, c_email, address, city, state, zip FROM Contacts WHERE c_id='".$cID."'; ";
       $getContact = mysqli_query($conn, $contactQuery);
       $numRows = mysqli_num_rows($getContact);
       //Finding Contact
       if($numRows>0){
        $contact = $getContact->fetch_assoc();
        //all the info to JSON
        $c_id = $cID;
        $u_id = $contact["u_id"];
        $c_firstName = $contact["c_firstName"];
        $c_lastName = $contact["c_lastName"];
        $c_phoneNum = $contact["c_phoneNumber"];
        $c_email = $contact["c_email"];
        $c_address = $contact["address"];
        $c_city = $contact["city"];
        $c_state = $contact["state"];
        $c_zip = $contact["zip"];
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

    function returnUser($cID, $uID, $firstName, $lastName, $phoneNum, $email, $address, $city, $state, $zip){
        $ret = '{"c_id":"'.$cID.'","u_id":'.$uID.'","c_firstName":"'.$firstName.'","c_lastName":"'.$lastName.'","c_phoneNumber":"'.$phoneNum.'","c_email":"'.$email.'","address":"'.$address.'","city":"'.$city.'","state":"'.$state.'","zip":"'.$zip.'"}';
        toJSON($ret);
    }

    //This return JSON files to JS
    function toJSON($json){
        header('Content-type: application/json');
		echo $json;
    }
  
?>
  