const express=require('express');
const mongoose=require('mongoose');
// const bodyParser=require('body-parser');
const crypto=require('crypto');
const dotenv=require('dotenv');
const cors= require('cors');

dotenv.config();

const app=express();

// app.use(bodyParser.json());

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Mongodb
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("Mongodb is connected"))
.catch((error)=>console.error("Mongodb is not connected because of "+error))

// Routes
// app.use('/api/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));


