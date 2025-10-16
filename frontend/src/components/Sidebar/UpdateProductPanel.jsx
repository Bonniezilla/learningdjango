import { useState } from 'react';
import { useSearchProduct } from '../../hooks/UseSearchProduct';
import { updateProduct } from '../../api';

function UpdateProductPanel() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
    });

    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState(false);
    const { product, message, loading, handleSearch, setProduct, setMessage, setLoading } = useSearchProduct();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await updateProduct(product.id, form);
            setMessage("Product updated successfully!");
            setForm({
                name: "",
                description: "",
                price: "",
            });
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage("Failed to update product. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <input
                    placeholder="Product Name"
                    className="border border-gray-300 rounded p-2 py-1 flex-grow"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={() => handleSearch(search)}
                    className="bg-africanviolet text-white px-4 py-2 rounded hover:bg-blaft-500 transition-colors"
                >
                    Search
                </button>

                {product && !updating && (
                    <div className="flex flex-col gap-2">
                        <p>
                            Found: <b>{product.name} - ${product.price}</b>
                        </p>
                        <button
                            className="bg-africanviolet text-white px-4 py-2 rounded hover:bg-blaft-500 transition-colors"
                            onClick={() => {
                                setForm({
                                    name: product.name,
                                    description: product.description,
                                    price: product.price
                                });
                                setUpdating(true);
                            }}
                        >
                            Edit Product
                        </button>
                    </div>
                )}

                {updating && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <input
                                name="name"
                                type="text"
                                placeholder="Product Name"
                                nullable="false"
                                className="p-2 rounded border border-gray-300"
                                value={form.name}
                                onChange={handleChange} />
                            <textarea
                                name="description"
                                className="p-2 rounded border border-gray-300"
                                rows={4}
                                onChange={handleChange}
                                value={form.description}
                                nullable="false"
                                placeholder="Product Description"
                            />
                            <input
                                name="price"
                                type="number"
                                placeholder="Product Price"
                                className="p-2 rounded border border-gray-300"
                                value={form.price}
                                nullable="false"
                                onChange={handleChange}
                                min={0}
                                step="0.01"
                            />
                            <button
                                type="submit"
                                onClick={() => setUpdating(true)}
                                className="bg-africanviolet text-white px-4 py-2 rounded hover:bg-blaft-500 transition-colors"
                            >
                                Confirm update
                            </button>
                            <button
                                onClick={() => setUpdating(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                            {message && <p className="text-green-500">{message}</p>}
                        </form>
                )}
            </div>
        </div>
    )
}

export default UpdateProductPanel;