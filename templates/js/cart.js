

var SideBarShown = false;
var openbtn = document.getElementById('openbtn1')
openbtn.addEventListener('click', e => {
    e.preventDefault()
    SideBarShown = !SideBarShown;
    if (SideBarShown === true) {
        document.getElementById("mySideBar").style.width = "30%";
        document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
    }

    else {
        document.getElementById("mySideBar").style.width = "0";
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';
    }
    //document.getElementById("main").style.marginLeft = "250px";

})
