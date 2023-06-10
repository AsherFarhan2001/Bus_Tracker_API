import fetch from  'node-fetch';
import mongoose from 'mongoose';
import express from 'express';
import stopsSchema from '../models/Stops.js';

let router = express.Router();

router.get("/fetch_stop", async(req, res) => {

     console.log("fetch_stop endpoint called");
    
     const URL = "https://ctabustracker.com/bustime/api/v2/getstops?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=7&dir=Eastbound&format=json";

     const response = await fetch(URL)
     const a = await response.json();

     var length = a['bustime-response']['stops'].length;
     console.log(length);
     
     for(let i=0 ; i< length; i++)
     {
          const stopsDb = new stopsSchema({
               stpid: a['bustime-response']['stops'][i]['stpid'],
               stpnm: a['bustime-response']['stops'][i]['stpnm'],
               lat: a['bustime-response']['stops'][i]['lat'],
               lon: a['bustime-response']['stops'][i]['lon'],

          })

          stopsDb.save();
     }
     res.json(a);
    
});

//################################ CREATE STOPS ##########################

router.route('/create-stop').post((req, res, next) => {

     stopsSchema.create(req.body, (error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 console.log(data)
                 res.json(data)
           }
     })
});

//################################ READ STOPS ##########################

router.route('/').get((req, res) => {
     stopsSchema.find((error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 res.json(data)
           }
     })
});

//################################ GET SINGLE STOPS ##########################

router.route('/edit-stop/:id').get((req, res, next) => {

     stopsSchema.findById(req.params.id, (error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 console.log(data)
                 res.json(data)
           }
     })
});

//################################ UPDATE STOPS ##########################

router.route('/update-stop/:id').put((req, res, next) => {

     stopsSchema.findByIdAndUpdate(req.params.id, {
       $set: req.body

     }, (error, data) => {

       if (error) {
         return next(error);
       } 

       else {
         res.json(data)
         console.log('Stops updated successfully !')
       }
     })
})

//################################ DELETE STOPS ##########################

router.route('/delete-stop/:id').delete((req, res, next) => {

     stopsSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
