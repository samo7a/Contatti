let signUpUrl = 'http://thecontatti.com/API/signup.php';
let loginUrl = 'http://thecontatti.com/API/login.php';

var firstName = "";
var lastName = "";
var password = "";
var confirmPassword = "";
var userName = "";
var phoneNumber = "";
var email = "";



var u_id = 0;
var loginName = "";
var loginPassword = "";

function login()
{   "use strict";
	 u_id = 0;
	 var u_firstName = "";
	 var u_lastName = "";

	loginName = document.getElementById("loginName").value;
    loginPassword = md5(document.getElementById("loginPassword").value);

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"userName" : "' + loginName + '", "password" : "' + loginPassword + '"}';

    var request = new XMLHttpRequest();
	    request.open("POST", loginUrl, true);
	    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
            request.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(request.responseText);
                u_id = jsonObject.u_id;
                var endpointmsg = jsonObject.error;
                if( u_id < 1 )
		          {
			         document.getElementById("loginResult").innerHTML = endpointmsg;
                      document.getElementById("loginResult").style.color = "red";
			         return;
		          }

                u_firstName = jsonObject.u_firstName;
                u_lastName = jsonObject.u_lastName;
                saveCookie();
                window.location.href = "contacts.html";

			}
		};
            request.responseType="text";
            request.send(jsonPayload);
        }

	   catch(err)
	   {
		document.getElementById("loginResult").innerHTML = err.message;
	   }

}

function signup()
{
    "use strict";
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    password = document.getElementById("password").value;
    confirmPassword = document.getElementById("confirmPassword").value;
    userName = document.getElementById("userName").value;
    phoneNumber = document.getElementById("phoneNumber").value;
    email = document.getElementById("email").value;
    document.getElementById("loginName").innerHTML = "";
    document.getElementById("loginPassword").innerHTML = "";
    document.getElementById("firstNameError").innerHTML = "";
    document.getElementById("lastNameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("confirmPasswordError").innerHTML = "";
    document.getElementById("userNameError").innerHTML = "";
    document.getElementById("phoneNumberError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("error").innerHTML = "";

    if (validateInput(firstName, lastName, password, confirmPassword, userName, phoneNumber, email))
    {
        var hashedPassword = md5(password);
        var json = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "password" : "' + hashedPassword + '", "userName" : "' + userName + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';
        //console.log(json);


	    var request = new XMLHttpRequest();
	    request.open("POST", signUpUrl, true);
	    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
            request.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{    //console.log(request.responseText);
				var jsonObject = JSON.parse(request.responseText);
                //console.log(jsonObject.msg);
                var endpointmsg = jsonObject['msg'];
                var errormsg = endpointmsg.split('Users.').pop();

                if(errormsg === "u_phoneNumber'")
                {
                    document.getElementById("error").innerHTML = "This phone number is registered. Sign in instead!";
                    document.getElementById("error").style.color = "red";
                }
                if(errormsg === "u_email'")
                {
                    document.getElementById("error").innerHTML += "This email has been used. Sign in instead!";
                    document.getElementById("error").style.color = "red";
                }
            if(errormsg === "userName'")
                {
                    document.getElementById("error").innerHTML += "This user name is taken. Try again!";
                    document.getElementById("error").style.color = "red";
                }

            if (errormsg === "done")
                {
                    document.getElementById("error").innerHTML = "Signed UP!";
                    document.getElementById("error").style.color = "green";
                    document.getElementById("loginName").value = userName;
                    document.getElementById("loginPassword").value = password;

                    document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("confirmPassword").value = "";
                    document.getElementById("userName").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phoneNumber").value = "";



                }


			}
		};
            request.responseType="text";
            request.send(json);


        }
        catch(error)
        {
            document.getElementById("error").innerHTML = error.message;
            document.getElementById("error").style.color = "red";
        }
    }
    else
    {
        document.getElementById("firstName").value = firstName;
        document.getElementById("lastName").value = lastName;
        document.getElementById("password").value = password;
        document.getElementById("userName").value = userName;
        if (email == null)
        {
            document.getElementById("email").value = "";
        }
        else
        {
            document.getElementById("email").value = email;
        }
        if (phoneNumber == null)
        {
            document.getElementById("phoneNumber").value = "";
        }
        else
        {
            document.getElementById("phoneNumber").value = phoneNumber;
        }
        document.getElementById("error").innerHTML = "";
    }
}

