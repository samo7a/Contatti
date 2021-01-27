var urlBase = 'http://thecontatti.com/API';
var extension = 'php';

function addContact()
{
	var inputUser = document.getElementById("u_id").value;
	var addFirst = document.getElementById("firstName").value;
	var addLast = document.getElementById("lastName").value;
	var addPhone = document.getElementById("phoneNumber").value;
	var addEmail = document.getElementById("email").value;
	var addAddress = document.getElementById("address").value;
	var addCity = document.getElementById("city").value;
	var addState = document.getElementById("state").value;
	var addZip = document.getElementById("zip").value;
	document.getElementById("contactAdd").innerHTML = "";
	
	var jsonPayload = '{"u_id" : "' + inputUser + '", "firstName" : "' + addFirst + '", "lastName" : "' + addLast + '", "phoneNumber" : "' + addPhone + '", "email" : "' + addEmail + '", "address" : "' + addAddress + '", "city" : "' + addCity + '", "state" : "' + addState + '", "zip" : "' + addZip + '"}';
	var url = urlBase + '/addContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{	//when readyState is 4 and status is 200, the response is ready
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAdd").innerHTML = "New Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAdd").innerHTML = err.message;
	}
	
}

