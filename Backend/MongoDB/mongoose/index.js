import mongoose, { mongo } from "mongoose"
mongoose.connect("mongodb://127.0.0.1:27017/personDB")

const personSchema=new mongoose.Schema({
    name:{type:String,
        required:true},
    age:{type:Number,
        min:1,
        max:100},
    gender:String
})
const person=mongoose.model("person",personSchema)
const person1=new person({
    name:"Khan Mohd Talha",
    age:19,
    gender:"Male"
})
// person1.save()
const person2=new person({
    name:"uneas",
    age:10,

})
const person3=new person({
  name:"Fahad",
    age:24,
    gender:"Male"

})
// person3.save()
console.log(await person.find({}))