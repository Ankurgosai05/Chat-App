import mongoose from "mongoose";

const connectDB = async() =>{

    await mongoose.connect(process.env.MONGO_URI)
.then(() => {
        console.log('MongoDB is connected');

    })
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    }) 

}

export default connectDB;