import mongoose from "mongoose";
const Schema = mongoose.Schema;

let vehicleSchema = new Schema({
    
    vid: {
        type: String
    },

    tmstmp: {
        type: String
    },

    lat: {
        type: Number
    },

    lon: {
        type: Number
    },

    hdg: {
        type: Number
    },

    pid: {
        type: Number
    },

    rt: {
        type: String
    },

    des: {
        type: String
    },

    pdist: {
        type: Number
    },

    dly: {
        type: Boolean
    },

    tatripid: {
        type: String
    },

    origtatripno: {
        type: String
    },

    tablockid: {
        type: String
    },

    zone: {
        type: String
    }

},
    {
        collection: 'vehicles'
    })
    
    export default mongoose.model('Vehicle',vehicleSchema)
