import { useState } from "react";
import { getProductByName } from "../api";

export function useSearchProduct() {
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (search) => {
            setMessage("");
            try {
                const data = await getProductByName(search)
                if (data.results && data.results.length > 0) {
                    const found = data.results[0];
                    setProduct(found);
                    console.log(found);
                } else {
                    setProduct(null);
                    setMessage("No product found");
                    console.log("No product found");
                }
            } catch (error) {
                setMessage("Error searching for product");
            } finally {
                setLoading(false);
            }
        }
        return { product, message, loading, handleSearch, setMessage, setProduct, setLoading };
}