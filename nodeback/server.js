const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const con = require("./connection");

require('dotenv').config();

const crudRoutes = require("./routes/crud");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/",crudRoutes);

app.listen(port, ()=>{
    console.log('Szerver elindult a következő porton: '+port);
});