/* =====================================
   PRODUCT NAME
===================================== */

export const validateProductName = (
    name
) => {

    if (!name.trim()) {

        return "Product name is required.";

    }


    if (name.trim().length < 3) {

        return
            "Product name must contain at least 3 characters.";

    }


    return "";

};


/* =====================================
   CATEGORY
===================================== */

export const validateCategory = (
    category
) => {

    if (!category) {

        return "Please select a category.";

    }


    return "";

};


/* =====================================
   PRICE
===================================== */

export const validatePrice = (
    price
) => {

    if (price === "") {

        return "Price is required.";

    }


    if (Number(price) <= 0) {

        return "Price must be greater than 0.";

    }


    return "";

};


/* =====================================
   STOCK
===================================== */

export const validateStock = (
    stock
) => {

    if (stock === "") {

        return "Stock is required.";

    }


    if (Number(stock) < 0) {

        return "Stock cannot be negative.";

    }


    return "";

};


/* =====================================
   DESCRIPTION
===================================== */

export const validateDescription = (
    description
) => {

    if (!description.trim()) {

        return "Description is required.";

    }


    if (description.trim().length < 10) {

        return
            "Description must contain at least 10 characters.";

    }


    return "";

};


/* =====================================
   FORMAT PRICE
===================================== */

export const formatPrice = (
    price
) => {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(price);

};


/* =====================================
   PRODUCT STATUS
===================================== */

export const getProductStatus = (
    stock
) => {

    if (stock === 0) {

        return {
            text: "Out of Stock",
            className: "out"
        };

    }


    if (stock < 10) {

        return {
            text: "Low Stock",
            className: "low"
        };

    }


    return {
        text: "Available",
        className: "available"
    };

};
