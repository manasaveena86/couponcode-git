const express = require('express')
const app = express()
app.use(express.json()); // Parsing of incoming json body 
const moment = require('moment')
const cors = require('cors')
//const jwt = require("jsonwebtoken")
const path = require('path')
app.use(cors())
const port = process.env.PORT || 5000
app.use('/public/uploads', express.static('public/uploads'))
app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) res.status(err.status);
  else res.status(500);
  res.render("error");
});
app.use(express.static(path.join(__dirname,'client/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname +'/client/build/index.html'))
})
const {couponCodesController} = require('./app/controller/couponCodesController')
app.use('/couponCode',couponCodesController)
const mongoose = require("./app/config/db");
const server = app.listen(port, () => console.log(`server is running at ${port}`));