const cartTable = document.getElementById("cartTable");
const totalText = document.getElementById("total");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateTotal() {
    let total = 0;

    cart.forEach(function(product) {
        total = total + (product.price * product.qty);
    });

    totalText.textContent = "Total: $" + total.toFixed(2);
}

cart.forEach(function(product, index) {
    const row = document.createElement("tr");
    const subtotal = product.price * product.qty;

    row.innerHTML = `
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td>
            <input type="number" min="1" value="${product.qty}" data-index="${index}">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
            <button class="remove" data-index="${index}">Remove</button>
        </td>
    `;

    cartTable.appendChild(row);
});

updateTotal();

document.querySelectorAll("button").forEach(function(button) {
    button.addEventListener("click", function(event) {
        const index = event.target.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateTotal();
        location.reload();
    });
});

document.querySelectorAll("input[type='number']").forEach(function(input) {
    input.addEventListener("change", function(event) {
        const index = event.target.dataset.index;
        const newQty = Number(event.target.value);

        cart[index].qty = newQty;

        localStorage.setItem("cart", JSON.stringify(cart));

        updateTotal();
        location.reload();
    });
});
