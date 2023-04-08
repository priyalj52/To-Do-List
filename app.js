const express=require("express")
const bodyParser=require('body-parser')
const app=express()
const mongoose=require("mongoose")
require('dotenv').config();
try{
const MONGODB_URI=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.gfj9ke3.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`                                                            
console.log(process.env.MONGO_PASS)
app.set("view engine","ejs")
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology: true,})
}catch(err){console.log(err)};
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
    try{Item.find().then(result=>{
        res.render("list", {
            dayy:day,
            data:result}
        )}
        )}catch(err){console.log(err)}
});

app.delete("/:id",(req,res)=>{
    Item.findByIdAndDelete(req.params.id)
    .then(result=>{
        console.log(result)
    }).catch(err=>{
        console.log(err)
    })
      
    
   
    // return res.send({"status" : "success"})
})
app.post("/",(req,res)=>{
        const todo=new Item(
            
               { name:req.body.newItem}
            
        )
        todo.save()
        .then(result=>res.redirect("/"))
        .catch((err)=>{
            console.log(err)
        })
         
})
       

app.listen("3000",function(){
    console.log("server is at port 3000")
});
