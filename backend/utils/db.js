import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://messinour07:jtqyEsHFfM4q9ljT@cluster0.zv29g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;