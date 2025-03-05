import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(express.static('public'));
app.use(express.json()); // ✅ Add this to parse JSON body

const port = 3000;

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'book',
    password: '123Abc567..',
    port: 5432,
})

db.connect();



app.use(bodyParser.json()); // Add JSON parsing middleware

app.get('/books', async (req, res) => {
    try{
        const data = await db.query("SELECT * FROM read_book");
        res.json(data.rows);
    }
    catch(e){
        console.log(e);
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book_id = req.params.id;
        const data = await db.query("SELECT * FROM read_book WHERE id = $1", [book_id]);
        const note = await db.query("SELECT * FROM note WHERE book_id = $1", [book_id]);

        console.log(note.rows); // Logs notes in console

        if (data.rows.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Return book and notes as a single JSON object
        res.json({ book: data.rows[0], notes: note.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching book" });
    }
});



app.post("/add_book", async (req, res) => {
    try {
        const title = req.body.title;
        const isbn = req.body.isbn;

        // Insert the new book into the database
        await db.query("INSERT INTO read_book (title, isbn) VALUES ($1, $2)", [title, isbn]);
        res.send("Book added successfully");
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send("Error adding book");
    }
});



app.post('/add_note/:id', async (req, res) => {
    try {
        const book_id = req.params.id;
        const note = req.body.note;
        db.query("INSERT INTO note (note, book_id) VALUES ($1, $2)", [note, book_id]);
        res.send('Data sent');
    }
    catch(e){
        console.log(e);
    }
})

app.listen(port, () => {
    console.log('Server working');
})