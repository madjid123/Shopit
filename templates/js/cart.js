class Cart {
    cart = []
    total = 0.0

    addElements() {
        this.loadCart()
        if (this.cart == null) this.cart = []
        if (this.cart.length != 0) {
            for (let i = 0; i < this.cart.length; ++i) {
                this.addCartElement(this.cart[i])
            }
        }
        this.UpdateTotal()
    }
    addItem(id, name, price, count, imgUrl) {

        this.cart.push({ id, name, price, count, imgUrl })
        this.addCartElement(this.cart[this.cart.length - 1])
        this.saveCart()
        this.UpdateTotal()
    }
    updateCount(id, count) {
        this.cart.map((n) => { if (id === n.id) n.count = count; })
        localStorage.removeItem('shoppingCart')
        this.saveCart()
        this.UpdateTotal()

    }
    saveCart() {
        localStorage.removeItem('shoppingCart')
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));

    }
    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('shoppingCart'));

    }
    addCartElement(elem) {
        var cartItems = document.getElementById('cart-id')
        var cartRow = document.createElement('div')
        cartRow.className = "cart-item"
        cartRow.id = 'cid'

        var cartContent = `<div data-id=${elem.id}>
            <img src="../images/products${elem.imgUrl}"  width='50px' height='50px'> 
            <a>${elem.name}</a>
            <a>${elem.price}$</a>
            <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" >
            <button class="btn btn-danger rm-but" type="button" id='rm'>REMOVE</button>
            </div>
        </div> `

        cartRow.innerHTML = cartContent
        cartItems.appendChild(cartRow)

        //this is a hack and should not be considered as a good practice.  
        var removeElementsBut = document.getElementsByClassName("rm-but")
        var removeElementBut = removeElementsBut[removeElementsBut.length - 1]
        removeElementBut.addEventListener('click', (e) => {
            e.preventDefault()
            var item = e.target.parentElement.parentElement
            var items = item.parentElement
            let id = item.dataset.id

            this.RemoveCartElement(id)
            items.removeChild(item)

            this.UpdateTotal()

        })

        var CountInputs = document.getElementsByClassName("cart-quantity-input")
        var CountInput = CountInputs[CountInputs.length - 1]
        CountInput.addEventListener('input', (e) => {
            var count = parseInt(e.target.value)

            console.log(count)
            this.updateCount(elem.id, count)
        })


    }
    AddToCart(row) {
        var isIn = false
        this.cart.map((n) => {
            if (row.ID === n.id) {
                isIn = true;
                alert("Item already exist in Cart")
                return;
            }
        })
        if (isIn === false)
            this.addItem(row.ID, row.NAME, row.PRICE, 1, row.ImgUrl)



    }
    RemoveCartElement(id) {
        const temp = this.cart.filter((el) => {

            return el.id != id;
        })

        this.cart = temp
        this.UpdateTotal()
        this.saveCart()
    }
    UpdateTotal() {
        this.total = 0.00;
        if (this.cart.length === 0) {

        } else
            this.cart.map((el) => {
                this.total += el.price * el.count
            })
        var total = document.getElementById('total')
        total.innerHTML = `Total : ${this.total}$`
    }

};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready()
}
var Items = new Cart()


function ready() {

    Items.addElements()
    var SideBarShown = false;
    var openbtn = document.getElementById('openbtn1')

    openbtn.addEventListener('click', e => {
        e.preventDefault()
        SideBarShown = !SideBarShown;
        if (SideBarShown === true) {
            document.getElementById("mySideBar").style.width = "40%";

            document.body.style.backgroundColor = "rgba(0,0,0,0.2)";

        }

        else {
            document.getElementById("mySideBar").style.width = "0";
            document.body.style.backgroundColor = 'rgb(238, 238, 238)';
        }
        //document.getElementById("main").style.marginLeft = "250px";

    })
    var addToCartBut = document.getElementById("AddToCar")
    if (addToCartBut !== null)
        addToCartBut.addEventListener('click', addCart)

    //var removeElementsBut = document.getElementsByClassName("rm-but")

    // for (let i = 0; i < removeElementsBut.length; i++) {

    // }


}

const addCart = (e) => {
    e.preventDefault()
    var addToCartBut = e.target
    var row = addToCartBut.dataset.id
    row = JSON.parse(row)
    Items.AddToCart(row);
}

window.addEventListener('close', (e) => {
    localStorage.removeItem('shoppingCart')
    localStorage.clear()
})




// function ShowCart() {



//     if (Items.cart.length === 0 && (!document.getElementById('cid'))) {
//         cartRow.innerHTML = "<a class='text-danger'> No element in card </a>"
//         cartItems.appendChild(cartRow)
//         return;
//     }
//     for (i = 0; i < Items.cart.length; ++i) {


//     }

// }

