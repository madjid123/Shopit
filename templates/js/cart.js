
class Cart {
    cart = []
    addItem(name, price, count, imgUrl) {

        this.cart.push({ name, price, count, imgUrl })
    }
    updateCount(itemName, count) {
        this.cart.map((n) => { if (itemName === n.name) n.count = count; })
        this.saveCart()

    }
    saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }

};


function AddToCart(row) {

}

var SideBarShown = false;
var openbtn = document.getElementById('openbtn1')
openbtn.addEventListener('click', e => {
    e.preventDefault()
    SideBarShown = !SideBarShown;
    if (SideBarShown === true) {
        document.getElementById("mySideBar").style.width = "40%";
        document.body.style.backgroundColor = "rgba(0,0,0,0.2)";
        ShowCart()
    }

    else {
        document.getElementById("mySideBar").style.width = "0";
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';
    }
    //document.getElementById("main").style.marginLeft = "250px";

})
var Items = new Cart
if (sessionStorage.getItem("shoppingCart") != null) {
    Items.loadCart();


}
function ShowItem() {

}
function ShowCart() {

    var cartItems = document.getElementsByClassName("cart-items")

    if (Items.cart.length == 0) {
        document.getElementsByClassName("cart-item")
    }
    for (i = 0; i < Items.cart.length; ++i) {
        var cartItems = `<div class="cart-item"> 
            <a>${Items.cart[i].name}</a>
            <a>${Items.cart[i].price}</a>    
        </div> `
    }

}

