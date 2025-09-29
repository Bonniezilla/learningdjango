import { useState, useEffect } from 'react';
import { getProducts } from '../services/products';

function Viewer({ filters }) {
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

    if (loading) return <h1 className='text-white font-bold text-9xl'>Loading</h1>;

    return (
        <div className="flex flex-col">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.id} className="border p-4 m-2 bg-white rounded w-1/3">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-blue-500">${product.price}</p>
                    </div>
                ))
            ) : (
                <p className="text-white font-bold">No products found.</p>
            )
            }
            <div className='flex gap-2'>
                <button className='bg-white rounded p-2 text-blue-500 hover:cursor-pointer' onClick={() => fetchData(parseUrl(previous))} disabled={!previous}>
                    Previous
                </button>
                <button className='bg-white rounded p-2 text-blue-500 hover:cursor-pointer' onClick={() => fetchData(parseUrl(next))} disabled={!next} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Viewer;