# JavaScript Tutorial: Building a Simple Shopping Cart

## Overview

In this lab, you will build a **small shopping cart web application using JavaScript**.

By the end of the session, your app will allow users to:

- Load a Product list from an API
- View Product details
- Add Products to a Shopping Cart
- Modify quantities
- Remove items
- Persist the cart using Local Storage

You will learn about the following JavaScript topics:

- DOM manipulation
- Fetch API
- Events
- URL parameters
- Local Storage
- Basic state management

---

# Step 1. Project Structure

Create the following project structure:

04_ShoppingCart folder. It has 5 elements:
- index.html
- details.html
- cart.html
- css folder: 
    - styles.css
- scripts folder:
    - products.js
    - details.js
    - cart.js


---

# Step 2 — Base HTML Page and CSS stylesheet

Let's start with the code for `index.html`. This page will display a **list of products**.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Product Store</title>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>

<h1>Product Store</h1>

<nav>
    <a href="cart.html">View Cart</a>
</nav>

<table border="1">
    <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
    </thead>

    <tbody id="productTable">
    </tbody>
</table>

<script src="scripts/products.js"></script>

</body>
</html>
```

Please note the Table Body HTML element (`<tbody>`). It encapsulates a set of table rows, thus **this is where products will be inserted dynamically** using JavaScript.

Also, add the following code in the `styles.css` file:

```css
/* Basic page styling */
body {
    font-family: Arial, Helvetica, sans-serif;
    max-width: 900px;
    margin: 40px auto;
    padding: 0 20px;
    background: #f7f7f7;
}

/* Titles */
h1, h2 {
    color: #333;
}

/* Navigation */
nav {
    margin-bottom: 20px;
}

nav a {
    text-decoration: none;
    color: white;
    background: #0077cc;
    padding: 8px 14px;
    border-radius: 4px;
}

nav a:hover {
    background: #005fa3;
}

/* Tables */
table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

th, td {
    padding: 10px;
    text-align: left;
}

th {
    background: #eeeeee;
}

tr:nth-child(even) {
    background: #f9f9f9;
}

/* Links */
a {
    color: #0077cc;
}

a:hover {
    text-decoration: underline;
}

/* Inputs */
input[type="number"] {
    width: 60px;
    padding: 4px;
}

/* Buttons */
button {
    padding: 6px 12px;
    border: none;
    background: #28a745;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background: #218838;
}

/* Remove button */
button.remove {
    background: #dc3545;
}

button.remove:hover {
    background: #b02a37;
}

