require('dotenv').config()

const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const app = express();
const path = require("path")

app.use(cors());
app.options('*', cors());
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Accept-Ranges', 'bytes');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(express.json({extended: false}));
const uri = process.env.ATLAS_URI;
mongoose.connect(
  uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  function(error) {
    if (error){
      console.log(error);
    }
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.use("/public", express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../Frontend/dist/Frontend'));

app.use('/api/users', require('./routes/Users'));
app.use('/api/groceries', require('./routes/Groceries'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));