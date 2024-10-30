import express from "express"
import bodyParser from 'body-parser'
import axios from "axios"
const port = 3000
const app = express()
const API="https://date.nager.at"
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.post("/submit",async (req,res)=>{
    console.log(req.body["type"])
    console.log(req.body["countryId"])
    console.log(req.body["year"])
    try{if(req.body["type"]=="longWeekend"){
        const result= await axios.get(API+`/api/v3/LongWeekend/${req.body["year"]}/${req.body["countryId"]}`)
        res.render("submit.ejs",{
            content:JSON.stringify(result.data)
        })}
        else{
            const result= await axios.get(API+`/api/v3/NextPublicHolidays/${req.body["countryId"]}`)
        res.render("submit.ejs",{
            content:JSON.stringify(result.data)
        })
        }
    }
    catch(error){
        res.render("submit.ejs",{
            content:"No holidays"
        })
        console.log(error.message)
    }
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})