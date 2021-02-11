let searchUrl = 'http://thecontatti.com/API/search.php';
let deleteUrl = 'http://thecontatti.com/API/delete.php';
let addUrl =    'http://thecontatti.com/API/addContact.php';
let editUrl =   'http://thecontatti.com/API/edit.php';

var jsonArray;
var index;

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
                jsonArray = JSON.parse(request.responseText);;
                for (var i = 0; i < jsonArray.length; i++) {
                    var editButton = `<td class="align-left">
                    <button type="button" id = "edit" class="btn btn-default" data-toggle="modal" data-target="#editContact" onclick="setIndex(${i});">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                    </button></td>`;
                    var deleteButton = `<td class="align-left">
                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                        </td>`;
                    var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}</td>${editButton}${deleteButton}</tr>`;
                    
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
 
                for (var i = 0; i < jsonArray.length; i++) {
                    var editButton = `<td class="align-left">
                    <button type="button" id = "edit" class="btn btn-default" data-toggle="modal" data-target="#editContact" onclick="setIndex(${i});">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                    </button></td>`;
                    var deleteButton = `<td class="align-left">
                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#deleteContact" onclick="deleteContact(${jsonArray[i].c_id});">
                        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                        </td>`;
                    var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}</td>${editButton}${deleteButton}</tr>`;


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

        let xhr = new XMLHttpRequest();
        xhr.open("POST", addUrl, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF=8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var jsonObject = JSON.parse(xhr.responseText);
                    var errormsg = jsonObject.msg;

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


function setIndex(i){
    index = i;
    document.getElementById("editFirst").value = jsonArray[index].c_firstName;
    document.getElementById("editLast").value = jsonArray[index].c_lastName;
    document.getElementById("editPhone").value = jsonArray[index].c_phoneNumber;
    document.getElementById("editEmail").value = jsonArray[index].c_email;
    document.getElementById("editAddress").value = jsonArray[index].address;
    document.getElementById("editCity").value = jsonArray[index].city;
    document.getElementById("editState").value = jsonArray[index].state;
    document.getElementById("editZip").value = jsonArray[index].zip;
}
function editContact() {
    
    readCookie();
    var cId = jsonArray[index].c_id;
    var uId = u_id;
    var editFirst = document.getElementById("editFirst").value;
    var editLast = document.getElementById("editLast").value;
    var editPhone = document.getElementById("editPhone").value;
    var editEmail = document.getElementById("editEmail").value;
    var editAddress = document.getElementById("editAddress").value;
    var editCity = document.getElementById("editCity").value;
    var editState = document.getElementById("editState").value;
    var editZip = document.getElementById("editZip").value;
    
     if (validateEditInput(editFirst, editLast, editPhone, editEmail,editAddress, editCity, editState, editZip))
    {
        let jsonPayload = JSON.stringify({
            c_id: cId,
            u_id: uId,
            c_firstName: editFirst,
            c_lastName: editLast,
            c_phoneNumber: editPhone,
            c_email: editEmail,
            address: editAddress,
            city: editCity,
            state: editState,
            zip: editZip,
        });

        let xhr = new XMLHttpRequest();
        xhr.open("POST", editUrl, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF=8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var jsonObject = JSON.parse(xhr.responseText);
                    var errormsg = jsonObject.error;
                    if (errormsg === "done") {
                        document.getElementById("editResult").innerHTML = "Contact Edited!";
                        document.getElementById("editResult").style.color = "green";
                        setTimeout(() => {  window.location = window.location; }, 1500);
                    }
                    else {
                        document.getElementById("editResult").innerHTML = "Duplicate phone Number";
                        document.getElementById("editResult").style.color = "red";
                    }
                };
            }
            xhr.send(jsonPayload);
        }
        catch (error) {
            //newContactMsg
            document.getElementById("editResult").innerHTML = error.message;
            document.getElementById("editResult").style.color = "red";
        }
        
    }

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

function validateEditInput (editFirst, editLast, editPhone, editEmail,editAddress, editCity, editState, editZip){
    "use strict";
    if (!checkEditFirstName(editFirst)) return false;
    if (!checkEditLastName(editLast)) return false;
    if (!checkEditPhoneNumber(editPhone)) return false;
    if(!checkEditEmail(editEmail)) return false;
    if(!checkEditAddress(editAddress)) return false;
    if(!checkEditCity(editCity)) return false;
    if(!checkEditState(editState)) return false;
    if(!checkEditZip(editZip)) return false;
    return true;
}

