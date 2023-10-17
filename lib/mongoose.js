import mongoose from "mongoose"

export function mongooseConnect() {
    if (mongoose.connection.readyState === 1){
        return mongoose.connect;
    } else {
        const uri = process.env.MONGODB_URI
        return mongoose.connect(uri)
    }
}