import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
var bandName=""

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}))
function band (req,res,next){
  bandName=req.body["street"]+req.body["pet"]
  next();
}
app.use(band)
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/public/index.html")
})
app.post("/submit",(req,res)=>{
  res.send(bandName)
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