function checkEditFirstName(editFirst)
{
   "use strict";
    var nameREGEX = /^[A-Za-z-,\s']+$/;
    if (editFirst.length === 0) {
        document.getElementById("editErrorFirst").innerHTML = "First Name is required!";
        document.getElementById("editErrorFirst").style.color = "red";
        return false;
    }

    if (!nameREGEX.test(editFirst)) {
        document.getElementById("editErrorFirst").innerHTML = "please enter a valid name!";
        document.getElementById("editErrorFirst").style.color = "red";
        return false;
    }
    if (editFirst.length > 50) {
        document.getElementById("editErrorFirst").innerHTML = "Last Name should not exceed 50 characters!";
        document.getElementById("editErrorFirst").style.color = "red";
        return false;
    }
    return true;
}

function checkEditLastName(name)
{
   "use strict";
    var nameREGEX = /^[A-Za-z-,\s']+$/;
    if (name.length === 0) {
        return true;
    }

    if (!nameREGEX.test(name)) {
        document.getElementById("editErrorLast").innerHTML = "please enter a valid name!";
        document.getElementById("editErrorLast").style.color = "red";
        return false;
    }
    if (name.length > 50) {
        document.getElementById("editErrorLast").innerHTML = "Last Name should not exceed 50 characters!";
        document.getElementById("editErrorLast").style.color = "red";
        return false;
    }
    return true;
}
function checkEditZip(editZip)
{
    "use strict"
    if (editZip.length === 0){
        return true;
    }
    if (editZip.length !== 5)
    {
        document.getElementById("editErrorZip").innerHTML = "Please enter a valid zip code!";
        document.getElementById("editErrorZip").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 5; i += 1)
    {
        if (newZip.charAt(i) < '0' || newZip.charAt(i) > '9')
        {
            document.getElementById("editErrorZip").innerHTML = "Please enter a valid zip code!";
            document.getElementById("editErrorZip").style.color = "red";
            return false;
        }
    }
    return true;
}

function checkEditPhoneNumber(editPhone)
{
   "use strict";
    if (editPhone.length === 0)
    {   
        document.getElementById("editErrorPhone").innerHTML = "Phone Number is required!";
        document.getElementById("editErrorPhone").style.color = "red";
        return false;
    }
    if (editPhone.length !== 10)
    {
        document.getElementById("editErrorPhone").innerHTML = "Please enter a valid phone number!";
        document.getElementById("editErrorPhone").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 10; i += 1)
    {
        if (editPhone.charAt(i) < '0' || editPhone.charAt(i) > '9')
        {
            document.getElementById("editErrorPhone").innerHTML = "Please enter a valid phone number!";
            document.getElementById("editErrorPhone").style.color = "red";
            return false;
        }
    }
    return true;
}

function checkEditAddress(editAddress){
    "use strict";
    if (editAddress.length === 0)
    {   
        return true;
    }
    if (editAddress.length > 50)
    {
        document.getElementById("editErrorAddress").innerHTML = "Address should not exceed 50 characters!";
        document.getElementById("editErrorAddress").style.color = "red";
        return false;
    }
    return true;
}

function checkEditEmail(editEmail){
   "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;
    if (editEmail.length > 50)
    {
        document.getElementById("editErrorEmail").innerHTML = "Email is too long!<br>Email should not exceed 50 characters!";
        document.getElementById("editErrorEmail").style.color = "red";
        return false;
    }
    if (editEmail.length === 0)
    {
        return true;
    }
    if (!emailREGEX.test(editEmail))
    {
        document.getElementById("editErrorEmail").innerHTML = "Please enter your email address in format:<br>yourname@example.com";
        document.getElementById("editErrorEmail").style.color = "red";
        return false;
    }
    return true;
}
function checkEditState(editState){
    "use strict";
    if (editState.length === 0)
    {   
        return true;
    }
    if (editState.length > 20)
    {
        document.getElementById("editErrorState").innerHTML = "State should not exceed 20 characters!";
        document.getElementById("editErrorState").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < editState.length; i += 1)
    {
        if (editState.charAt(i) >= '0' && editState.charAt(i) <= '9')
        {
            document.getElementById("editErrorState").innerHTML = "Please enter a valid state!";
            document.getElementById("editErrorState").style.color = "red";
            return false;
        }
    }
    return true;
}
function checkEditCity(editCity){
    "use strict";
    if (editCity.length === 0)
    {   
        return true;
    }
    if (editCity.length > 20)
    {
        document.getElementById("editErrorCity").innerHTML = "City should not exceed 20 characters!";
        document.getElementById("editErrorCity").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < editCity.length; i += 1)
    {
        if (editCity.charAt(i) >= '0' && editCity.charAt(i) <= '9')
        {
            document.getElementById("editErrorCity").innerHTML = "Please enter a valid city name!";
            document.getElementById("editErrorCity").style.color = "red";
            return false;
        }
    }
    return true;
}