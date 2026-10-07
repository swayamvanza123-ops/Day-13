
import {
    defaultProducts
} from "./products.js";


import {
    getProducts,
    saveProducts
} from "./storage.js";


import {
    validateProductName,
    validateCategory,
    validatePrice,
    validateStock,
    validateDescription,
    formatPrice,
    getProductStatus
} from "./utils.js";



/* =====================================
   PRODUCTS
===================================== */

let products =
    getProducts(defaultProducts);



/* =====================================
   EDIT MODE
===================================== */

let editingProductId = null;



/* =====================================
   DOM
===================================== */

const productForm =
    document.getElementById(
        "productForm"
    );


const productName =
    document.getElementById(
        "productName"
    );


const productCategory =
    document.getElementById(
        "productCategory"
    );


const productPrice =
    document.getElementById(
        "productPrice"
    );


const productStock =
    document.getElementById(
        "productStock"
    );


const productDescription =
    document.getElementById(
        "productDescription"
    );


const resetButton =
    document.getElementById(
        "resetButton"
    );


const productGrid =
    document.getElementById(
        "productGrid"
    );


const productTitle =
    document.getElementById(
        "productTitle"
    );


const resultCount =
    document.getElementById(
        "resultCount"
    );


const submitButton =
    document.querySelector(
        ".add-button"
    );


const categoryButtons =
    document.querySelectorAll(
        ".category-card"
    );


const navItems =
    document.querySelectorAll(
        ".nav-item"
    );



/* =====================================
   ERRORS
===================================== */

const nameError =
    document.getElementById(
        "productNameError"
    );


const categoryError =
    document.getElementById(
        "productCategoryError"
    );


const priceError =
    document.getElementById(
        "productPriceError"
    );


const stockError =
    document.getElementById(
        "productStockError"
    );


const descriptionError =
    document.getElementById(
        "productDescriptionError"
    );



/* =====================================
   CLEAR ERRORS
===================================== */

const clearErrors = () => {

    nameError.textContent = "";

    categoryError.textContent = "";

    priceError.textContent = "";

    stockError.textContent = "";

    descriptionError.textContent = "";


    [
        productName,
        productCategory,
        productPrice,
        productStock,
        productDescription

    ].forEach(input => {

        input.classList.remove(
            "input-error"
        );

    });

};



/* =====================================
   VALIDATE FORM
===================================== */

const validateForm = () => {

    clearErrors();

    let valid = true;


    const nameMessage =
        validateProductName(
            productName.value
        );


    if (nameMessage) {

        nameError.textContent =
            nameMessage;

        productName.classList.add(
            "input-error"
        );

        valid = false;

    }


    const categoryMessage =
        validateCategory(
            productCategory.value
        );


    if (categoryMessage) {

        categoryError.textContent =
            categoryMessage;

        productCategory.classList.add(
            "input-error"
        );

        valid = false;

    }


    const priceMessage =
        validatePrice(
            productPrice.value
        );


    if (priceMessage) {

        priceError.textContent =
            priceMessage;

        productPrice.classList.add(
            "input-error"
        );

        valid = false;

    }


    const stockMessage =
        validateStock(
            productStock.value
        );


    if (stockMessage) {

        stockError.textContent =
            stockMessage;

        productStock.classList.add(
            "input-error"
        );

        valid = false;

    }


    const descriptionMessage =
        validateDescription(
            productDescription.value
        );


    if (descriptionMessage) {

        descriptionError.textContent =
            descriptionMessage;

        productDescription.classList.add(
            "input-error"
        );

        valid = false;

    }


    return valid;

};



/* =====================================
   DASHBOARD
===================================== */

