var url = 'http://thecontatti.com/API/edit.php';

var u_id = 0;
var c_id = 0;


function editContact() {
    
    readCookie();

    var cID = document.getElementById("cID").value;
    var uID = document.getElementById("uID").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;

    var json = '{"cID" : "' + cID + '", "uID" : "' + uID + '", "firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "password" : "' + hashedPassword + '", 
    "userName" : "' + userName + '", "phoneNumber" : "' + phoneNumber + '",
        "email" : "' + email + '", "address" : "' + address + '", "city" : "' + city + '", "state" : "' + state + '", "zip" : "' + zip +'"}';

    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObject = JSON.parse(request.responseText);
                c_id = jsonObject.c_id;
                var endpointmsg = jsonObject.error;
            if (c_id < 1) {
                document.getElementById("loginResult").innerHTML = endpointmsg;
                document.getElementById("loginResult").style.color = "red";
                return;
            }*/

        }
    };
    request.responseType = "text";
    request.send(jsonPayload);
}

    catch (err) {
        document.getElementById("error").innerHTML = err.message;
        document.getElementById("error").innerHTML = err.message;
    }

}
