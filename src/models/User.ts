import mongoose, { Schema, Document } from "mongoose";


interface IUser {
    username?: String;
    discordId: String;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
    },
    discordId: {
        type: String,
        unique: true,
        required: true,
    },
});

const UserModel =  mongoose.model<IUser>('User', userSchema);

export default UserModel;
