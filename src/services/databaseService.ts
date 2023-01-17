import mongoose from "mongoose";

export function throwIfNotConnected() {
    if (mongoose.connection.readyState !== mongoose.STATES.connected)
        throw new Error("Database not connected.");
}
