let searchUrl = 'http://thecontatti.com/API/search.php';
let deleteUrl = 'http://thecontatti.com/API/delete.php';
let addUrl = 'http://thecontatti.com/API/addContact.php';
let editUrl = 'http://thecontatti.com/API/edit.php';

var jsonArray;

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
                jsonArray = JSON.parse(request.responseText);
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
                jsonArray = JSON.parse(request.responseText);
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
    document.getElementById("firstNameError").innerHTML = "";
    document.getElementById("lastNameError").innerHTML =  "";
    document.getElementById("emailError").innerHTML =  "";
    document.getElementById("phoneNumberError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";
    document.getElementById("cityError").innerHTML = "";
    document.getElementById("stateError").innerHTML = "";
    document.getElementById("zipError").innerHTML = "";
    document.getElementById("newContactMsg").innerHTML = "";
 
    readCookie();
    var newFirst = document.getElementById("newFirst").value;
    var newLast = document.getElementById("newLast").value;
    var newPhone = document.getElementById("newPhone").value;
    var newEmail = document.getElementById("newEmail").value;
    var newStreet = document.getElementById("newStreet").value;
    var newCity = document.getElementById("newCity").value;
    var newState = document.getElementById("newState").value;
    var newZip = document.getElementById("newZip").value;

    if (validateNewInput(newFirst, newLast, newPhone, newEmail,newStreet, newCity, newState, newZip))
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
        xhr.open("POST", addUrl, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF=8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var jsonObject = JSON.parse(xhr.responseText);
                    var errormsg = jsonObject.msg;
                    //console.log(errormsg);
                    if (errormsg === "Successfully added") {
                        document.getElementById("newContactMsg").innerHTML = "Added Contact!";
                        document.getElementById("newContactMsg").style.color = "green";
                        setTimeout(() => {  window.location = window.location; }, 1500);
                    }
                    else {
                        document.getElementById("newContactMsg").innerHTML = "Duplicate phone Number";
                        document.getElementById("newContactMsg").style.color = "red";
                    }
                };
            }
            xhr.send(jsonPayload);
        }
        catch (error) {
            //newContactMsg
            document.getElementById("newContactMsg").innerHTML = error.message;
            document.getElementById("newContactMsg").style.color = "red";
        }

    }
}
function deleteContact(c_id)
{
      if (confirm("Are you sure you want to delete this contact?"))
      {
          

          readCookie();

          let jsonPayload = JSON.stringify({
              c_id: c_id,
              u_id: u_id,
          });

          console.log(jsonPayload);
          let xhr = new XMLHttpRequest();
          xhr.open("POST", deleteUrl, true);
          xhr.setRequestHeader("Content-type", "application/json; charset=UTF=8");
          try
          {
              xhr.onreadystatechange = function()
              {
                  if (this.readyState == 4 && this.status == 200)
                  {
                      var jsonObject = JSON.parse( xhr.responseText );
                      var errormsg = jsonObject.msg;
                      //console.log(errormsg);
                      if (errormsg === "Successfully deleted")
                      {
                          document.getElementById("error").innerHTML = "Contact Deleted!";
                          document.getElementById("error").style.color = "green";
                          setTimeout(() => {  window.location = window.location; }, 1000);
                      }
                  };
              }
              xhr.send(jsonPayload);
          }
          catch(error)
          {
              document.getElementById("error").innerHTML = error.message;
              document.getElementById("error").style.color = "red";
          }
    }
}

