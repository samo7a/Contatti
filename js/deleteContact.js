function deleteContact(c_id)
{
    let url = 'http://thecontatti.com/API/delete.php';
    console.log("hello");

    readCookie();

    let jsonPayload = JSON.stringify({
        c_id: c_id,
        u_id: u_id,
    });

    console.log(jsonPayload);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF=8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                var jsonObject = JSON.parse( xhr.responseText );
                var errormsg = JSON.stringify(jsonObject);
                console.log(errormsg);
                if (errormsg === "Successfully deleted")
                {
                    document.getElementById("error").innerHTML = "Contact Deleted!";
                    document.getElementById("error").style.color = "green";
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
	
	window.location = window.location;
	document.getElementById("error").innerHTML = "Contact Deleted!";
    document.getElementById("error").style.color = "green";
	window.location = window.location;
}
