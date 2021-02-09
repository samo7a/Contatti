let searchUrl = 'http://thecontatti.com/API/search.php';

var EditButton = `<th class="align-left">
                    <button type="button" id = "edit" class="btn btn-default" data-toggle="modal" data-target="#editContact">
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
                    /*var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}
                    </td><td>${EditButton}</td><td><th class="align-left">
                      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                      </button></th></td></tr>`;*/

                      var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td>
                      <td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td>
                      <td>${jsonArray[i].zip}</td>
                      <td><?php echo $row['c_firsttName']?></td>
                      <td> <th class="align-left">
                      <button type="button" id = "edit" class="btn btn-default" data-toggle="modal" data-target="#editContact">
                      <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                      </button></th></td>
                      <td><div class="modal fade" id="editContact" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit New Contact</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form class="form-group">
                              <label for="firstName">Enter First Name</label>
                              <input type="text" class="form-control" id="editFirst" placeholder=${jsonArray[i].c_firstName}>
                              <label for="LastName">Enter Last Name</label>
                              <input type="text" class="form-control" id="editLast" placeholder=>
                              <label for="phoneNumber">Enter Phone Number</label>
                              <input type="text" class="form-control" id="editPhone" placeholder=>
                              <label for="email">Enter Email</label>
                              <input type="text" class="form-control" id="editEmail" placeholder=>
                              <label for="address">Enter Street</label>
                              <input type="text" class="form-control" id="editAddress" placeholder=>
                              <label for="address">Enter City</label>
                              <input type="text" class="form-control" id="editCity" placeholder=>
                              <label for="address">Enter State</label>
                              <input type="text" class="form-control" id="editState" placeholder=>
                              <label for="address">Enter Zip</label>
                              <input type="text" class="form-control" id="editZip" placeholder=>
                              <button type="button" class="btn btn-primary btn-block mt-2 mb-3" data-dismiss="modal">Close</button>
                              <button type="button" id="editButton" class="btn btn-primary btn-block mt-2 mb-3"
                                onclick="SaveContact();">Save changes</button>
                              <span id="editResult"></span>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div></td>
                      
                      <td><th class="align-left">
                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button></th>
                        </td></tr>`;
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
                    /*var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}
                    </td><td>${EditButton}</td><td><th class="align-left">
                      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                      </button></th></td></tr>`;*/

                      var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td>
                      <td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td>
                      <td>${jsonArray[i].zip}</td>
                      <td><th class="align-left">
                      <button type="button" id = "edit" class="btn btn-default" data-toggle="modal" data-target="#editContact">
                      <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                      </button></th></td>
                      <td><div class="modal fade" id="editContact" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit New Contact</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form class="form-group">
                              <label for="firstName">Enter First Name</label>
                              <input type="text" class="form-control" id="editFirst" placeholder=>
                              <label for="LastName">Enter Last Name</label>
                              <input type="text" class="form-control" id="editLast" placeholder=>
                              <label for="phoneNumber">Enter Phone Number</label>
                              <input type="text" class="form-control" id="editPhone" placeholder=>
                              <label for="email">Enter Email</label>
                              <input type="text" class="form-control" id="editEmail" placeholder=>
                              <label for="address">Enter Street</label>
                              <input type="text" class="form-control" id="editAddress" placeholder=>
                              <label for="address">Enter City</label>
                              <input type="text" class="form-control" id="editCity" placeholder=>
                              <label for="address">Enter State</label>
                              <input type="text" class="form-control" id="editState" placeholder=>
                              <label for="address">Enter Zip</label>
                              <input type="text" class="form-control" id="editZip" placeholder=>
                              <button type="button" class="btn btn-primary btn-block mt-2 mb-3" data-dismiss="modal">Close</button>
                              <button type="button" id="editButton" class="btn btn-primary btn-block mt-2 mb-3"
                                onclick="SaveContact();">Save changes</button>
                              <span id="editResult"></span>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div></td>
                      
                      <td><th class="align-left">
                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button></th>
                        </td></tr>`;
                    
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