import mongoose from "mongoose";
const Schema = mongoose.Schema;

let routesSchema = new Schema({
    rt: {
        type: String
    },

    rtnm: {
        type: String
    },

    rtclr: {
        type: String
    },

    rtdd: {
        type: String
    }
},
    {
        collection: 'routes'
    })

    export default mongoose.model('Routes', routesSchema)
