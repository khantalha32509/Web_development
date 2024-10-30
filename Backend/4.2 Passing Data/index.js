import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs",{header:"<h1>Enter Your Name</h1>"})
});

app.post("/submit", (req, res) => {
  let numberOfChar=(req.body["fName"]+req.body["lName"]).length
  res.render("index.ejs",{header:`<h1>The number of char in your name is ${numberOfChar}:</h1>`})
  console.log(req.body["fname"]+req.body["lname"])
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
