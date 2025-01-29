const mongoose = require('mongoose');
require('dotenv').config();
const connectToDb = async ()=>{
    try{
        const res = mongoose.connect(process.env.MONGO_URI);
        if(res){
            console.log("Database connected successfully...");
        }
        else{
            console.log("Error while connecting to database");
        }
        return res;
    }
    catch(err){
        console.log(err.message);
    }
    
}

module.exports = connectToDb;