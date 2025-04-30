// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3000;

// Midware
app.use(cors({
  origin: '*',  // Tillater alle origins under utvikling
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// Serve static files (for images)
app.use(express.static('.'));
app.use('/jagerfly', express.static('jagerfly'));
app.use('/Produktside/bilder', express.static('Produktside/bilder'));

// Koble til database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Feil ved tilkobling til database:', err.message);
  } else {
    console.log('Tilkoblet til SQLite-database.');
  }
});

// Opprett tabeller ved oppstart
db.serialize(() => {
    // Opprett jagerfly-tabell hvis den ikke eksisterer
    db.run(`CREATE TABLE IF NOT EXISTS jagerfly (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        navn TEXT NOT NULL,
        pris INTEGER NOT NULL,
        bilde TEXT NOT NULL
    )`);

    // Opprett biler-tabell hvis den ikke eksisterer
    db.run(`CREATE TABLE IF NOT EXISTS biler (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        navn TEXT NOT NULL,
        pris INTEGER NOT NULL,
        bilde TEXT NOT NULL
    )`);
});

// Hent alle brukere
app.get('/api/brukere', (req, res) => {
    const query = `SELECT * FROM bruker`;
    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Noe gikk galt ved henting av brukere.' });
      } else {
        res.json(rows);
      }
    });
  });
  
  // Hent én bruker basert på ID
  app.get('/api/brukere/:id', (req, res) => {
    const query = `SELECT * FROM bruker WHERE ID = ?`;
    db.get(query, [req.params.id], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Noe gikk galt ved henting av brukeren.' });
      } else if (!row) {
        res.status(404).json({ error: 'Bruker ikke funnet.' });
      } else {
        res.json(row);
      }
    });
  });
  
  // Legg til en ny bruker
  app.post('/api/brukere', (req, res) => {
    const { Name, brukernavn, 'E-Post': EPost, Telefon, Passord } = req.body;
    const query = `INSERT INTO bruker (Name, brukernavn, 'E-Post', Telefon, Passord) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [Name, brukernavn, EPost, Telefon, Passord], function(err) {
      if (err) {
        res.status(500).json({ error: 'Feil under lagring av bruker.' });
      } else {
        res.status(201).json({ message: 'Bruker lagt til!', brukerId: this.lastID });
      }
    });
  });
  
  // Oppdater en eksisterende bruker
  app.put('/api/brukere/:id', (req, res) => {
    const { Name, brukernavn, 'E-Post': EPost, Telefon, Passord } = req.body;
    const query = `
      UPDATE bruker 
      SET Name = ?, brukernavn = ?, 'E-Post' = ?, Telefon = ?, Passord = ?
      WHERE ID = ?
    `;
    db.run(query, [Name, brukernavn, EPost, Telefon, Passord, req.params.id], function(err) {
      if (err) {
        res.status(500).json({ error: 'Feil under oppdatering.' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Bruker ikke funnet.' });
      } else {
        res.json({ message: 'Bruker oppdatert.' });
      }
    });
  });
  
  // Slett en bruker
  app.delete('/api/brukere/:id', (req, res) => {
    const query = `DELETE FROM bruker WHERE ID = ?`;
    db.run(query, [req.params.id], function(err) {
      if (err) {
        res.status(500).json({ error: 'Feil under sletting.' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Bruker ikke funnet.' });
      } else {
        res.json({ message: 'Bruker slettet.' });
      }
    });
  });
  
// Oppdater produktendepunktet
app.get('/api/produkter/:kategori', (req, res) => {
    const kategori = req.params.kategori.toLowerCase();
    const validKategorier = ['jagerfly', 'biler'];
    
    if (!validKategorier.includes(kategori)) {
        return res.status(400).json({ error: 'Ugyldig kategori' });
    }
    
    const query = `SELECT * FROM ${kategori}`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Databasefeil: ' + err.message });
        }
        console.log(`Hentet ${rows.length} ${kategori}:`, rows);
        res.json(rows);
    });
});

// Legg til en debug-endpoint for å sjekke tabellstruktur
app.get('/api/debug/table/:tableName', (req, res) => {
    const tableName = req.params.tableName;
    db.all(`PRAGMA table_info(${tableName})`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});
