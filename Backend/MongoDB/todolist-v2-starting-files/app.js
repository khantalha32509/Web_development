//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const mongoose=require("mongoose")

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
const itemsSchema= new mongoose.Schema({
  item:String
})
const Item=mongoose.model("Item",itemsSchema)

const item1=new Item({
  item:"Buy Food"
})
const item2=new Item({
  item:"Cook Food"
})
const item3=new Item({
  item:"Eat Food"
})

const defaultItems = [item1,item2,item3];
const listSchema=new mongoose.Schema({
  name:String,
  items: [itemsSchema]
})
const List=mongoose.model("List",listSchema)

app.get ("/", async function(req, res) {
let items=await Item.find({})
if (items.length===0){
  Item.insertMany(defaultItems)
  res.redirect("/")
}
else{
  res.render("list", {listTitle: "Today", newListItems: items});
}
});

app.post("/", async function(req, res){

  const itemName = req.body.newItem;
  const listName=req.body.listName
  console.log(itemName)
  const userItem=new Item({
    item:itemName
  })
  if(listName=="Today"){
    userItem.save()
    res.redirect("/")
  }
  else{
    List.findOne({name:listName})
    .then(docs=>{
      docs.items.push(req.body.newItem)
      docs.save()
      res.redirect("/"+listName)
    })
  }
  
});
app.post("/delete",function(req,res){
  const id=req.body.checkbox
  console.log(id)
  Item.findByIdAndRemove(id)
  .then(function () {
    console.log("Successfully removed");
})
.catch(function (err) {
    console.log(err);
});
  res.redirect("/")
})

app.get("/:customListName",(req,res)=>{
  const customListName=req.params.customListName
  const list = new List({
    name:customListName,
    items:defaultItems,
  })
List.findOne({name:customListName})
.then((docs)=>{
  if(!docs){
    console.log("not exist")
    list.save()
    res.redirect("/"+customListName)
  }  
  else{
    console.log(docs.name+docs.items)
   res.render("list", {listTitle: docs.name, newListItems: docs.items})
  }
})

.catch((err)=>{
  console.log(err);
});
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
