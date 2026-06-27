import products from "./product.js";

const container = document.getElementById("productContainer");

function displayProducts(productList) {

    container.innerHTML = "";

    productList.forEach(product => {

        container.innerHTML += `
        <div class="col-md-6 col-xl-4">

            <div class="card product-card h-100">

                <img src="${product.image}" class="card-img-top">

                <div class="card-body">

                    <h5>${product.name}</h5>

                    <div class="rating mb-2">
                        ★★★★☆
                    </div>

                    <h4 class="price">
                        $${product.price}
                    </h4>

                    <a href="product-details.html?id=${product.id}"
                       class="btn btn-primary w-100">

                        View Details

                    </a>

                </div>

            </div>

        </div>
        `;

    });

}
displayProducts(products);
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)

    );

    displayProducts(filteredProducts);

});

const filterLinks = document.querySelectorAll(".filter-link");

filterLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const category = this.dataset.category;

        if (category === "All Products") {

            displayProducts(products);

        } else {

            const filtered = products.filter(product =>

                product.category === category

            );

            displayProducts(filtered);

        }

    });

});