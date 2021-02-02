var url = 'http://thecontatti.com/API/edit.php';

var u_id = 0;
var c_id = 0;


function editContact() {
    
    readCookie();

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

    var json = '{"c_id" : "' + cID + '", "u_id" : "' + uID + '", "c_firstName" : "' + editFirst + '", "c_lastName" : "' + editLast + '", "c_phoneNumber" : "' + editPhone + '",
        "c_email" : "' + editEmail + '", "address" : "' + editAddress + '", "city" : "' + editCity + '", "state" : "' + editState + '", "zip" : "' + editZip +'"}';

    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObject = JSON.parse(request.responseText);
                document.getElementById("editResult").innerHTML = "Changes Saved"
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
