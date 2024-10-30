import express from "express"
import {fileURLToPath} from "url"
import {dirname} from "path"

const port=3000
const __dirname=dirname(fileURLToPath(import.meta.url))
const app = express()
const d=new Date("June 24, 2023")
let day= d.getDay()
console.log(day)

app.get("/",(req,res)=>{
    if(day===6||day===0){
        res.render("index.ejs",{day:"a weekdend",advice:"have"})
    }
    else{
    res.render("index.ejs",{day:"a weekday",advice:"work Hard"})}
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
