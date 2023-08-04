
 window.addEventListener('DOMContentLoaded', function() {
var button = document.getElementById("chpasswd")
var msg = document.getElementById("msg")
msg.style.display = "none"
button.addEventListener("click", (e)=>{
    e.preventDefault()
    const user_id = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;
    console.log(user_id)
    fetch(`/chpasswd?password=${password}&user_id=${user_id}`).then(function(response) {
        console.log(response.body)
        if(response.status == 200){
            console.log(msg)
            msg.style.display = "block"
            msg.innerHTML= "Password updated succesfully"

        }
      }).then(function(data) {
        console.log(data);
      }).catch(function(err) {
        console.log(err)
      });
    
    
})
})