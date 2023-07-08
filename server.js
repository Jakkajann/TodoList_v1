const express =  require("express");

const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const port = 3000;

const newItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    day = date.getDate();
    res.render("list", {listTitle: day, newListItems: newItems});
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.post("/", (req, res) => {
    let newItem = req.body.newItem;

    if(req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        newItems.push(newItem);
        res.redirect("/");
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log("The server has been started at port " + port);
});