function editContact(c_id) {
    
    readCookie();

//    var request = new XMLHttpRequest();
//    request.open("POST", editUrl, true);
//    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//    //console.log(`This is ${editFirst} times easier!`);
//
//    console.log(`This is 1 times easier!`);
//   /* 
//    var cID = document.getElementById("c_id").value;
//    var uID = document.getElementById("u_id").value;
//    var editFirst = document.getElementById("c_firstName").value;
//    var editLast = document.getElementById("c_lastName").value;
//    var editPhone = document.getElementById("c_phoneNumber").value;
//    var editEmail = document.getElementById("c_email").value;
//    var editAddress = document.getElementById("address").value;
//    var editCity = document.getElementById("city").value;
//    var editState = document.getElementById("state").value;
//    var editZip = document.getElementById("zip").value;
//*/
//   
//    //console.log(`This is ${editFirst} times easier!`);
// 
//    let jsonPayload = JSON.stringify({
//        c_id: c_id,
//        u_id: u_id,
//    });
//
//    console.log(`This is 2 times easier!`);
//    console.log(`Printing: ${jsonPayload} !`);
//    //var json = '{"c_id" : "' + cID + '", "u_id" : "' + uID + '", "c_firstName" : "' + editFirst + '", "c_lastName" : "' + editLast +'", "c_phoneNumber" : "' + editPhone + 
//    //    '", "c_email" :"' + editEmail + '", "address" : "' + editAddress + '", "city" : "' + editCity + '", "state" : "' + editState + '", "zip" : "' + editZip + '"}';    
//
//    try 
//    {
//        request.onreadystatechange = function () {
//            if (this.readyState == 4 && this.status == 200) 
//            {                
//                var jsonObject = JSON.parse(request.responseText);
//                document.getElementById("edit").value = editFirst;
//                console.log(`This is ${editFirst} times easier!`);
//            }
//            console.log(`This is x times easier!`);
//    };
//    request.responseType = "text";
//    request.send(jsonPayload);
//}
//
//    catch (err) {
//        document.getElementById("error").innerHTML = err.message;
//        document.getElementById("error").innerHTML = err.message;
//    }

}
function validateNewInput(newFirst, newLast, newPhone, newEmail,newStreet, newCity, newState, newZip)
{
    "use strict";
    if (!checkFirstName(newFirst)) return false;
    if (!checkLastName2(newLast)) return false;
    if (!checkPhoneNumber2(newPhone)) return false;
    if(!checkEmail(newEmail)) return false;
    if(!checkAddress(newStreet)) return false;
    if(!checkCity(newCity)) return false;
    if(!checkState(newState)) return false;
    if(!checkZip(newZip)) return false;
    return true;
}
function checkZip(newZip)
{
    "use strict"
    if (newZip.length === 0){
        return true;
    }
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

function checkPhoneNumber2(newPhone)
{
   "use strict";
    if (newPhone.length === 0)
    {   
        document.getElementById("phoneNumberError").innerHTML = "Phone Number is required!";
        document.getElementById("phoneNumberError").style.color = "red";
        return false;
    }
    if (newPhone.length !== 10)
    {
        document.getElementById("phoneNumberError").innerHTML = "Please enter a valid phone number!";
        document.getElementById("phoneNumberError").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 10; i += 1)
    {
        if (newPhone.charAt(i) < '0' || newPhone.charAt(i) > '9')
        {
            document.getElementById("phoneNumberError").innerHTML = "Please enter a valid phone number!";
            document.getElementById("phoneNumberError").style.color = "red";
            return false;
        }
    }
    return true;
}
function checkLastName2(name)
{
   "use strict";
    var nameREGEX = /^[A-Za-z-,\s']+$/;
    if (name.length === 0) {
        return true;
    }

    if (!nameREGEX.test(name)) {
        document.getElementById("lastNameError").innerHTML = "please enter a valid name!";
        document.getElementById("lastNameError").style.color = "red";
        return false;
    }
    if (name.length > 50) {
        document.getElementById("lastNameError").innerHTML = "Last Name should not exceed 50 characters!";
        document.getElementById("lastNameError").style.color = "red";
        return false;
    }
    return true;
}
function checkAddress(newAddress){
    "use strict";
    if (newAddress.length === 0)
    {   
        return true;
    }
    if (newAddress.length > 50)
    {
        document.getElementById("addressError").innerHTML = "Address should not exceed 50 characters!";
        document.getElementById("addressError").style.color = "red";
        return false;
    }
    return true;
}
function checkState(newState){
    "use strict";
    if (newState.length === 0)
    {   
        return true;
    }
    if (newState.length > 20)
    {
        document.getElementById("stateError").innerHTML = "State should not exceed 20 characters!";
        document.getElementById("stateError").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < newState.length; i += 1)
    {
        if (newState.charAt(i) >= '0' && newState.charAt(i) <= '9')
        {
            document.getElementById("stateError").innerHTML = "Please enter a valid state!";
            document.getElementById("stateError").style.color = "red";
            return false;
        }
    }
    return true;
}
function checkCity(newCity){
    "use strict";
    if (newCity.length === 0)
    {   
        return true;
    }
    if (newCity.length > 20)
    {
        document.getElementById("cityError").innerHTML = "City should not exceed 20 characters!";
        document.getElementById("cityError").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < newCity.length; i += 1)
    {
        if (newCity.charAt(i) >= '0' && newCity.charAt(i) <= '9')
        {
            document.getElementById("cityError").innerHTML = "Please enter a valid city name!";
            document.getElementById("cityError").style.color = "red";
            return false;
        }
    }
    return true;
}