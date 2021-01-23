var url = 'http://thecontatti.com/API/signup.php';
//var dublicateEmail = "Duplicate entry '88@ss.net' for key 'Users.u_email'";
//var dublicateUserName = "Duplicate entry 'samo' for key 'Users.userName'";
//var dublicatePhoneNumber = "Dublicat entry '12345667' for key 'Users.phoneNumber'";
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
    document.getElementById("firstNameError").innerHTML = "";
    document.getElementById("lastNameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("userNameError").innerHTML = "";
    document.getElementById("phoneNumberError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    
    if (validateInput(firstName, lastName, password, userName, phoneNumber, email)) {
        
        var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "password" : "' + password + '", "userName" : "' + userName + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';
        console.log(jsonPayload);
	    var request = new XMLHttpRequest();
	    request.open("POST", url, true);
	    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
            request.send(jsonPayload);
            var jsonObject = JSON.parse(request.responseText);
            console.log(jsonObject.msg);
            console.log(jsonObject.error);
            window.location.href = "index.html";
       }
        catch(err) {
            document.getElementById("error").innerHTML = err.message;
        }
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

function checkFirstName(name) {
    "use strict";
    var nameREGEX = /^[A-Za-z-,\s']+$/;
    if (name.length < 1) {
        document.getElementById("firstNameError").innerHTML = "First name is required!";
        document.getElementById("firstNameError").style.color = "red";
        return false;       
    }
    if (!nameREGEX.test(name)) {
        document.getElementById("firstNameError").innerHTML = "Please enter a valid name!";
        document.getElementById("firstNameError").style.color = "red";
        return false; 
    }
    if (name.length > 50) {
        document.getElementById("firstNameError").innerHTML = "First Name should not exceed 50 characters!";
        document.getElementById("firstNameError").style.color = "red";
        return false;       
    }
    return true;
}
function checkLastName(name) {
    "use strict";
    var nameREGEX = /^[A-Za-z-,\s']+$/;
    if (name.length < 1) {
        document.getElementById("lastNameError").innerHTML = "*Last name is required!";
        document.getElementById("lastNameError").style.color = "red";
        return false;       
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
function checkPassword(password) {
    "use strict";
    var passwordREGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (password.length === 0) {
        document.getElementById("passwordError").innerHTML = "Password is required!";
        document.getElementById("passwordError").style.color = "red";
        return false;
    }
    if (!passwordREGEX.test(password)) {
        document.getElementById("passwordError").innerHTML = "Your password must be at least 8 characters long, contain at least<br>one number and have a mixture of uppercase and lowercase letters.";
        document.getElementById("passwordError").style.color = "red";
        return false;
    }
    if (password.length > 50) {
        document.getElementById("passwordError").innerHTML = "Password should not exceed 50 characters!";
        document.getElementById("passwordError").style.color = "red";
        return false;
    }
    return true;
}
function checkUserName(userName) {
    "use strict";
    var userNameREGEX = /^[A-z]{1,}[A-z0-9]{0,}$/;
    if (!userNameREGEX.test(userName)) {
        document.getElementById("userNameError").innerHTML = "Please enter a valid User Name!<br>User Name should start with a letter!";
        document.getElementById("userNameError").style.color = "red";
        return false;        
    }
    if (userName.length < 5 || userName.length > 50) {
        document.getElementById("userNameError").innerHTML = "Please enter a valid User Name!<br>User Name length must be between 5 and 50 Characters!";
        document.getElementById("userNameError").style.color = "red";
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
        document.getElementById("phoneNumberError").innerHTML = "Please enter a valid phone number!";
        document.getElementById("phoneNumberError").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 10; i += 1) {
        if (phoneNumber.charAt(i) < '0' && phoneNumber.charAt(i) > '9') {
            document.getElementById("phoneError").innerHTML = "Please enter a valid phone number!";
            document.getElementById("phoneError").style.color = "red";
            return false;
        } 
    }
    return true;
}
    
function checkEmail(email) {
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;
    if (email.length > 50) {
        document.getElementById("emailError").innerHTML = "Email is too long!<br>Email should not exceed 50 characters!";
        document.getElementById("emailError").style.color = "red";
        return false;
    }
    if (email.length === 0) {
        email = null;
        return true;
    }
    if (!emailREGEX.test(email)) {
        document.getElementById("emailError").innerHTML = "Please enter your email address in format:<br>yourname@example.com";
        document.getElementById("emailError").style.color = "red";
        return false;
    }
    return true;
}

function validateInput(firstName, lastName, password, userName, phoneNumber, email) {
    "use strict";
    if (!checkFirstName(firstName)) return false;
    if (!checkLastName(lastName)) return false;
    if (!checkPassword(password)) return false;
    if (!checkUserName(userName)) return false;
    if (!checkPhoneNumber(phoneNumber)) return false;
    if(!checkEmail(email)) return false;
    return true;
}


