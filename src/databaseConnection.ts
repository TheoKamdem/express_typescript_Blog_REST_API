import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
const connectDB = async ()=> {
    await mongoose.connect(process.env.DB_NAME!);
    console.log('MongoDb Connected');   
}
export default connectDB;

