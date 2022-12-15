const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/user")
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/views'))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render("index")
})

app.post("/insert", (req, res)=>{
    const Trains = new UserModel(req.body)
    Trains.save((error, savedUser)=>{
        if(error) throw error
        console.log("Train Inserted")
        res.render('index')
    })
})

app.post("/delete", (req, res)=>{
    UserModel.deleteOne({ train_number:  req.body.train_number}).then(function(){
        // console.log("Train Deleted") 
        res.render('DeleteOneTrain')
    }).catch(function(error){
        console.log(error); 
    });
})

app.post("/all_trains",(req,res)=>{
    //Fetch all Data
    UserModel.find({},(err,result)=>{
        if(result){
            users=result;
            res.render('FetchAllTrains',{users: result})
        }else{
            console.log(err);
            res.render('FetchAllTrains', {users: []});
        }
    })
})

app.post("/one_train",(req,res)=>{
    const str = req.body.train_number;
    UserModel.findOne({train_number: str},(err, result)=>{
        if(result){
            user=result;
            res.render('FindOneTrain', {user: result});
        }else{
            console.log(err);
        }
    })
})

app.post("/station_train",(req,res)=>{
    const str = req.body.station_name;
    //regex
    UserModel.find({station_name: new RegExp(str, "i")},(err, result)=>{
        if(result){
            user=result;
            res.render('FindStationTrain', {user: result});
        }else{
            console.log(err);
        }
    })
})

app.listen(port, () => {
    console.log('server is running at port no ',port);
})
mongoose.connect("mongodb://0.0.0.0:27017/RailwayData"
).then(() => {
    console.log('Connection Successful');
}).catch((e) => {
    console.log('No Connection');
});

