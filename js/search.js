var url = 'http://thecontatti.com/API/signup.php';

function search()
{
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
            request.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{    
                var jsonArray = JSON.parse(xhr.responseText);
                var table = document.getElementById("searchResults");
                for (var i = 0; i < jsonArray.length; i++){
                    var row = "<tr><td>${jsonArray[i].c_firstName}</td><td>${jsonArray[i].c_lastName}</td><td>${jsonArray[i].c_phoneNumber}</td><td>${jsonArray[i].c_email}</td><td>${jsonArray[i].address}</td><td>${jsonArray[i].city}</td><td>${jsonArray[i].state}</td><td>${jsonArray[i].zip}</td></tr>";
                    table.innerHTML += row;
                }
		          

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
    
}










    


