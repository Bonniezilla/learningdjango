import { createContext, useEffect, useState } from "react";
export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);

    const setProductsList = (newProducts) => setProducts(newProducts);

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <ProductsContext.Provider value={{ products, setProductsList, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}