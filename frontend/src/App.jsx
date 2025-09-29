import { useState } from 'react'
import Viewer from './components/Viewer'

function App() {
  const [filters, setFilters] = useState({
    name: '',
    min_price: '',
    max_price: '',
    sort: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <>
      <main className="container mx-auto p-4 bg-slate-800 min-h-screen min-w-screen">
        <div className='p-4'>
          <select name="sort" value={filters.sort} onChange={handleChange} className="p-2 rounded bg-white">
            <option value="">Sort By</option>
            <option value="-price">Price -</option>
            <option value="price">Price +</option>
          </select>
        </div>
        <Viewer filters={filters} />
      </main>
    </>
  )
}

export default App
