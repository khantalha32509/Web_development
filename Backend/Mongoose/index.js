import mongoose from "mongoose"
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/peopleDB');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const personSChema= new mongoose.Schema({
    name:String,
    age: Number,

})
const Person= mongoose.model("Person",personSChema)
const person=new Person({
    name:"Talha",
    age:19
})
const person1= new Person({
  name:"uneas",
  age:12
})
const person2= new Person({
  name:"Mariyam",
  age:16
})
const person3= new Person({
  name:"Anas",
  age:15
})
// person3.save()
// Person.insertMany([person1,person2])
Person.find({name:"Mariyam"})
