
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");  

const Products = require("./models/productsSchema");

const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");


app.use(express.json());
app.use(cookieParser("your-secret-key"));
app.use(cors({ origin: ['https://amazon-clone1-clientss.vercel.app', 'http://localhost:3000'] , credentials :  true, methods: ["POST", "GET", "PUT", "DELETE"]}));
app.use(router);



const port = 8005;


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});

DefaultData();
