import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import vehicleRouter from './Routes/vehicle.route.js';
import stopRouter from './Routes/stops.route.js';
import directionsRouter from './Routes/directions.route.js';
import patternsRouter from './Routes/patterns.route.js';
import routesRouter from './Routes/routes.route.js';

mongoose
    .connect('mongodb://127.0.0.1:27017/bustracker')
    .then((x) => {
        console.log(`Connected to Mongo database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo database', err.reason)
    })


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
  extended: true

}));

app.use(cors());
app.use('/vehicles', vehicleRouter);
app.use('/stops', stopRouter);
app.use('/directions', directionsRouter);
app.use('/patterns', patternsRouter);
app.use('/routes', routesRouter);

//################################# PORT LISTENING #############################

const port = process.env.PORT || 4002;
const server = app.listen(port, () =>{
    console.log("Connected to Port " + port);
})

app.use((req, res, next) =>{
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
