import mongoose, { Schema } from "mongoose";

export interface ILocation {
    code: string;
    name: String;
    description?: String;
    level: Number;
}


const locationSchema = new Schema<ILocation>({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    level: {
        type: Number,
        required: true,
        default: 1,
    },
});

const LocationModel = mongoose.model<ILocation>('Location', locationSchema);

export default LocationModel;
