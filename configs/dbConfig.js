const mongoose = require("mongoose");

const dbConnect = () =>{
    const connectParams = { useNewUrlParser: true};
    mongoose.connect(process.env.DB, connectParams);
    mongoose.connection.on("Connectd", ()=>{
        console.log("Database connected successfully");
    })
    mongoose.connection.on("disconnected",()=>{
        console.log("Database connection disconnected")
    })
    mongoose.connection.on("error",(err)=>{
        console.log("Error while connection to database :"+err);
    })
}

module.exports={dbConnect};