import { useState } from 'react'

export default function AdminPage() {
  const [movie, setMovie] = useState({
    id: "", title: "", poster: "", year: "", rating: "",
    category: "", stream1: "", stream2: "", download1: ""
  })

  const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value })

  const handleAdd = () => {
    // For now just show data. Later, connect to backend or manually copy.
    alert(JSON.stringify(movie, null, 2))
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
      {["id", "title", "poster", "year", "rating", "category", "stream1", "stream2", "download1"].map(field => (
        <input
          key={field}
          name={field}
          onChange={handleChange}
          placeholder={field}
          className="block w-full mb-3 px-3 py-2 border rounded"
        />
      ))}
      <button onClick={handleAdd} className="bg-black text-white px-4 py-2 rounded">Preview JSON</button>
    </div>
  )
}