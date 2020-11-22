class Cart {
    cart = []
    addItem(id, name, price, count, imgUrl) {

        this.cart.push({ id, name, price, count, imgUrl })
        this.saveCart()
    }
    updateCount(itemName, count) {
        this.cart.map((n) => { if (itemName === n.name) n.count = count; })
        sessionStorage.removeItem('shoppingCart')
        this.saveCart()

    }
    saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(this.cart));

    }
    loadCart() {
        this.cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }

};
var Items = new Cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', Items.loadCart)
} else {
    Items.loadCart()
}


function AddToCart(row) {
    Items.cart.map((n) => {
        if (row.ID === n.id) {
            alert("Item already exist in Cart")
            return;
        }
    })
    Items.addItem(row.NAME, row.PRICE, 0, row.ImgUrl)

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


function ShowCart() {

    var cartItems = document.getElementById('cart-id')
    var cartRow = document.createElement('div')
    cartRow.className = "cart-item"
    cartRow.id = 'cid'

    if (Items.cart.length === 0 && (!document.getElementById('cid'))) {
        cartRow.innerHTML = "<a class='text-danger'> No element in card </a>"
        cartItems.appendChild(cartRow)
        return;
    }
    for (i = 0; i < Items.cart.length; ++i) {
        var cartContent = `<div > 
            <a>${Items.cart[i].name}</a>
            <a>${Items.cart[i].price}</a>
            <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div> `

        cartRow.innerHTML = cartContent
        cartItems.appendChild(cartRow)

    }

}

