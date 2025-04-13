const app = require("./index");
const { connectDb } = require("./config/db");
// const dotenv = require('dotenv');
require('dotenv').config();
const port = process.env.PORT||4000;
app.listen(port, ()=>{
    console.log("Running on port "+port);
})
connectDb();
app.get('/', async(req, res)=>{
    
  
    return res.status(200).send({
        message: "ket noi monggodb oke"
    })
})