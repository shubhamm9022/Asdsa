// File: pages/admin.tsx

import { useState } from 'react'; import fs from 'fs'; import path from 'path';

const Admin = () => { const [movieId, setMovieId] = useState(''); const [streamLinks, setStreamLinks] = useState(['']); const [downloadLinks, setDownloadLinks] = useState(['']); const [message, setMessage] = useState('');

const handleSubmit = async (e) => { e.preventDefault();

const newEntry = {
  id: movieId,
  streamLinks: streamLinks.filter(Boolean),
  downloadLinks: downloadLinks.filter(Boolean),
};

const res = await fetch('/api/addLink', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newEntry),
});

if (res.ok) setMessage('Links added successfully!');
else setMessage('Error adding links.');

};

return ( <div className="bg-black text-white min-h-screen p-6"> <h1 className="text-2xl mb-4 font-bold">Admin Panel</h1> <form onSubmit={handleSubmit} className="space-y-4"> <input type="text" value={movieId} onChange={(e) => setMovieId(e.target.value)} placeholder="TMDB Movie ID" className="w-full p-2 text-black" required />

<div>
      <label className="block mb-1">Stream Links</label>
      {streamLinks.map((link, i) => (
        <input
          key={i}
          type="text"
          value={link}
          onChange={(e) => {
            const updated = [...streamLinks];
            updated[i] = e.target.value;
            setStreamLinks(updated);
          }}
          className="w-full p-2 mb-2 text-black"
          placeholder={`Stream Link ${i + 1}`}
        />
      ))}
      <button type="button" onClick={() => setStreamLinks([...streamLinks, ''])} className="bg-gray-700 px-2 py-1 rounded">+ Add Stream</button>
    </div>

    <div>
      <label className="block mb-1">Download Links</label>
      {downloadLinks.map((link, i) => (
        <input
          key={i}
          type="text"
          value={link}
          onChange={(e) => {
            const updated = [...downloadLinks];
            updated[i] = e.target.value;
            setDownloadLinks(updated);
          }}
          className="w-full p-2 mb-2 text-black"
          placeholder={`Download Link ${i + 1}`}
        />
      ))}
      <button type="button" onClick={() => setDownloadLinks([...downloadLinks, ''])} className="bg-gray-700 px-2 py-1 rounded">+ Add Download</button>
    </div>

    <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Save</button>
    {message && <p className="mt-2 text-green-400">{message}</p>}
  </form>
</div>

); };

export default Admin;

