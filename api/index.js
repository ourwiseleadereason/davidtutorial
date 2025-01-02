const express=require('express');
const cors=require('cors');
require('dotenv').config()
const mongoose = require('mongoose'); // Import mongoose
const bcrypt=require('bcryptjs');
const User = require('./models/User.js');
const jwt=require('jsonwebtoken');
const app=express();



app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }));

  mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res)=>{
    res.json('test ok');
});

app.post('/api/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password} = req.body;

    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
  });



app.listen(4000);