const updateDashboard = () => {


    const totalProducts =
        products.length;


    const totalStock =
        products.reduce(
            (sum, product) => {

                return (
                    sum +
                    Number(
                        product.stock
                    )
                );

            },
            0
        );


    const lowStock =
        products.filter(
            product =>
                Number(
                    product.stock
                ) < 10
        ).length;


    const inventoryValue =
        products.reduce(
            (sum, product) => {

                return (
                    sum +
                    (
                        Number(
                            product.price
                        ) *
                        Number(
                            product.stock
                        )
                    )
                );

            },
            0
        );


    document.getElementById(
        "totalProducts"
    ).textContent =
        totalProducts;


    document.getElementById(
        "totalStock"
    ).textContent =
        totalStock;


    document.getElementById(
        "lowStock"
    ).textContent =
        lowStock;


    document.getElementById(
        "inventoryValue"
    ).textContent =
        formatPrice(
            inventoryValue
        );

};



/* =====================================
   CATEGORY COUNTS
===================================== */

const updateCategoryCounts = () => {


    const electronics =
        products.filter(
            product =>
                product.category ===
                "Electronics"
        ).length;


    const accessories =
        products.filter(
            product =>
                product.category ===
                "Accessories"
        ).length;


    const furniture =
        products.filter(
            product =>
                product.category ===
                "Furniture"
        ).length;


    document.getElementById(
        "allCount"
    ).textContent =
        `${products.length} Products`;


    document.getElementById(
        "electronicsCount"
    ).textContent =
        `${electronics} Products`;


    document.getElementById(
        "accessoriesCount"
    ).textContent =
        `${accessories} Products`;


    document.getElementById(
        "furnitureCount"
    ).textContent =
        `${furniture} Products`;

};



/* =====================================
   DISPLAY PRODUCTS
===================================== */

