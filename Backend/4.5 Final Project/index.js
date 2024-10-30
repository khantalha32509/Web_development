import express from "express"
import bodyParser from "body-parser"
const app= express()
const port =3000
const d=new Date()
const weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"]
let itemsArray=[]
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    let day=weekDays[d.getDay()]
    let date=d.getDate()
    let month=monthsArray[d.getMonth()]
    res.render("index.ejs",{
     box:`<h1>${day},${month} ${date}</h1>`,
     content: `<p>no items</p>`,
     itemsArray
    })
})
// content:` <label for=""> ${req.body["newItem"]} </label> <input type="checkbox"></input>`
app.post("/submit",(req,res)=>{
    let day=weekDays[d.getDay()]
    let date=d.getDate()
    let month=monthsArray[d.getMonth()]
    itemsArray.push(` <div class="items"><label for=""> ${req.body["newItem"]} </label> <input type="checkbox"></input></div>`)
    res.render("index.ejs",{
       box:`<h1>${day},${month} ${date}</h1>`,
       itemsArray
    })
})

app.listen(port,()=>{
    console.log(`server is running on sever ${port}`)
})