const express=require("express")
const bodyParser=require("body-parser")

const mongoose=require("mongoose")
const md5=require("md5");

const Schema=mongoose.Schema;
const app=express();

app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://mukeshorusu:mukeshorusu@cluster0.i0m1sfz.mongodb.net/stylester");

const UserSchema=new mongoose.Schema({
  email:String,
  password:String
});

const User=new mongoose.model("User",UserSchema);

app.get("/",async function(req,res){
  res.render("home");
})

app.get("/login-signup",async function(req,res){
  res.render("login-signup");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/signup",function(req,res){
  res.render("signup");
});

app.get("/successful-login",function(req,res){
  res.render("successful-login");
});

app.get("/returns",function(req,res){
  res.render("returns");
})

app.post("/signup",async function(req,res){
  const newUser=new User({
    email:req.body.username,
    password:md5(req.body.password)
  });
  newUser.save();
  res.redirect("/successful-login");
});

app.post("/login",async function(req,res){
  const username=req.body.username;
  const password=md5(req.body.password);
  const foundUser=await User.findOne({email:username});
  if(foundUser){
    if(password==foundUser.password){
      let msg="Logged in successfully!"
      res.redirect("/successful-login");
    }
    else{
      res.redirect("/");
    }
  }
  else{
    res.render("signup");
  }
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running successfully")
});
