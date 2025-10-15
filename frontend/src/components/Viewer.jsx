import { useState, useEffect } from 'react';
import { getProducts } from '../services/products';
import { motion } from 'motion/react';

function Viewer({ filters, addToCart }) {
    const [products, setProducts] = useState([]);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url) => {
        try {
            setLoading(true);
            const result = await getProducts(filters, url);
            setProducts(result.data.results || []);
            setNext(result.data.next);
            setPrevious(result.data.previous);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    function parseUrl(url) {
        if (!url) return null;
        const parsed = new URL(url);
        return parsed.pathname.replace('/api', '') + parsed.search;
    }

    useEffect(() => {
        fetchData("/products/");
    }, [filters]);

    if (loading) return (
        <h1 className='text-white font-bold text-9xl'>Loading</h1>
    );

    return (
        <div className="flex flex-col bg-antiflash rounded w-full flex-1 min-h-0 p-4">
            <div className='flex flex-col w-full h-full p-2 min-h-0 overflow-y-auto custom-scrollbar gap-2'>
                {products.length > 0 ? (
                    products.map(product => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true}}
                            key={product.id}
                            className="border p-4 bg-white shadow-2xl rounded flex flex-col">
                            <h2 className="text-3xl font-bold">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-steelblue text-2xl">${product.price}</p>
                            <button
                                onClick={() => addToCart(product)}
                                className='p-2 bg-blaft-500 text-white rounded hover:cursor-pointer hover:bg-blaft-700 hover:text-jonquill duration-200 self-end shadow-2xl'
                            >
                                Add to cart
                            </button>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-3xl font-bold">No products found.</p>
                )
                }
            </div>
            <div className='flex gap-2 py-2 w-full'>
                <button className='bg-blaft-500 rounded p-2 text-white hover:cursor-pointer disabled:opacity-50 hover:bg-blaft-700 hover:text-jonquill shadow-2xl' onClick={() => fetchData(parseUrl(previous))} disabled={!previous}>
                    Previous
                </button>
                <button className='bg-blaft-500 rounded p-2 text-white hover:cursor-pointer disabled:opacity-50 hover:bg-blaft-700 hover:text-jonquill shadow-2xl' onClick={() => fetchData(parseUrl(next))} disabled={!next} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Viewer;