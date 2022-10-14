const express = require('express');
require('dotenv').config();
require('./models/db');
const User = require('./models/user');
const userRouter = require('./routes/user');

const app = express();

// app.use((req, res, next) => {
//   req.on('data', chunk => {
//     const data = JSON.parse(chunk);
//     req.body = data;
//     next();
//   });
// });


app.use(express.json());
app.use(userRouter);

app.get('/', async (req, res) => {
    const user = await User.find()
    console.log(user);
    res.send('Hello world');
  });

  app.post('/', async (req, res) => {
    const isNewUser = await User.isThisEmailInUse(req.email)
    if(isNewUser){
      return res.json({
        success: false,
        message: 'This email is already in use, try sign-in',
      })
    }
    const user = await User({
        name: "test user",
        email: "abc@gmail.com",
        password: "withouthash",
      });
      await user.save();
      res.json({ success: true, user });
    // res.send('Hello world');
  });

  
app.listen(3000, () => {
    console.log('port is listening');
  });
  