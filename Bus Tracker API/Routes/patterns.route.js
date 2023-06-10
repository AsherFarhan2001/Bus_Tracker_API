import fetch from  'node-fetch';
import mongoose from 'mongoose';
import express from 'express';
import patternSchema from '../models/Patterns.js';

let router = express.Router();

router.get("/fetch_pattern", async(req, res) => {

     console.log("fetch_patterns endpoint called");
    
     const URL = "https://ctabustracker.com/bustime/api/v2/getpatterns?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&pid=954&format=json";

     const response = await fetch(URL)
     const a = await response.json();

     var length = a['bustime-response']['ptr'].length;
     console.log(length);

     //var ptrDb;
     console.log(a['bustime-response']['ptr'][0]['pt'].length)
     console.log(a['bustime-response']['ptr'][1]['pt'].length)

     var arr = []

     //arr = a
     for(let i=0 ; i< length ; i++)
     {
          for(let j=0 ; j< a['bustime-response']['ptr'][i]['pt'].length; j++)
          {
               arr.push(a['bustime-response']['ptr'][i]['pt'][j]['seq'])
               arr.push (a['bustime-response']['ptr'][i]['pt'][j]['lat'])
               arr.push(a['bustime-response']['ptr'][i]['pt'][j]['lon'])
               arr.push(a['bustime-response']['ptr'][i]['pt'][j]['typ'])
               arr.push(a['bustime-response']['ptr'][i]['pt'][j]['stpid'])
               arr.push(a['bustime-response']['ptr'][i]['pt'][j]['stpnm'])
               arr.push(a['bustime-response']['ptr'][i]['pt'][j]['pdlist'])

          } 
     }

   //  console.log(arr)

     for(let i=0 ; i< length ; i++)
     {
          var ptrDb;

          for(let j=0 ; j< a['bustime-response']['ptr'][i]['pt'].length; j++)
          {
 

                ptrDb = new patternSchema({
                    pid: a['bustime-response']['ptr'][i]['pid'],
                    ln: a['bustime-response']['ptr'][i]['ln'],
                    rtdir: a['bustime-response']['ptr'][i]['rtdir'],
              // ptrDb.ptr[i]
                    ptr: [{arr}]
                    // ptr: [
                    //      {
                    //           seq: a['bustime-response']['ptr'][i]['pt'][j]['seq'],
                    //           lat: a['bustime-response']['ptr'][i]['pt'][j]['lat'],
                    //           lon: a['bustime-response']['ptr'][i]['pt'][j]['lon'],
                    //           typ: a['bustime-response']['ptr'][i]['pt'][j]['typ'],
                    //           stpid:    a['bustime-response']['ptr'][i]['pt'][j]['stpid'],
                    //           stpnm:    a['bustime-response']['ptr'][i]['pt'][j]['stpnm'],
                    //           pdlist:   a['bustime-response']['ptr'][i]['pt'][j]['pdlist'],
          
                    //      }
                    
                    
               })
             //  console.log(ptrDb);
        
          }
          ptrDb.save()
     }


     res.json(a);
    
});

export default router;
