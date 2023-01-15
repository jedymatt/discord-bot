import mongoose, { Schema } from "mongoose";

interface ILocation {
    name: String;
    description?: String;
    level: Number;
}


const locationSchema = new Schema<ILocation>({
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
