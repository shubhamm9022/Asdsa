// File: pages/movie/[id].tsx

import { useRouter } from 'next/router'; import { useEffect, useState } from 'react'; import Link from 'next/link'; import movieLinks from '../../data/links.json';

const MoviePage = () => { const router = useRouter(); const { id } = router.query; const [movie, setMovie] = useState(null); const [links, setLinks] = useState(null);

useEffect(() => { if (!id) return;

const fetchMovie = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`);
  const data = await res.json();
  setMovie(data);

  const movieLink = movieLinks.find((entry) => entry.id === id || entry.id === parseInt(id));
  setLinks(movieLink);
};

fetchMovie();

}, [id]);

if (!movie) return <div className="text-white text-center mt-10">Loading...</div>;

return ( <div className="bg-black text-white min-h-screen p-4"> <Link href="/" className="text-blue-400">← Back</Link> <div className="flex flex-col md:flex-row gap-6 mt-6"> <img src={https://image.tmdb.org/t/p/w500${movie.poster_path}} className="w-full md:w-1/3 rounded-lg" alt={movie.title} /> <div className="flex flex-col gap-2"> <h1 className="text-3xl font-bold">{movie.title}</h1> <p className="text-gray-400">{movie.overview}</p> <p className="text-sm">Release: {movie.release_date} | Rating: ⭐ {movie.vote_average}</p>

{links ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Watch / Download</h2>
          {links.streamLinks.map((link, i) => (
            <a key={i} href={link} target="_blank" className="inline-block bg-blue-500 text-white px-4 py-2 m-1 rounded">Server {i + 1} (Stream)</a>
          ))}
          {links.downloadLinks.map((link, i) => (
            <a key={i} href={link} target="_blank" className="inline-block bg-green-500 text-white px-4 py-2 m-1 rounded">Download {i + 1}</a>
          ))}
        </div>
      ) : (
        <p className="text-red-400 mt-4">No links available. Check back later.</p>
      )}
    </div>
  </div>
</div>

); };

export default MoviePage;

