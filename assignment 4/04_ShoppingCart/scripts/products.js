fetch("https://fakestoreapi.com/products")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        const table = document.getElementById("productTable");

        products.forEach(function(product) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <a href="details.html?id=${product.id}">
                        ${product.title}
                    </a>
                </td>
                <td>$${product.price}</td>
            `;

            table.appendChild(row);
        });
    })
    .catch(function() {
        document.getElementById("productTable").innerHTML = `
            <tr>
                <td colspan="2">Could not load products.</td>
            </tr>
        `;
    });
