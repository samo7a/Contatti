function deleteContact(c_id)
{
      if (confirm("Are you sure you want to delete this contact?"))
      {
          let url = 'http://thecontatti.com/API/delete.php';

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

      	document.getElementById("error").innerHTML = "Contact Deleted!";
          document.getElementById("error").style.color = "green";
      	window.location = window.location;
    }
}
