// server.js
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database file
const FILE_PATH = path.join('.', 'db', 'tourists.json');

// Ensure file exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, '[]');
}

// GET all tourists
app.get('/tourists', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  res.json(data);
});

// POST a new tourist
app.post('/tourists', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  const newTourist = {
    id: Date.now(),
    name: req.body.name,
    nationality: req.body.nationality,
    safetyScore: req.body.safetyScore || 0,
    location: req.body.location || { lat: 20.5937, lng: 78.9629 },
  };
  data.push(newTourist);
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true, tourist: newTourist });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
