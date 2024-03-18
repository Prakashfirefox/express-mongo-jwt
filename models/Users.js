const  mongoose  =  require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique:true
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:[String],
        enum: ["user","admin","super_admin"],
        default:["user"]
    },
});

const Users = mongoose.model("Users",userSchema);
module.exports= {Users};

