require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes  = require('./src/Routes/route')
const bodyParser = require('body-parser')

const corsOptions = {
    // origin: "http://localhost:5173",
    origin:  'https://swadehindustan.netlify.app' || process.env.Frontend_URL,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
// app.use(cors());
app.use(cors(corsOptions));

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", process.env.Frontend_URL);
  res.header("Access-Control-Allow-Methods", "ORIGIN , X-Requested-With,Content-Type, Accept");
  next();
})
 

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json());
app.use(routes)




const PORT = process.env.PORT || 8001;
require('./src/db/conn') //for connecting to mongodb



  app.listen(PORT,(req,res)=>{
    console.log(`listening on port ${PORT}`)
});