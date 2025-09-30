import { useState } from 'react'
import Viewer from './components/Viewer'

function App() {
  const [filters, setFilters] = useState({
    search: '',
    min_price: '',
    max_price: '',
    ordering: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <>
      <main className="container mx-auto p-4 bg-slate-800 min-h-screen min-w-screen">
        <div className='p-4 flex gap-2'>
          <input type='text' name="search" value={filters.search} onChange={handleChange} placeholder="Product Name" className="p-2 rounded bg-white" />
          <input type='number' name="min_price" value={filters.min_price} onChange={handleChange} placeholder="Min Price" className="p-2 rounded bg-white" />
          <input type='number' name="max_price" value={filters.max_price} onChange={handleChange} placeholder="Max Price" className="p-2 rounded bg-white" />
          <select name="ordering" value={filters.ordering} onChange={handleChange} className="p-2 rounded bg-white">
            <option value="">Ordering By</option>
            <option value="-price">Price +</option>
            <option value="price">Price -</option>
          </select>
        </div>
        <Viewer filters={filters} />
      </main>
    </>
  )
}

export default App
