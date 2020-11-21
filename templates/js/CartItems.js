class Cart {
    cart = []
    addItem(name, price, count, description) {

        this.cart.push({ name, price, count, description })
    }
    saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }


};

var Items = new Cart()
if (sessionStorage.getItem("shoppingCart") != null) {
    Cart.loadCart();
}

function addToCart(row) {

}
console.log(addToCart)
addToCart.addEventListener('submit', e => {
    console.log(addToCart)
    addToCart
    e.preventDefault()
    var product = addToCart.getRootNode()

})