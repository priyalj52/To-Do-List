const express=require("express")
const bodyParser=require('body-parser')
const app=express()
let items=[]
let item=""
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
    let today=new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    let day=today.toLocaleDateString("en-US",options)
    res.render("list",{
        dayy:day,
        thing:items
    })
    
});

app.post("/",(req,res)=>{
         item=req.body.newItem
         console.log(item)
         items.push(item)
         res.redirect("/")
        })

app.listen("3000",function(){
    console.log("server is at port 3000")
});