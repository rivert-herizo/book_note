import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/books'); // Correct URL
        const jsonData = await response.data; // Extract data
        
        res.render("index.ejs", {
            books: jsonData,
        }); // Send data to the frontend
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Error fetching books");
    }
});

app.post("/add_book", async (req, res) => {
    try {
        const title = req.body.title;
        const isbn = req.body.isbn;
        try {
            await axios.post('http://localhost:3000/add_book', { title, isbn }); 
            res.redirect("/");
          } catch (err) {
            console.log(err);
          }
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send("Error adding book");
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book_id = req.params.id;
        const response = await axios.get(`http://localhost:3000/books/${book_id}`);
        const jsonData = await response.data;
        console.log(jsonData);

        res.render("book.ejs", {
            book: jsonData.book,
            notes: jsonData.notes,
        });
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send("Error fetching book");
    }
});

app.post("/add_note/:id", async (req, res) => {
    try {
        const book_id = req.params.id;
        const note = req.body.note;
        try {
            await axios.post(`http://localhost:3000/add_note/${book_id}`, { note });
            res.redirect(`/books/${book_id}`);
        } catch (err) {
            console.log(err);
        }
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).send("Error adding note");
    }
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
