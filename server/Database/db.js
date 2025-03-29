import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_DB_URL);
        if(connect){
            console.log("DB Connection Successful.")
        }
    } catch (err) {
        console.error("DB Connection Failed", err);
    }
}

export default connectDB;