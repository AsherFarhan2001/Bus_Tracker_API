import fetch from  'node-fetch';
import mongoose from 'mongoose';
import express from 'express';
import vehicleSchema from '../models/Vehicles.js';

let router = express.Router();

router.get("/fetch", async(req, res) => {

      console.log("fetch_vehicle endpoint called");
    
      const URL = "https://ctabustracker.com/bustime/api/v2/getvehicles?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json";

      const response = await fetch(URL)
      const a = await response.json();

      let length = a['bustime-response']['vehicle'].length

       for(let i=0;i<length;i++)
       {
            const vehicleDb = new vehicleSchema({
                  vid: a['bustime-response']['vehicle'][i]['vid'],
                  tmstmp: a['bustime-response']['vehicle'][i]['tmstmp'],
                  lat:  a['bustime-response']['vehicle'][i]['lat'],
                  lon:  a['bustime-response']['vehicle'][i]['lon'],
                  hdg:  a['bustime-response']['vehicle'][i]['hdg'],
                  pid:  a['bustime-response']['vehicle'][i]['pid'],
                  rt:   a['bustime-response']['vehicle'][i]['rt'],
                  des:  a['bustime-response']['vehicle'][i]['des'],
                  pdlist:     a['bustime-response']['vehicle'][i]['pdlist'],
                  dly:  a['bustime-response']['vehicle'][i]['dly'],
                  tatripid:   a['bustime-response']['vehicle'][i]['tatripid'],
                  origtatripno:     a['bustime-response']['vehicle'][i]['origtatripno'],
                  tablockid:  a['bustime-response']['vehicle'][i]['tablockid'],
                  zone: a['bustime-response']['vehicle'][i]['zone'],
            });

            vehicleDb.save();
      
       }
     

     res.json(a);
    
});

//################################ CREATE VEHICLES ##########################

router.route('/create-vehicle').post((req, res, next) => {

      vehicleSchema.create(req.body, (error, data) => {
            if(error) {
                  return next(error)
            }

            else{
                  console.log(data)
                  res.json(data)
            }
      })
});

//################################ READ VEHICLES ##########################

router.route('/').get((req, res) => {
      vehicleSchema.find((error, data) => {
            if(error) {
                  return next(error)
            }

            else{
                  res.json(data)
            }
      })
});

//################################ GET SINGLE VEHICLE ##########################

router.route('/edit-vehicle/:id').get((req, res, next) => {

      vehicleSchema.findById(req.params.id, (error, data) => {
            if(error) {
                  return next(error)
            }

            else{
                  console.log(data)
                  res.json(data)
            }
      })
});

//################################ UPDATE VEHICLE ##########################

router.route('/update-vehicle/:id').put((req, res, next) => {

      vehicleSchema.findByIdAndUpdate(req.params.id, {
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

//################################ DELETE VEHICLE ##########################

router.route('/delete-vehicle/:id').delete((req, res, next) => {

      vehicleSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
            