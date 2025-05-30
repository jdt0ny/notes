const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');
const port = 3000;
// Middleware per il parsing del JSON
app.use(express.json());

app.use('/api/notes', notesRouter);
// Middleware per gestire gli errori
app.get('/', (req, res) => {
  res.send('Welcome to the Notes API');
}
);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}
);

