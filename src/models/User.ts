import mongoose, { Schema } from "mongoose";


export interface IUser {
    username?: string;
    discordId: string;
    level: number;
    location: mongoose.Types.ObjectId;
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
    level: {
        type: Number,
        required: true,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
