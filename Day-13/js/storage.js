const STORAGE_KEY =
    "day13_products";


/* =====================================
   GET PRODUCTS
===================================== */

export const getProducts = (
    defaultProducts
) => {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (saved) {

        try {

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                "Storage error:",
                error
            );

        }

    }


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            defaultProducts
        )
    );


    return defaultProducts;

};


/* =====================================
   SAVE PRODUCTS
===================================== */

export const saveProducts = (
    products
) => {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );

};
