// File: pages/api/addLink.ts

import fs from 'fs'; import path from 'path'; import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) { if (req.method !== 'POST') { return res.status(405).json({ message: 'Method not allowed' }); }

const newEntry = req.body; const filePath = path.join(process.cwd(), 'data', 'links.json');

try { const fileData = fs.readFileSync(filePath, 'utf-8'); const links = JSON.parse(fileData);

const existingIndex = links.findIndex((item) => item.id === newEntry.id);
if (existingIndex !== -1) {
  links[existingIndex] = newEntry; // Update existing
} else {
  links.push(newEntry); // Add new
}

fs.writeFileSync(filePath, JSON.stringify(links, null, 2));
res.status(200).json({ message: 'Success' });

} catch (err) { res.status(500).json({ message: 'Error writing file', error: err }); } }

