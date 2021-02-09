var url = 'http://thecontatti.com/API/edit.php';


function editContact(c_id) {
    
    readCookie();

    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    //console.log(`This is ${editFirst} times easier!`);

    console.log(`This is 1 times easier!`);
   /* 
    var cID = document.getElementById("c_id").value;
    var uID = document.getElementById("u_id").value;
    var editFirst = document.getElementById("c_firstName").value;
    var editLast = document.getElementById("c_lastName").value;
    var editPhone = document.getElementById("c_phoneNumber").value;
    var editEmail = document.getElementById("c_email").value;
    var editAddress = document.getElementById("address").value;
    var editCity = document.getElementById("city").value;
    var editState = document.getElementById("state").value;
    var editZip = document.getElementById("zip").value;
*/
   
    //console.log(`This is ${editFirst} times easier!`);
 
    let jsonPayload = JSON.stringify({
        c_id: c_id,
        u_id: u_id,
    });

    console.log(`This is 2 times easier!`);
    console.log(`Printing: ${jsonPayload} !`);
    //var json = '{"c_id" : "' + cID + '", "u_id" : "' + uID + '", "c_firstName" : "' + editFirst + '", "c_lastName" : "' + editLast +'", "c_phoneNumber" : "' + editPhone + 
    //    '", "c_email" :"' + editEmail + '", "address" : "' + editAddress + '", "city" : "' + editCity + '", "state" : "' + editState + '", "zip" : "' + editZip + '"}';    

    try 
    {
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
            {                
                var jsonObject = JSON.parse(request.responseText);
                document.getElementById("edit").value = editFirst;
                console.log(`This is ${editFirst} times easier!`);
            }
            console.log(`This is x times easier!`);
    };
    request.responseType = "text";
    request.send(jsonPayload);
}

    catch (err) {
        document.getElementById("error").innerHTML = err.message;
        document.getElementById("error").innerHTML = err.message;
    }

}
