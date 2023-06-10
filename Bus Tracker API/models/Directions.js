import mongoose from "mongoose";
const Schema = mongoose.Schema;

let directionsSchema = new Schema({
    dir: {
        type: String
    }
},
    {
        collection: 'directions'
    })

    export default mongoose.model('Directions', directionsSchema)
