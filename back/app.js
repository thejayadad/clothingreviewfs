const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config();
const port = process.env.PORT || 3000;
const Clothing = require("./models/clothing");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');



const app = express();


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));




const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB Connected");
})



app.get("/", (req, res) => {
    res.render("home");
})

app.get("/clothing", async (req, res) => {
    const clothing = await Clothing.find({});
    res.render("clothing/index", {clothing});
})

app.get("/makeclothing", async (req, res) => {
    const clothing = new Clothing({title: "pants", price: 65.00, description: "brand pants", type: "brand"})
    await clothing.save();
    res.send(clothing);
})
//NEW CLOTHING
app.get("/clothing/new", (req, res) => {
    res.render("clothing/new")
})

app.post("/clothings", async (req, res) => {
    const clothing = new Clothing(req.body)
    await clothing.save();
    res.redirect("/clothing")

})

//SINGLE CLOTHING
app.get("/clothing/:id", async(req, res) => {
    const clothing = await Clothing.findById(req.params.id)
    res.render("clothing/show", {clothing})
})
//EDIT ROUTE
app.get("/clothing/:id/edit", async(req, res ) => {
    const clothing = await Clothing.findById(req.params.id)
    res.render('clothing/edit', { clothing });
})
app.put("/clothings/:id", async (req, res) => {
    const { id } = req.params;
    const clothing = await Clothing.findByIdAndUpdate(id, { ...req.body });
    res.redirect("/clothing")
})

//DELETE ROUTE
app.delete('/clothing/:id', async (req, res) => {
    const { id } = req.params;
    await Clothing.findByIdAndDelete(id);
    res.redirect('/clothing');
})

app.listen(3000, () => {
    console.log("PORT 3000")
})