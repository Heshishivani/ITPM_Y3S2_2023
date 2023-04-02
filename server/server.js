//Load env variables
if (process.env.NODE_ENV != "production") {
require("dotenv").config();
}

//Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const itemsController = require("./controllers/itemsController");
const userController= require("./controllers/userController");
//Create an expresss app
const app = express();

//Configure express app
app.use(express.json());
app.use(cors());

//Connect to database
connectToDb();

//Routing Note
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

//Routing Item
app.get("/items", itemsController.fetchItems);
app.get("/items/:id", itemsController.fetchItem);
app.post("/items", itemsController.createItem);
app.put("/items/:id", itemsController.updateItem);
app.delete("/items/:id", itemsController.deleteItem);

//login routing

app.post('/users', userController.createUsers );
app.get('/users', userController.fecthUsers);
app.get('/users/:id', userController.fecthUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

//Start the server
app.listen(process.env.PORT);