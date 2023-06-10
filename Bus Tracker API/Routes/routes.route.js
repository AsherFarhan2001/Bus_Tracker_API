import fetch from  'node-fetch';
import mongoose from 'mongoose';
import express from 'express';
import routesSchema from '../models/Routes.js'

let router = express.Router();

router.get("/fetch_route", async(req, res) => {

     console.log("fetch_route endpoint called");
    
     const URL = "http://ctabustracker.com/bustime/api/v2/getroutes?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json";

     const response = await fetch(URL)
     const a = await response.json();

     var length = a['bustime-response']['routes'].length;
     console.log(length);
     
     for(let i=0 ; i< length; i++)
     {
          const routesDb = new routesSchema({
               rt: a['bustime-response']['routes'][i]['rt'],
               rtnm: a['bustime-response']['routes'][i]['rtnm'],
               rtclr: a['bustime-response']['routes'][i]['rtclr'],
               rtdd: a['bustime-response']['routes'][i]['rtdd'],
          })

          routesDb.save();
     }

     res.json(a);
    
});

//################################ CREATE ROUTES ##########################

router.route('/create-route').post((req, res, next) => {

     routesSchema.create(req.body, (error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 console.log(data)
                 res.json(data)
           }
     })
});

//################################ READ ROUTES ##########################

router.route('/').get((req, res) => {
     routesSchema.find((error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 res.json(data)
           }
     })
});

//################################ GET SINGLE ROUTES ##########################

router.route('/edit-route/:id').get((req, res, next) => {

     routesSchema.findById(req.params.id, (error, data) => {
           if(error) {
                 return next(error)
           }

           else{
                 console.log(data)
                 res.json(data)
           }
     })
});

//################################ UPDATE ROUTES ##########################

router.route('/update-route/:id').put((req, res, next) => {

     routesSchema.findByIdAndUpdate(req.params.id, {
       $set: req.body

     }, (error, data) => {

       if (error) {
         return next(error);
       } 

       else {
         res.json(data)
         console.log('Route updated successfully !')
       }
     })
})

//################################ DELETE ROUTES ##########################

router.route('/delete-route/:id').delete((req, res, next) => {

     routesSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
