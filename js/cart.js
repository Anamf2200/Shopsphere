import { getCart,saveCart } from "./storage.js";
import { updateCartCount } from "./navbar.js";
const cart = getCart();

const tbody = document.getElementById("cartItems");

cart.forEach(item => {

 tbody.innerHTML += `
<tr>

<td>
<div class="d-flex align-items-center">
<img src="${item.image}" class="cart-product-img">

<div class="ms-3">
<h6>${item.name}</h6>
</div>

</div>
</td>

<td>$${item.price}</td>

<td class="text-center">

<div class="quantity-control justify-content-center">

<button
class="btn btn-outline-secondary btn-sm"
onclick="decrease(${item.id})">
-
</button>

<input
type="text"
value="${item.quantity}"
class="form-control quantity-input text-center"
readonly>

<button
class="btn btn-outline-secondary btn-sm"
onclick="increase(${item.id})">
+
</button>

</div>

</td>

<td class="fw-bold text-primary">
$${item.price * item.quantity}
</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="remove(${item.id})">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>
`;

});

const subtotal = cart.reduce(

    (total, item) =>

        total + item.price * item.quantity,

    0

);

const shipping = 20;

const tax = 50;

const grandTotal = subtotal + shipping + tax;

document.getElementById("subtotal").textContent = `$${subtotal}`;
document.getElementById("shipping").textContent = `$${shipping}`;
document.getElementById("tax").textContent = `$${tax}`;
document.getElementById("grandTotal").textContent = `$${grandTotal}`;

export function increase(id) {

    const cart = getCart();

    const product = cart.find(item => item.id === id);

    product.quantity++;

    saveCart(cart);

    location.reload();

}

export function decrease(id) {

    const cart = getCart();

    const product = cart.find(item => item.id === id);

    if (product.quantity > 1) {

        product.quantity--;

    }

    saveCart(cart);

    location.reload();

}
function remove(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);

    location.reload();

}
document.getElementById("checkout").addEventListener("click", () => {

    alert(" Your order has been placed successfully!");

    saveCart([]);
    updateCartCount();

    window.location.href = "index.html";
});

window.increase = increase;
window.decrease = decrease;
window.remove = remove;