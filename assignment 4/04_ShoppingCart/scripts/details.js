const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const url = `https://fakestoreapi.com/products/${productId}`;

let productTitle = "";
let productPrice = 0;
const addToCartButton = document.getElementById("addToCartBtn") || document.getElementById("addtoCartBtn");

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(product) {
        const productDetails = document.getElementById("productDetails");

        productTitle = product.title;
        productPrice = product.price;

        productDetails.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
        `;

        addToCartButton.addEventListener("click", function() {
            let qty = Number(document.getElementById("quantity").value);

            if (qty < 1) {
                qty = 1;
                document.getElementById("quantity").value = 1;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const item = {
                id: product.id,
                title: productTitle,
                price: productPrice,
                qty: qty
            };

            cart.push(item);

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart.");
        });
    })
    .catch(function() {
        document.getElementById("productDetails").innerHTML = "<p>Could not load product details.</p>";
    });
