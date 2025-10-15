import { useState } from "react";
import { createProduct } from "../../api";

function CreateProductPanel() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await createProduct(form);
            setMessage("Product created successfully!");
            setForm({
                name: "",
                description: "",
                price: "",
            });
        } catch (error) {
            console.error("Error creating product:", error);
            setMessage("Failed to create product. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                name="name" 
                type="text"
                placeholder="Product Name"
                nullable="false"
                className="p-2 rounded border border-gray-300"
                value={form.name} 
                onChange={handleChange}/>
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
                className="p-2 w-full bg-blaft-500 text-white rounded hover:cursor-pointer hover:bg-blaft-700 hover:text-jonquill duration-200 shadow-2xl"
                disabled={loading} 
                >
                {loading ? "Creating..." : "Create Product"}
            </button>
            {message && <p className="text-green-500">{message}</p>}
        </form>
    )
}

export default CreateProductPanel;