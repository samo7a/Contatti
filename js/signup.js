var url = 'http://thecontatti.com/signup.php';

var firstName = "";
var lastName = "";
var password = "";
var userName = "";
var phoneNumber = "";
var email = "";

function signup() {
    "use strict";
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    password = document.getElementById("password").value;
    userName = document.getElementById("userName").value;
    phoneNumber = document.getElementById("phoneNumber").value;
    email = document.getElementById("email").value;
    document.getElementById("error").innerHTML = "";
    
    if (validateInput(firstName, lastName, password, userName, phoneNumber, email)) {
        var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "password" : "' + password + '", "userName" : "' + userName + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';
        //TODO: send the json file to the php end point
        console.log(JSON.parse(jsonPayload));
    }
    else {
        document.getElementById("firstName").value = firstName;
        document.getElementById("lastName").value = lastName;
        document.getElementById("password").value = password;
        document.getElementById("userName").value = userName;
        if (email == null) {
            document.getElementById("email").value = "";
        }
        else{
            document.getElementById("email").value = email;
        }
        if (phoneNumber == null) {
            document.getElementById("phoneNumber").value = "";
        }
        else{
            document.getElementById("phoneNumber").value = phoneNumber;
        }
        
    }
}

function checkName(name) {
    "use strict";
    var nameREGEX = /^[A-Za-z]+$/;
    if (name.length < 1) {
        document.getElementById("error").innerHTML = "First and last names shouldn't be empty!";
        document.getElementById("error").style.color = "red";
        return false;       
    }
    if (!nameREGEX.test(name)) {
        document.getElementById("error").innerHTML = "Enter a valid Name!";
        document.getElementById("error").style.color = "red";
        return false; 
    }
    return true;
}
function checkPassword(password) {
    "use strict";
    var passwordREGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordREGEX.test(password)) {
        document.getElementById("error").innerHTML = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 digit.<br>Password should be at least 8 characters long";
        document.getElementById("error").style.color = "red";
        return false;
    }
    if (password.length > 50) {
        document.getElementById("error").innerHTML = "Password should not exceed 50 characters!";
        document.getElementById("error").style.color = "red";
        return false;
    }
    return true;
}
function checkUserName(userName) {
    "use strict";
    var userNameREGEX = /^[A-z]{1,}[A-z0-9]{0,}$/;
    if (!userNameREGEX.test(userName)) {
        document.getElementById("error").innerHTML = "Please enter a valid User Name.<br>User Name should start with at least one Character!";
        document.getElementById("error").style.color = "red";
        return false;        
    }
    if (userName.length < 5 || userName.length > 50) {
        document.getElementById("error").innerHTML = "Please enter a valid User Name!<br>User Name length must be between 5 and 50 Characters!";
        document.getElementById("error").style.color = "red";
        return false;       
    }
    return true;
}
function checkPhoneNumber(phoneNumber) {
    "use strict";
    if (phoneNumber.length === 0) {
        phoneNumber = null;
        return true;
    }
    if (phoneNumber.length !== 10) {
        document.getElementById("error").innerHTML = "Please enter a valid phone number!";
        document.getElementById("error").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 10; i += 1) {
        if (phoneNumber.charAt(i) < '0' && phoneNumber.charAt(i) > '9') {
            document.getElementById("error").innerHTML = "Please enter a valid phone number!";
            document.getElementById("error").style.color = "red";
            return false;
        } 
    }
    return true;
}
    
function checkEmail(email) {
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;
    if (email.length > 50) {
        document.getElementById("error").innerHTML = "Email is too long!<br>Email should not exceed 50 characters!";
        document.getElementById("error").style.color = "red";
        return false;
    }
    if (email.length === 0) {
        email = null;
        return true;
    }
    if (!emailREGEX.test(email)) {
        document.getElementById("error").innerHTML = "Please enter a valid email address!";
        document.getElementById("error").style.color = "red";
        return false;
    }
    return true;
}

function validateInput(firstName, lastName, password, userName, phoneNumber, email) {
    "use strict";
    if (!checkName(firstName)) return false;
    if (!checkName(lastName)) return false;
    if (!checkPassword(password)) return false;
    if (!checkUserName(userName)) return false;
    if (!checkPhoneNumber(phoneNumber)) return false;
    if(!checkEmail(email)) return false;
    return true;
}


