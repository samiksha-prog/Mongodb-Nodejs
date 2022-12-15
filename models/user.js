const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    train_name: {
        type: String,  
        
        required: [true, "Train Name is required"]
    },
    train_number:{
        type: String,
        unique:true,
        dropDups: true,
        required: [true, "Train No is required"]
    },
    station_name:{
        type:String,
        required: [true, "Source is required"]
    },
    station_code:{
        type:String,
        required: [true, "Destination is required"]
    },
    departure:{
        type: String,
        required: [true, "Day is required"]
    }

})

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel