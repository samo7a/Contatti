let searchUrl = 'http://thecontatti.com/API/search.php';

var EditButton = `<th class="align-left">
                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#editContact">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                    </button></th>`;

window.onload = function () {
    'use strict';
    readCookie();
    var table = document.getElementById("searchResults");
    table.innerHTML = "";
    document.getElementById("error").innerHTML = "";

    var jsonPayload = '{"u_id":' + u_id + ', "searchItem":""}';
    var request = new XMLHttpRequest();
    request.open("POST", searchUrl, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonArray = JSON.parse(request.responseText);
                //console.log(jsonArray);
                for (var i = 0; i < jsonArray.length; i++) {
                    var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}
                    </td><td>${EditButton}</td><td><th class="align-left">
                      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                      </button></th></td></tr>`;
                    table.innerHTML += row;
                }
                if (jsonArray.msg === "No Contacts Found")
                    document.getElementById("error").innerHTML = jsonArray.msg;

            }
        };
        request.responseType = "text";
        request.send(jsonPayload);


    }
    catch (error) {
        document.getElementById("error").innerHTML = error.message;
        document.getElementById("error").style.color = "red";
    }
}

function search() {
    'use strict';
    document.getElementById("error").innerHTML = "";
    var table = document.getElementById("searchResults");
    table.innerHTML = "";
    var searchItem = document.getElementById("searchItem").value;
    var jsonPayload = '{"u_id":' + u_id + ', "searchItem":"' + searchItem + '"}';
    var request = new XMLHttpRequest();
    request.open("POST", searchUrl, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonArray = JSON.parse(request.responseText);
                //console.log(jsonArray);
                for (var i = 0; i < jsonArray.length; i++) {
                    var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}
                    </td><td>${EditButton}</td><td><th class="align-left">
                      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                      </button></th></td></tr>`;
                    table.innerHTML += row;
                }
                if (jsonArray.msg === "No Contacts Found")
                    document.getElementById("error").innerHTML = jsonArray.msg;


            }
        };
        request.responseType = "text";
        request.send(jsonPayload);


    }
    catch (error) {
        document.getElementById("error").innerHTML = error.message;
        document.getElementById("error").style.color = "red";
    }
}




function newContact()
{
    let url = 'http://thecontatti.com/API/addContact.php';

    readCookie();
    var newFirst = document.getElementById("newFirst").value;
    var newLast = document.getElementById("newLast").value;
    var newPhone = document.getElementById("newPhone").value;
    var newEmail = document.getElementById("newEmail").value;
    var newStreet = document.getElementById("newStreet").value;
    var newCity = document.getElementById("newCity").value;
    var newState = document.getElementById("newState").value;
    var newZip = document.getElementById("newZip").value;

    if (validateNewInput(newFirst, newLast, newPhone, newEmail, newZip))
    {
        let jsonPayload = JSON.stringify({
            u_id: u_id,
            c_firstName: newFirst,
            c_lastName: newLast,
            c_phoneNumber: newPhone,
            c_email: newEmail,
            address: newStreet,
            city: newCity,
            state: newState,
            zip: newZip,
        });

        //console.log(jsonPayload);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF=8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var jsonObject = JSON.parse(xhr.responseText);
                    var errormsg = JSON.stringify(jsonObject);
                    //console.log(errormsg);
                    if (errormsg === "Successfully added") {
                        document.getElementById("newContactMsg").innerHTML = "Added Contact!";
                        document.getElementById("newContactMsg").style.color = "green";
                    }
                };
            }
            xhr.send(jsonPayload);
        }
        catch (error) {
            document.getElementById("newContactMsg").innerHTML = error.message;
            document.getElementById("newContactMsg").style.color = "red";
        }

        document.getElementById("newContactMsg").innerHTML = "Added Contact!";
        document.getElementById("newContactMsg").style.color = "green";
    	  window.location = window.location;
    }
    else
        console.log("error");

}
function validateNewInput(newFirst, newLast, newPhone, newEmail, newZip)
{
    "use strict";
    if (!checkFirstName(newFirst)) return false;
    if (!checkLastName(newLast)) return false;
    if (!checkPhoneNumber(newPhone)) return false;
    if(!checkEmail(newEmail)) return false;
    if(!checkZip(newZip)) return false;
    return true;
}
function checkZip(newZip)
{
    "use strict"
    if (newZip.length !== 5)
    {
        document.getElementById("zipError").innerHTML = "Please enter a valid zip code!";
        document.getElementById("zipError").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 5; i += 1)
    {
        if (newZip.charAt(i) < '0' || newZip.charAt(i) > '9')
        {
            document.getElementById("zipError").innerHTML = "Please enter a valid zip code!";
            document.getElementById("zipError").style.color = "red";
            return false;
        }
    }
    return true;
}
