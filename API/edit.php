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

        echo "in here ",$cID," ",$lastName," ",$zip;

   //   $query = "UPDATE Contacts SET c_firstName='".$firstName."',c_lastName='".$lastName."',c_phoneNumber=".$phoneNum.", c_email='".$email."',address='".$address."', city='".$city."', state='".$state."',zip=".$zip." WHERE c_id = '".$cID."';";
        $query = "UPDATE Contacts SET c_firstName='".$firstName."',c_lastName='".$lastName."',c_phoneNumber=".$phoneNum.", c_email='".$email."',address='".$address."', city='".$city."', state='".$state."' WHERE c_id = '".$cID."';";

       $submit = mysqli_query($conn, $query);   
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


  
?>
  