import { useState } from "react";
import { deleteProduct } from "../../api";
import { useSearchProduct } from "../../hooks/UseSearchProduct";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

function DeleteProductPanel() {
    const [search, setSearch] = useState("");
    const { product, message, loading, handleSearch, setProduct, setMessage, setLoading } = useSearchProduct();
    const [confirming, setConfirming] = useState(false);

    const { deleteProduct } = useContext(ProductsContext);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleDelete = async () => {
        try {
            await deleteProduct(product.id);
            deleteProduct(product.id);
            setMessage("Product deleted successfully");
            setProduct(null);
            setConfirming(false);
        } catch (error) {
            setMessage("Error deleting product");
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <input
                    placeholder="Product Name"
                    value={search}
                    nullable="false"
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 py-1 flex-grow"
                />
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blaft-500 transition-colors"
                    onClick={() => handleSearch(search)}
                >
                    Search
                </button>

                {product && !confirming && (
                    <div className="flex flex-col gap-2">
                        <p>
                            Found: <b>{product.name} - ${product.price}</b>
                        </p>
                        <button
                            onClick={() => setConfirming(true)}
                            className="bg-africanviolet text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                            Confirm delete
                        </button>
                    </div>
                )}

                {confirming && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors">
                            Yes, delete {product.name}
                        </button>
                        <button
                            onClick={() => setConfirming(false)}
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                            Cancel
                        </button>
                    </div>
                )}

                {message && <p className={message.includes("successfully") ? "text-green-500" : "text-red-500"}>{message}</p>}

            </div>
        </div>
    )
}

export default DeleteProductPanel;
