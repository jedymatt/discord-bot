import mongoose from "mongoose";

export default {
    connect() {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGODB_URI as string)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.log(err));
    },
}
