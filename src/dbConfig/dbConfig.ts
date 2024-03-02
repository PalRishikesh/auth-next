import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB Connected successfully.");
            
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error. '+err);
            process.exit();
            
        })
        
    } catch (error) {
        console.log("Something went wrong in DB connection...");
        console.log(error);
        
        
    }
}