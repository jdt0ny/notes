const express = require('express');
const fs = require('fs');
const router = express.Router();
const filePath = './data/notes.json';
// Middleware per leggere le note dal file

const readNotes = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));
// Middleware per scrivere le note nel file
const writeNotes = (notes) => fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
// GET /api/notes - Restituisce tutte le note
router.get('/', (req, res) => {
  try {
    const notes = readNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delle note' });
  }
});
// POST /api/notes - Crea una nuova nota
router.post('/', (req, res) => {
    const notes = readNotes();
    const newNotes = { id: Date.now(), task: req.body.task };
    notes.push(newNotes);
    writeNotes(notes);
    res.status(201).json(newNotes);
}
);
// PUT /api/notes/:id - Aggiorna una nota esistente
router.delete('/:id', (req, res) => {
    let notes = readNotes();
    notes = notes.filter(note => note.id !== parseInt(req.params.id));
    writeNotes(notes);
    res.status(204).send();
}
);
// PUT /api/notes/:id - Aggiorna una nota esistente

module.exports = router;