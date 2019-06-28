var express    =require('express');
    app        =express();
    bodyParser =require("body-parser"),
    mongoose   =require('mongoose');

mongoose.connect("mongodb://localhost:27017/task",{useNewUrlParser:true}); 
app.use(bodyParser.urlencoded({extended:true}));   
app.set("view engine","ejs"); 

var loginSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String,
    role:String
});
var Login=mongoose.model("Login",loginSchema)

app.get('/',function(req,res){
    res.render('login');
});        

app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var formData={username:username,password:password};
    Login.find(formData,function(err,databaseData){
        if(databaseData){
            if(databaseData[0].role === 'admin'){
                res.render('admin');
            }else if(databaseData[0].role === 'user'){
                res.render('user')
            }
        }
        else{
            res.render('login');
        }
    });

});

app.listen(8800,function(){
    console.log("server has started");
});