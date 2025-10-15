import { useState } from "react";
import { getProductByName } from "../../api";
import { deleteProduct } from "../../api";

function DeleteProductPanel() {
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [product, setProduct] = useState("");
    const [confirming, setConfirming] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = async () => {
        // Implement search logic here
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
            }
        } catch (error) {
            setMessage("Error searching for product");
        }
    }

    const handleDelete = async () => {
        try {
            await deleteProduct(product.id);
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
                    onClick={handleSearch}
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
