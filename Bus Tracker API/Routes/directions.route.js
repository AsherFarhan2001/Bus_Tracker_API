import fetch from  'node-fetch';
import mongoose from 'mongoose';
import express from 'express';
import directionsSchema from '../models/Directions.js';

let router = express.Router();

router.get("/fetch_directions", async(req, res) => {

     console.log("fetch_directions endpoint called");
    
     const URL = "http://ctabustracker.com/bustime/api/v2/getdirections?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json";

     const response = await fetch(URL)
     const a = await response.json();

     var length = a['bustime-response']['directions'].length;
     console.log(length);
     
     for(let i=0 ; i< length; i++)
     {
          const directionsDb = new directionsSchema({
               dir: a['bustime-response']['directions'][i]['dir'],
          })

          directionsDb.save();
     }

     res.json(a);
    
});

//################################ CREATE DIRECTIONS ##########################

router.route('/create-direction').post((req, res, next) => {

     directionsSchema.create(req.body, (error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 console.log(data)
                 res.json(data)
           }
     })
});

//################################ READ DIRECTIONS ##########################

router.route('/').get((req, res) => {
     directionsSchema.find((error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 res.json(data)
           }
     })
});

//################################ GET SINGLE DIRECTION ##########################

router.route('/edit-direction/:id').get((req, res, next) => {

     directionsSchema.findById(req.params.id, (error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 console.log(data)
                 res.json(data)
           }
     })
});

//################################ UPDATE DIRECTION ##########################

router.route('/update-direction/:id').put((req, res, next) => {

     directionsSchema.findByIdAndUpdate(req.params.id, {
       $set: req.body

     }, (error, data) => {

       if (error) {
         return next(error);
       } 

       else {
         res.json(data)
         console.log('Vehicle updated successfully !')
       }
     })
})

//################################ DELETE DIRECTION ##########################

router.route('/delete-direction/:id').delete((req, res, next) => {

     directionsSchema.findByIdAndRemove(req.params.id, (error, data) => {
           if(error)
           {
                 return next(error)
           }

           else{
                 res.status(200).json({
                       msg: data
                 })
           }
     })
})

export default router;
