const express=require("express")
const bodyParser=require('body-parser')
const app=express()
const mongoose=require("mongoose")

app.set("view engine","ejs")
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true})
//database
const itemSchema={
    name:String,
  
}
//database name
const Item=mongoose.model("Item",itemSchema)

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json()); 

app.get("/",function(req,res){
    let today=new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    let day=today.toLocaleDateString("en-US",options)
    Item.find().then(result=>{
        res.render("list", {
            dayy:day,
            data:result}
        )}
        )
});

app.delete("/:id",(req,res)=>{
    Item.findByIdAndDelete(req.params.id)
    .then(result=>{
        console.log(result)
    })
   
    // return res.send({"status" : "success"})
})
app.post("/",(req,res)=>{
        const todo=new Item(
            
               { name:req.body.newItem}
            
        )
        todo.save()
        .then(result=>res.redirect("/"))
         
})
       

app.listen("3000",function(){
    console.log("server is at port 3000")
});