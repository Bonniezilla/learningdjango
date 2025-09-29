import api from '../api';
import { useState, useEffect, use } from 'react';

function Viewer() {
    const [data, setData] = useState({ results: [], previous: null, next: null });
    const [url, setUrl] = useState('http://127.0.0.1:8000/products/');

    function parseUrl(url) {
        if (!url) return null;

        const parsed = new URL(url);
        return parsed.pathname.replace('/api/', '') + parsed.search;
    }

    function fetchData(url) {
        api.get(url)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }

    useEffect(() => {
        fetchData(parseUrl(url));
    }, [url]);

    return (
        <div className="flex flex-col">
            {data.results.map(product => (
                <div key={product.id} className="border p-4 m-2">
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-blue-500">${product.price}</p>
                </div>
            ))
            }
            <div className="flex">
                <button className='m-2 p-2 bg-blue-500 text-white rounded hover:cursor-pointer'
                    disabled={data.previous === null}
                    onClick={() => setUrl(data.previous)}>
                    Previous
                </button>
                <button className='m-2 p-2 bg-blue-500 text-white rounded hover:cursor-pointer'
                    disabled={data.next === null}
                    onClick={() => setUrl(data.next)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Viewer;