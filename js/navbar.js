import { getCart } from "./storage.js";

export function updateCartCount() {

    const cart = getCart();

    const total = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    const badge = document.getElementById("cartCount");

    if (badge) {
        badge.textContent = total;
    }
}


updateCartCount();