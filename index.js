const express = require("express");
const RecipeInfo = require('./model/recipeDb');

const app = new express();
const path = require('path');



app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-control-Allow-Headers","X-Requested-With,content-type");
    res.setHeader("Access-control-Allow-Credentials",true);
    next();
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'/build')));

app.get('/',(req,res)=>{
    res.send("server up");
}
);
// create
app.post('/api/create',(req,res)=>{
    try{
     
    let movie = new RecipeInfo(req.body); 
    movie.save(); // saving to db

res.send("Data Added");
    }
    catch(error){
        res.status(500).send(error);
    }
});

//read
app.get('/api/view',async (req,res)=>{
    try{
        let result= await RecipeInfo.find();
        res.json(result);
    
}
catch(error) {
res.status(500).send(error); 
}
});
//update
app.post('/api/update',(req,res)=>{
    try{
    RecipeInfo.findByIdAndUpdate(req.body._id, req.body); 
    res.send("Data updated");

    }
    catch(error) {
        res.status(500).send(error); 
        }
});
//delete
app.post('/api/delete',async (req,res)=>{
    try{
  await MovieInfo.findByIdAndDelete(req.body._id);
  res.send("Data deleted");
    }
    catch(error) {
        res.status(500).send(error); 
        }
}); 


app.get('/*',function(req,res) {
 res.sendFile(path.join(__dirname,'/build/index.html'));
});

//setting port number
app.listen(8005, ()=>{
    console.log("listening to port 8005");
})