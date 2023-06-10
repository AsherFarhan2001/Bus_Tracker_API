import mongoose from "mongoose";
const Schema = mongoose.Schema;

let stopsSchema = new Schema({
    stpid: {
        type: Number
    },

    stpnm: {
        type: String
    },

    lat: {
        type: Number
    },

    lon: {
        type: Number
    }
},
    {
        collection: 'stops'
    })

    export default mongoose.model('Stops', stopsSchema)
