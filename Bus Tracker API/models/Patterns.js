import mongoose from "mongoose";
const Schema = mongoose.Schema;



let ptSchema = new Schema({
    seq: {
        type: Number
    },

    lat: {
        type: Number
    },

    lon: {
        type: Number
    },

    typ: {
        type: String
    },

    stpid: {
        type: Number
    },

    stpnm: {
        type: String
    },
    
    pdist: {
        type: Number
    }
    
})


let patternSchema = new Schema({
    
    pid: {
        type: Number
    },

    ln: {
        type: Number
    },

    rtdir: {
        type: String
    },

    ptr: [{ptSchema}]

},
    {
        collection: 'patterns'
    })

     export default mongoose.model('Patterns', patternSchema)
    



   
