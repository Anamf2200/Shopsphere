import products from "./product.js"
import { getCart,saveCart } from "./storage.js"
import { updateCartCount } from "./navbar.js"

const params= new URLSearchParams(window.location.search)
const id= params.get("id")

const product= products.find(p=>p.id==id)
document.getElementById('product').innerHTML=`

 <div class="row align-items-center g-5">

                <!-- Product Image -->
                <div class="col-lg-6">

                    <div class="product-image-wrapper">

                        <img src="${product.image}" alt="iPhone 15 Pro" class="img-fluid product-detail-img">

                    </div>

                </div>

                <!-- Product Info -->
                <div class="col-lg-6">

                    <span class="badge bg-success mb-3">
                        In Stock
                    </span>

                    <h1 class="fw-bold mb-3">
                        ${product.name}
                    </h1>

                    <div class="rating mb-3">
                        ★★★★★
                        <span class="text-dark fs-6">
                            (125 Reviews)
                        </span>
                    </div>

                    <h2 class="product-price mb-4">
                        $${product.price}
                    </h2>

                    <p class="product-description">
                       ${product.description}
                    </p>

                    <!-- Quantity -->
                    <div class="mb-4">

                        <label class="form-label fw-semibold">
                            Quantity
                        </label>

                        <div class="quantity-box">

                            <button class="btn btn-outline-secondary" onclick="decreaseQuantity()">
                                -
                            </button>

                            <input type="text" class="form-control text-center quantity-input" value="1" id= "quantity">

                            <button class="btn btn-outline-secondary" onclick="increaseQuantity()">
                                +
                            </button>

                        </div>

                    </div>

                    <!-- Buttons -->
                    <div class="d-flex gap-3 flex-wrap">

                        <button id="addToCart" class="btn btn-primary btn-lg">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add To Cart
                        </button>

                        <a href="cart.html" class="btn btn-outline-primary btn-lg">
                            Buy Now
                        </a>

                    </div>

                </div>

            </div>`

            document.getElementById("addToCart").addEventListener("click", addToCart);
            updateCartCount()

            function addToCart() {

    const cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity+=quantity;
    } else {

        cart.push({
            ...product,
            quantity: quantity
        });

    }

    saveCart(cart);

    updateCartCount();

    alert("Added to cart!");
}
let quantity = 1;

window.increaseQuantity = function () {
    quantity++;
    document.getElementById("quantity").value = quantity;
}

window.decreaseQuantity = function () {
    if (quantity > 1) {
        quantity--;
    }
    document.getElementById("quantity").value = quantity;
}
