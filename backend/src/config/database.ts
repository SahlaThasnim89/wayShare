import mongoose from 'mongoose'
import { environment } from "./environment";

const connectDB=async()=>{
    try {
       const connection=await mongoose.connect(environment.database)
       console.log(`mongo db connected:${connection.connection.host}`);    
    } catch (error:unknown) {
        if (error instanceof Error) {  
            console.error(`Error: ${error.message}`);
        } else {
            console.error('Unknown error occurred');
        }
        process.exit(1)
    }
}

export default connectDB;