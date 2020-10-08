class Cart {
    cart = []
    Item(name, price, count, description) {
        this.name = name
        this.price = price
        this.description = description
        this.count = count
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

var addToCart = document.getElementById("prct")
console.log(addToCart)
addToCart.addEventListener('submit', e => {
    console.log(addToCart)
    addToCart
    e.preventDefault()
    var product = addToCart.getRootNode()

})