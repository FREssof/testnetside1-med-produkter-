const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // Create jagerfly table
    db.run(`CREATE TABLE IF NOT EXISTS jagerfly (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        navn TEXT NOT NULL,
        pris INTEGER NOT NULL,
        bilde TEXT NOT NULL
    )`);

    // Create biler table
    db.run(`CREATE TABLE IF NOT EXISTS biler (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        navn TEXT NOT NULL,
        pris INTEGER NOT NULL,
        bilde TEXT NOT NULL
    )`);

    // Insert sample data for jagerfly
    db.run(`INSERT OR IGNORE INTO jagerfly (navn, pris, bilde) VALUES 
        ('F-16 Fighting Falcon', 68000000, 'bilder/f16.jpg'),
        ('F-35 Lightning II', 89000000, 'bilder/f35.jpg'),
        ('Eurofighter Typhoon', 124000000, 'bilder/typhoon.jpg')`);

    // Insert sample data for biler
    db.run(`INSERT OR IGNORE INTO biler (navn, pris, bilde) VALUES 
        ('Ferrari SF90', 4500000, 'bilder/ferrari.jpg'),
        ('Lamborghini Aventador', 3800000, 'bilder/lambo.jpg'),
        ('Bugatti Chiron', 27000000, 'bilder/bugatti.jpg')`);
});

db.close();
