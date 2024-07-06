require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes  = require('../src/Routes/route')
const bodyParser = require('body-parser')

// const corsOptions = {
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
// };
app.use(cors());
// app.use(cors(corsOptions));

 

app.use(express.json());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(routes)




const PORT = process.env.PORT || 8001;
require('../src/db/conn') //for connecting to mongodb



  app.listen(PORT,(req,res)=>{
    console.log(`listening on port ${PORT}`)
});