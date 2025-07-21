const express = require('express')
const dotenv = require('dotenv');
const { router} = require('./routes/route.js')
const app = express();
const mongoose = require('mongoose');
const { User_router } = require('./routes/user_route.js');
const cors = require("cors")
const cookieParser =require("cookie-parser")

require('dotenv').config();

const PORT = process.env.PORT

const DB_URI = process.env.MONGODB_URI

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:["Content-Type","Authorization"] // Add other headers you want to allow here
}))


//Database Connection code
   

    try{
         mongoose.connect(DB_URI)
        console.log("connected to Database");
        
    }catch(error){
        console.log(error);
        
    }

//routes

app.use('/todo',router)     
app.use('/user',User_router)     
// app.get('/',(req,res)=>{
// })

// app.post('/',(req,res)=>{
    
// })




app.listen(PORT,()=>{
    console.log('Server is running on '+ PORT);
})