console.log("Admin Loaded");

let allProducts = [];

// Load Products
async function loadProducts() {

    const response =
    await fetch("http://localhost:5000/products");

    allProducts =
    await response.json();

    document.getElementById(
        "totalProducts"
    ).innerText = allProducts.length;

    renderProducts(allProducts);
}

// Render Products
function renderProducts(products){

    let html = "";

    products.forEach(product => {

        html += `
        <tr>

            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>₹${product.price}</td>

            <td>${product.category}</td>

            <td>

                <button
                class="edit-btn"
                onclick="editProduct(
                ${product.id},
                '${product.name}',
                '${product.price}',
                '${product.image}',
                '${product.category}',
                '${product.description}'
                )">
                Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteProduct(${product.id})">
                Delete
                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById(
        "productTable"
    ).innerHTML = html;
}

// Search
function searchProduct(){

    const search =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    const filtered =
    allProducts.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    renderProducts(filtered);
}

// Add Product
async function addProduct(){

    const name =
    document.getElementById("name").value;

    const price =
    document.getElementById("price").value;

    const image =
    document.getElementById("image").value;

    const category =
    document.getElementById("category").value;

    const description =
    document.getElementById("description").value;

    const response =
    await fetch(
        "http://localhost:5000/products",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                price,
                image,
                category,
                description
            })
        }
    );

    const data =
    await response.json();

    alert(data.message);

    loadProducts();
}

// Edit Product
function editProduct(
id,
name,
price,
image,
category,
description
){

    document.getElementById("name").value =
    name;

    document.getElementById("price").value =
    price;

    document.getElementById("image").value =
    image;

    document.getElementById("category").value =
    category;

    document.getElementById("description").value =
    description;

    document.getElementById(
        "updateBtn"
    ).setAttribute(
        "data-id",
        id
    );
}

// Update Product
async function updateProduct(){

    const id =
    document.getElementById("updateBtn")
    .getAttribute("data-id");

    if(!id){
        alert("Select Product First");
        return;
    }

    const response =
    await fetch(
        `http://localhost:5000/products/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:document.getElementById("name").value,
                price:document.getElementById("price").value,
                image:document.getElementById("image").value,
                category:document.getElementById("category").value,
                description:document.getElementById("description").value
            })
        }
    );

    const data =
    await response.json();

    alert(data.message);

    loadProducts();
}

// Delete
async function deleteProduct(id){

    if(!confirm("Delete Product?"))
    return;

    await fetch(
        `http://localhost:5000/products/${id}`,
        {
            method:"DELETE"
        }
    );

    loadProducts();
}

// Logout
function logout(){

    localStorage.clear();

    alert("Logged Out");

    window.location.href =
    "login.html";
}

loadProducts();