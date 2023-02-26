const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");



app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

const port = process.env.PORT || 5000;


require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.get("/", (req, res) => {
    res.render("home");
})

app.listen(3000, () => {
    console.log("PORT 3000")
})