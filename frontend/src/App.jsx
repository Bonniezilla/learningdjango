import { useState } from 'react';
import Viewer from './components/Viewer';
import Cart from './components/Cart';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [filters, setFilters] = useState({
    search: '',
    min_price: '',
    max_price: '',
    ordering: ''
  });
  const [cart, setCart] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ?
            { ...item, amount: item.amount + 1 } : item
        );
      } else {
        return [...prev, { ...product, amount: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  }

  const updateAmount = (productId, newAmount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, amount: newAmount } : item
      ));
  }

  return (
    <>
      <main className="container p-4 px-64 bg-blaft-600 h-screen min-w-screen grid grid-cols-[1fr] sm:p-8 md:grid-cols-[minmax(200px,300px)_repeat(2,minmax(300px,600px))] grid-rows-1 gap-2 justify-center">
        <div className="flex text-white border-4 border-white justify-center items-center">
          <Sidebar />
        </div>
        <div className='flex flex-col gap-2 h-full w-full'>
          <div className='flex gap-2 w-full'>
            <input type='text' name="search" value={filters.search} onChange={handleChange} placeholder="Product Name" className="p-2 rounded bg-white w-full" />
            <input type='number' name="min_price" value={filters.min_price} onChange={handleChange} placeholder="Min Price" className="p-2 rounded bg-white w-full" min={0}/>
            <input type='number' name="max_price" value={filters.max_price} onChange={handleChange} placeholder="Max Price" className="p-2 rounded bg-white w-full" min={0}/>
            <select name="ordering" value={filters.ordering} onChange={handleChange} className="p-2 rounded bg-white w-full">
              <option value="">Ordering By</option>
              <option value="-price">Price +</option>
              <option value="price">Price -</option>
              <option value="-created_at">Most Recent</option>
              <option value="created_at">Older</option>
            </select>
          </div>
          <Viewer filters={filters} addToCart={addToCart} />
        </div>
        <Cart cart={cart} removeFromCart={removeFromCart} updateAmount={updateAmount} />
      </main>
    </>
  )
}

export default App