function checkFirstName(name)
{
    "use strict";
    var nameREGEX = /^[A-Za-z-,\s']+$/;
    if (name.length < 1)
    {
        document.getElementById("firstNameError").innerHTML = "First name is required!";
        document.getElementById("firstNameError").style.color = "red";
        return false;
    }
    if (!nameREGEX.test(name))
    {
        document.getElementById("firstNameError").innerHTML = "Please enter a valid name!";
        document.getElementById("firstNameError").style.color = "red";
        return false;
    }
    if (name.length > 50)
    {
        document.getElementById("firstNameError").innerHTML = "First Name should not exceed 50 characters!";
        document.getElementById("firstNameError").style.color = "red";
        return false;
    }
    return true;
}

function checkLastName(name)
{
    "use strict";
    var nameREGEX = /^[A-Za-z-,\s']+$/;
    if (name.length < 1) {
        document.getElementById("lastNameError").innerHTML = "Last name is required!";
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

function checkPassword(password)
{
    "use strict";
    var passwordREGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;
        if (password.length === 0) {
        document.getElementById("passwordError").innerHTML = "Password is required!";
        document.getElementById("passwordError").style.color = "red";
        return false;
    }
    if (!passwordREGEX.test(password))
    {
        document.getElementById("passwordError").innerHTML = "Your password must be at least 8 characters long, contain at least one number, one symbol and have a mixture of uppercase and lowercase letters.<br>Password should not exceed 50 characters!";
        document.getElementById("passwordError").style.color = "red";
        return false;
    }

    return true;
}

function checkConfirmPassword(confirmPassword, password)
{
    if (confirmPassword !== password)
    {
        document.getElementById("confirmPasswordError").innerHTML = "The two passwords are not matched!";
        document.getElementById("confirmPasswordError").style.color = "red";
        return false;
    }
    return true;
}

function checkUserName(userName)
{
    "use strict";
    var userNameREGEX = /^[A-z]{1,}[A-z0-9]{4,50}$/;
    if (!userNameREGEX.test(userName))
    {
        document.getElementById("userNameError").innerHTML = "Please enter a valid User Name!<br>User Name should start with a letter, cannot contain any special characters and must be between 5 to 50 Characters long!";
        document.getElementById("userNameError").style.color = "red";
        return false;
    }

    return true;
}

function checkPhoneNumber(phoneNumber)
{
    "use strict";
    if (phoneNumber.length === 0)
    {
        return true;
    }
    if (phoneNumber.length !== 10)
    {
        document.getElementById("phoneNumberError").innerHTML = "Please enter a valid phone number!";
        document.getElementById("phoneNumberError").style.color = "red";
        return false;
    }
    var i = 0;
    for (i = 0; i < 10; i += 1)
    {
        if (phoneNumber.charAt(i) < '0' || phoneNumber.charAt(i) > '9')
        {
            document.getElementById("phoneNumberError").innerHTML = "Please enter a valid phone number!";
            document.getElementById("phoneNumberError").style.color = "red";
            return false;
        }
    }
    return true;
}

function checkEmail(email)
{
    "use strict";
    var emailREGEX = /^[^\s@]+@[^\s@\d]+\.[^\s@\d]+$/;
    if (email.length > 50)
    {
        document.getElementById("emailError").innerHTML = "Email is too long!<br>Email should not exceed 50 characters!";
        document.getElementById("emailError").style.color = "red";
        return false;
    }
    if (email.length === 0)
    {
        return true;
    }
    if (!emailREGEX.test(email))
    {
        document.getElementById("emailError").innerHTML = "Please enter your email address in format:<br>yourname@example.com";
        document.getElementById("emailError").style.color = "red";
        return false;
    }
    return true;
}

function validateInput(firstName, lastName, password, confirmPassword, userName, phoneNumber, email)
{
    "use strict";
    if (!checkFirstName(firstName)) return false;
    if (!checkLastName(lastName)) return false;
    if (!checkPassword(password)) return false;
    if (!checkConfirmPassword(confirmPassword, password)) return false;
    if (!checkUserName(userName)) return false;
    if (!checkPhoneNumber(phoneNumber)) return false;
    if(!checkEmail(email)) return false;
    return true;
}

function logout()
{
	u_id = 0;
	document.cookie = "u_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "u_id=" + u_id + ";expires=" + date.toGMTString();
}

function readCookie()
{
	u_id = -1;
	var data = document.cookie;
	var splits = data.split(";");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");

		if( tokens[0] == "u_id" )
		{
			u_id = parseInt( tokens[1].trim() );
		}
	}

	if( u_id < 0 )
	{
		window.location.href = "index.html";
	}

}
