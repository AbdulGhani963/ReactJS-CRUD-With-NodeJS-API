require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const ProductRoute =  require('./routes/ProductRoute');
const errorMiddleware = require('./middleware/ErrorMiddleware');
const cors = require('cors');
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONT_END = process.env.FRONT_END

var corsOptions = {
   origin: FRONT_END,
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/api/products', ProductRoute);

app.get("/", (req, res) => {
  res.send("Hello Page");
});

app.get("/blog", (req, res) => {
  res.send("Blog Page");
});

app.use(errorMiddleware);

mongoose.connect(MONGO_URL).then( () => {
   app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
   });
}).catch( (error) => {
   console.log(error)
});
