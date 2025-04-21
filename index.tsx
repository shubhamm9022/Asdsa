// pages/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  useEffect(() => {
    fetch('/data/links.json')
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  const filteredMovies = movies.filter(movie =>
    (category === "All" || movie.category === category) &&
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Head><title>MoviesVault</title></Head>
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <img src="/logo.png" className="h-10" alt="Logo" />
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-gray-800 text-white px-3 py-2 rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      <div className="flex justify-center gap-2 p-4 flex-wrap">
        {["All", "Hollywood", "Bollywood", "South"].map(cat => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              category === cat ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {filteredMovies.map(movie => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className="bg-white rounded shadow hover:scale-105 transition">
            <img src={movie.poster} className="rounded-t w-full h-56 object-cover" />
            <div className="p-2">
              <h2 className="font-bold text-sm">{movie.title}</h2>
              <p className="text-xs text-gray-600">{movie.year} • ⭐ {movie.rating}</p>
            </div>
          </Link>
        ))}
      </main>
    </>
  )
}