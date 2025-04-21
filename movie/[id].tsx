import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MoviePage() {
  const { query } = useRouter()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch('/data/links.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(m => m.id === query.id)
        setMovie(found)
      })
  }, [query.id])

  if (!movie) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4">
      <img src={movie.poster} className="rounded w-full max-w-sm mx-auto" />
      <h1 className="text-2xl font-bold mt-4 text-center">{movie.title}</h1>
      <p className="text-center text-gray-600">{movie.year} • ⭐ {movie.rating}</p>

      <div className="mt-6 flex flex-col gap-3 items-center">
        <a href={movie.servers.stream1} className="bg-blue-600 text-white px-4 py-2 rounded w-48 text-center">Watch Server 1</a>
        <a href={movie.servers.stream2} className="bg-green-600 text-white px-4 py-2 rounded w-48 text-center">Watch Server 2</a>
        <a href={movie.servers.download1} className="bg-red-600 text-white px-4 py-2 rounded w-48 text-center">Download</a>
      </div>
    </div>
  )
}