/* Product details box */
#productDetails {
    background: white;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 20px;
}
```

# Step 3 - Fetch Products from an API

We will load products using the [Fake Store API](https://fakestoreapi.com/) and the `fetch` JavaScript function

## What is Fetch?

`fetch` is used to request data from a server. Here is a basic structure that is typically used:

```javascript
fetch(url)
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
```

| Part            | Meaning                                  |
| --------------- | ---------------------------------------- |
| fetch()         | sends HTTP request                       |
| response.json() | converts response into JavaScript object |
| then()          | handles async result                     |

## Your task:

Using `products.js` and the sample code from [Fake Store API - Get All Products documentation](https://fakestoreapi.com/docs#tag/Products/operation/getAllProducts), retrieve the products from this service using the `fetch` JS function and load/populate the HTML table from the previous task.

Below you can find code to create rows dynamically:

```javascript
    const table = document.getElementById("productTable");

    products.forEach(product => {

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
```

* `getElementById`: get an object reference to the specified HTML element
* `forEach`: iterate over a collection
* `createElement`: add a new HTML element dynamically using the DOM and `innerHTML` element.
* `const`: declare a JS constant
* `$`: placeholder - print the value of a JS variable/property

After completing the code, test the `index.html` page to observe the following:

* Product data is fetched from the URL
* Products are looped through 
* Rows are created dynamically in the table
* A link is added to the product details page (example: `details.html?id=3`)

Save all your work and naviage to the `index.html` page to display all products.

This is the result:

<img width="2032" height="1100" alt="image" src="https://github.com/user-attachments/assets/973f0dbf-1295-4bc5-a823-4692681c538f" />


# Step 4 - Prepare the Product details page

## Your task:

Using `details.html`, add the required HTML code that includes the following elements:

* A reference to the `styles` stylesheet
* A Level 1 Header: `Product Details` (set it for the page title as well)
* A hyperlink to get back to the `Index` page.
* A div with ID `productDetails`. It is empty, for the moment.
* A text: `Quantity`
* An input field for numeric values with ID `quantity` and minimum value `1`
* A button with text `Add to cart` and ID `addtoCartBtn`
* A script that references the `details.js` script 

Use the following image for reference:

<img width="1184" height="658" alt="image" src="https://github.com/user-attachments/assets/39f05ae1-5d19-4eef-8da3-3b8031917b0c" />



# Step 5 - Fetch the Product details 

When the user navigates to the Product details page, an `id` parameter is passed in the URL: `details.html?id=3`. We need to read the value.

The `get()` method of the `URLSearchParams` interface returns the first value associated to the given search parameter. Read more about it and get sample code [here](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get).

## Your task:

In the `details.js` script, add the code to read the value of `id` parameter. Store it in a `productId` constant.

-----

The Fake Store API allows loading a single product. For example to retrieve the information for Product with ID 3, you can use the following URL `https://fakestoreapi.com/products/3`.

## Your task

In the same `details.js` script: 

* Use the `fetch` function to get the details of the `productId` product. 
* Once you get the JSON object with the product information, get a reference to the div with ID `productDetails`.
* Set the `innerHTML` of the div to add 3 elements dynamically: 
    - A level 2 heading with the product title.
    - A paragraph with the product description.
    - A paragraph with the product price. 
* Store the title and price in JavaScript variables. They will be used in the next step.

Start by adding the following code below the definition of `productId`. 

```javascript
//...

const url = `https://fakestoreapi.com/products/${productId}`; 

// code for the requirements
fetch(url)
.then(...)
// ...
```

Save all your work and test the functionality. Navigate to a specific product to display its details.

Here is the result:

<img width="1864" height="964" alt="image" src="https://github.com/user-attachments/assets/08814c9a-aa2d-459c-b3cd-74afd17f99a2" />



# Step 6 - Add to Cart

Now we will add the product to a shopping cart stored in **Local Storage**. Local storage stores data in the browser using a key-value pair structure. For example:

| Key  | Value                                               |
| ---- | -------------------------------------------------   |
| cart | "[ { 'id': 1, 'qty': 6 }, { 'id': 8, 'qty': 6 } ]"  |

## Reading from Local Storage:

```
let cart = JSON.parse(localStorage.getItem("cart")) || [];
```

Explanation:

| Function             | Purpose  | 
| -------------------- | -------------------------- | 
| localStorage.getItem | retrieves stored data      |
| JSON.parse           | converts text into object  |
| []                   | fallback if nothing exists |

## Your task

If the user clicks on the `addtoCartBtn` button, we will add the product and quantity to the `cart` variable. 

The following code is added in `details.js`. Complete the `TODO` elements:

```javascript
document.getElementById("addToCartBtn").addEventListener("click", () => {
    const qty = document.getElementById("quantity").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // TODO:
    // create a JSON object representing the product
    // add id, title, price, qty

    // example structure
    // {
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   qty: qty
    // }

    // TODO:
    // push the item into the cart array

    // TODO:
    // save the cart into local storage

    // TODO:
    // notify the user of successful operation using an alert

});
```

Some help:

## Adding an element to an array:

```javascript
array.push(item);
```

Read more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push).

## Saving to local storage:

```javascript
localStorage.setItem("cart", JSON.stringify(cart));
```

Here is the result:

<img width="1504" height="974" alt="image" src="https://github.com/user-attachments/assets/48656e7e-cf3d-4e0e-9682-a83542a7b874" />

Also, explore the local storage to check if the product was stored there using the **Browser Dev Tools**

<img width="2690" height="984" alt="image" src="https://github.com/user-attachments/assets/3bee89bc-2887-479a-a8ff-c1087a393fbf" />

Add two more products to the cart.

<img width="2840" height="1298" alt="image" src="https://github.com/user-attachments/assets/2fba4c39-c78a-49e8-ae08-aa655a16b6ef" />


# Step 7 - Create the Cart Page

Add the following code in `cart.html`:

```html
<!DOCTYPE html>
<html>

<head>
<title>Your Cart</title>
<link rel="stylesheet" href="css/styles.css">
</head>

<body>

<h1>Shopping Cart</h1>

<a href="index.html">Continue Shopping</a>

<table border="1">
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>SubTotal</th>
            <th>Remove</th>
        </tr>
    </thead>

    <tbody id="cartTable"></tbody>
</table>

<p id="total"></p>

<script src="scripts/cart.js"></script>

</body>

</html>
```

<img width="1864" height="486" alt="image" src="https://github.com/user-attachments/assets/ef15aefd-369e-4666-8a07-25930b466386" />


# Step 8 - Load Cart using Local Storage

## Your task

Use `cart.js` to add code that:

* gets a reference to `cartTable` table body element in `cart.html`
* reads the shopping cart from local storage
* iterates over each product in the shopping cart using a `tuple` with the `index`. Use: 
    - `cart.forEach((product, index) => {`
* for each product/index element in the above tuple:
    - create a table row using `createElement`
    - Using `innerHTML`, add 5 cells to the table row:
        - one for the product title 
        - another one for the product price
        - add an input element for numeric values with the product quantity as value and set the `data-index` to the current `index` value
        - calculate the subtotal using the price and quantity
        - add a button for removing the element. Use `data-index` with the current `index` value.
    - Use `appendChild` to add the row to the table

Here's the result:

<img width="1864" height="726" alt="image" src="https://github.com/user-attachments/assets/3b8b499a-e434-4929-adc9-70dfacf666c3" />


# Step 9 - Remove Items

Add the following code in `cart.js` to remove a specific product from the cart when the user clicks on a `Remove` button:

```javascript
document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", event => {

        const index = event.target.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});
```

`array.splice(index, n)` allows you to remove `n` elements starting from the specified `index`.

| Code            | Meaning                    |
| --------------- | -------------------------- |
| dataset.index   | reads data-index attribute |
| splice(index,1) | removes 1 item             |
| setItem         | saves updated cart         |
| reload          | refreshes the page               |

Save all your work and test the cart functionality.

<img width="1864" height="726" alt="image" src="https://github.com/user-attachments/assets/1c949d29-63ba-4a56-b522-d24b19e2e298" />


# Step 10 - Update Quantity

Add the following code in `cart.js` to update the quantity of a specific product when the user modifies it:

```javascript
document.querySelectorAll("input[type='number']").forEach(input => {

    input.addEventListener("change", event => {

        const index = event.target.dataset.index;

        const newQty = Number(event.target.value);

        cart[index].qty = newQty;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});
```

Save all your work and test the cart functionality.

<img width="1864" height="708" alt="image" src="https://github.com/user-attachments/assets/8863f284-feeb-46c7-84a1-123f419ccd82" />

Also, observe that the value of the `cart` in local storage is updated:

<img width="2370" height="362" alt="image" src="https://github.com/user-attachments/assets/d5dcdc58-5587-421d-b9b4-3e27238b762d" />


# Assignments - 
1. Calculate the Total amount
2. Display product images

## Your task

Add code in `cart.js` to compute the total price. Recommendation: use a function, and call it in the following events in order to update the total value:

- after the cart is loaded
- when the user modifies a quantity
- when an item is removed

Save all your work and test the new functionality.

Also, display the product image when the user navigates to a specific product in `details.html`. You need to add code in `details.js`.

