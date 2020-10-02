function openNav() {

}
function closeNav() {

}
var openbtn = document.getElementById("openbtn1");
var closebtn = document.getElementById("closebtn")
openbtn.addEventListener('click', e => {
    e.preventDefault()
    document.getElementById("mySideBar").style.width = "40%";
    //document.getElementById("main").style.marginLeft = "250px";

})
closebtn.addEventListener('click', e => {
    e.preventDefault()
    document.getElementById("mySideBar").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";

})