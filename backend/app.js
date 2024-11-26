require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require('./src/Routes/route');

const app = express();

const corsOptions = {
    origin: process.env.Frontend_URL || 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow preflight requests

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(routes);

const PORT = process.env.PORT || 8001;
require('./src/db/conn'); // for connecting to mongodb

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
