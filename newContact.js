function newContact()
{
    let url = 'http://thecontatti.com/API/addContact.php';

    // need way to know user ID (cookie)
    var newFirst = document.getElementById("newFirst").value;
    var newLast = document.getElementById("newLast").value;
    var newPhone = document.getElementById("newPhone").value;
    var newEmail = document.getElementById("newEmail").value;
    var newStreet = document.getElementById("newStreet").value;
    var newCity = document.getElementById("newCity").value;
    var newState = document.getElementById("newState").value;
    var newZip = document.getElementById("newZip").value;

    let jsonPayload = JSON.stringify({
        c_firstName: newFirst,
        c_lastName: newLast,
        c_phoneNumber: newPhone,
        c_email: newEmail,
        address: newStreet,
        city: newCity,
        state: newState,
        zip: newZip,
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
                var endpointmsg = jsonObject['msg'];
                var errormsg = endpoingsmsg.split('Contacts.').pop();
                if (errormsg === "Successfully added")
                {
                    document.getElementById("error").innerHTML = "Added Contact!";
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
}