const displayProducts = (
    category = "All"
) => {


    let filteredProducts =
        products;


    if (category !== "All") {

        filteredProducts =
            products.filter(
                product =>
                    product.category ===
                    category
            );

    }


    productGrid.innerHTML = "";


    productTitle.textContent =
        category === "All"
            ? "All Products"
            : category;


    resultCount.textContent =
        `${filteredProducts.length} Products`;


    if (
        filteredProducts.length ===
        0
    ) {

        productGrid.innerHTML = `

            <div class="empty-state">

                <div>
                    📦
                </div>

                <h3>
                    No Products Found
                </h3>

                <p>
                    There are no products
                    in this category.
                </p>

            </div>

        `;

        return;

    }



    filteredProducts.forEach(
        product => {


            const status =
                getProductStatus(
                    Number(
                        product.stock
                    )
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product-card";


            card.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >


                <div
                    class="product-content">


                    <span
                        class="product-category">

                        ${product.category}

                    </span>


                    <h3
                        class="product-name">

                        ${product.name}

                    </h3>


                    <p
                        class="product-description">

                        ${product.description}

                    </p>


                    <span
                        class="status
                        ${status.className}">

                        ${status.text}

                    </span>


                    <div
                        class="product-bottom">


                        <span
                            class="product-price">

                            ${formatPrice(
                                product.price
                            )}

                        </span>


                        <span
                            class="product-stock">

                            Stock:
                            ${product.stock}

                        </span>


                    </div>


                    <div
                        class="product-actions">


                        <button
                            class="edit-button"
                            data-id="${product.id}">

                            ✏️ Edit

                        </button>


                        <button
                            class="delete-button"
                            data-id="${product.id}">

                            🗑️ Remove

                        </button>


                    </div>


                </div>

            `;


            productGrid.appendChild(
                card
            );

        }
    );


    addProductButtonEvents();

};



/* =====================================
   BUTTON EVENTS
===================================== */

const addProductButtonEvents = () => {


    const editButtons =
        document.querySelectorAll(
            ".edit-button"
        );


    const deleteButtons =
        document.querySelectorAll(
            ".delete-button"
        );


    editButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    editProduct(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        }
    );


    deleteButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    deleteProduct(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        }
    );

};



/* =====================================
   EDIT PRODUCT
===================================== */

const editProduct = (
    id
) => {


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        return;

    }


    editingProductId =
        id;


    productName.value =
        product.name;


    productCategory.value =
        product.category;


    productPrice.value =
        product.price;


    productStock.value =
        product.stock;


    productDescription.value =
        product.description;


    clearErrors();


    submitButton.innerHTML =
        "✏️ Update Product";


    submitButton.classList.add(
        "update-mode"
    );


    resetButton.textContent =
        "Cancel Edit";


    document
        .getElementById(
            "add-product"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

};



/* =====================================
   REMOVE PRODUCT
===================================== */

const deleteProduct = (
    id
) => {


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        return;

    }


    const confirmed =
        confirm(
            `Remove "${product.name}" from inventory?`
        );


    if (!confirmed) {

        return;

    }


    products =
        products.filter(
            item =>
                item.id !== id
        );


    saveProducts(
        products
    );


    updateDashboard();

    updateCategoryCounts();

    displayProducts(
        "All"
    );

};



/* =====================================
   RESET FORM
===================================== */

const resetForm = () => {


    productForm.reset();


    clearErrors();


    editingProductId =
        null;


    submitButton.innerHTML =
        "➕ Add Product";


    submitButton.classList.remove(
        "update-mode"
    );


    resetButton.textContent =
        "Reset";

};



/* =====================================
   ADD / UPDATE
===================================== */

productForm.addEventListener(
    "submit",
    event => {


        event.preventDefault();


        if (
            !validateForm()
        ) {

            return;

        }



        /* =============================
           UPDATE PRODUCT
        ============================= */

        if (
            editingProductId !==
            null
        ) {


            products =
                products.map(
                    product => {


                        if (
                            product.id ===
                            editingProductId
                        ) {


                            return {

                                ...product,

                                name:
                                    productName
                                        .value
                                        .trim(),

                                category:
                                    productCategory
                                        .value,

                                price:
                                    Number(
                                        productPrice
                                            .value
                                    ),

                                stock:
                                    Number(
                                        productStock
                                            .value
                                    ),

                                description:
                                    productDescription
                                        .value
                                        .trim()

                            };

                        }


                        return product;

                    }
                );


            saveProducts(
                products
            );


            updateDashboard();

            updateCategoryCounts();

            displayProducts(
                "All"
            );


            resetForm();


            alert(
                "Product updated successfully!"
            );


            return;

        }



        /* =============================
           NEW PRODUCT
        ============================= */

        const newProduct = {

            id:
                Date.now(),

            name:
                productName
                    .value
                    .trim(),

            category:
                productCategory
                    .value,

            price:
                Number(
                    productPrice
                        .value
                ),

            stock:
                Number(
                    productStock
                        .value
                ),

            description:
                productDescription
                    .value
                    .trim(),

            image:
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80"

        };


        products = [

            ...products,

            newProduct

        ];


        saveProducts(
            products
        );


        updateDashboard();

        updateCategoryCounts();

        displayProducts(
            "All"
        );


        resetForm();


        alert(
            "Product added successfully!"
        );

    }
);



/* =====================================
   RESET BUTTON
===================================== */

resetButton.addEventListener(
    "click",
    () => {

        resetForm();

    }
);



/* =====================================
   CATEGORY FILTER
===================================== */

categoryButtons.forEach(
    button => {


        button.addEventListener(
            "click",
            () => {


                categoryButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                displayProducts(
                    category
                );


                document
                    .getElementById(
                        "products"
                    )
                    .scrollIntoView({
                        behavior:
                            "smooth"
                    });

            }
        );

    }
);



/* =====================================
   SIDEBAR
===================================== */

navItems.forEach(
    item => {


        item.addEventListener(
            "click",
            () => {


                navItems.forEach(
                    nav => {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    }
);



/* =====================================
   INITIAL LOAD
===================================== */

updateDashboard();

updateCategoryCounts();

displayProducts(
    "All"
);
