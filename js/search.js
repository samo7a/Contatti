var searchUrl = 'http://thecontatti.com/API/search.php';

function search()
{   
    'use strict';
    document.getElementById("error").innerHTML = "";
    var table = document.getElementById("searchResults");
    table.innerHTML = "";
    var searchItem = document.getElementById("searchItem").value;
    var jsonPayload = '{"u_id":' + u_id + ', "searchItem":"' + searchItem + '"}';
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
            request.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{    
                var jsonArray = JSON.parse(request.responseText);
                //console.log(jsonArray);
                for (var i = 0; i < jsonArray.length; i++){
                    var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}</td><td><button onclick="editContact();">Edit</button><button "onclick="deleteContact();">Delete</button></td></tr>`;
                    table.innerHTML += row;
                }  
                    if (jsonArray.msg === "No Contacts Found" )
		          document.getElementById("error").innerHTML = jsonArray.msg;


			}
		};
            request.responseType="text";
            request.send(jsonPayload);
            
            
        }
        catch(error)
        {
            document.getElementById("error").innerHTML = error.message;
            document.getElementById("error").style.color = "red";
        }
    }


window.onload = function(){
        'use strict';
    readCookie();
    var table = document.getElementById("searchResults");
    table.innerHTML = "";
    document.getElementById("error").innerHTML = "";
    
    var jsonPayload = '{"u_id":' + u_id + ', "searchItem":""}';
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
            request.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{    
                var jsonArray = JSON.parse(request.responseText);
                //console.log(jsonArray);
                for (var i = 0; i < jsonArray.length; i++){
                    var row = `<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}</td><td><button onclick="editContact();">Edit</button><button "onclick="deleteContact();">Delete</button></td></tr>`;
                    table.innerHTML += row;
                }
		          if (jsonArray.msg === "No Contacts Found" )
		          document.getElementById("error").innerHTML = jsonArray.msg;

			}
		};
            request.responseType="text";
            request.send(jsonPayload);
            
            
        }
        catch(error)
        {
            document.getElementById("error").innerHTML = error.message;
            document.getElementById("error").style.color = "red";
        }
}










    


