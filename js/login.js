var url = 'http://thecontatti.com/API/login.php';

var u_id = 0;
var userName = "";
var password = "";

function login()
{
	 u_id = 0;
	 var u_firstName = "";
	 var u_lastName = "";
	
	userName = document.getElementById("loginName").value;
    password = md5(document.getElementById("loginPassword").value);
	
	document.getElementById("loginResult").innerHTML = "";
	
	var jsonPayload = '{"userName" : "' + userName + '", "password" : "' + password + '"}';
    
    var request = new XMLHttpRequest();
	    request.open("POST", url, true);
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
    
    
