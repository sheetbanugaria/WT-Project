const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routes/auth');
const cookieParser = require('cookie-parser');
const recipeRouter = require('./Routes/reciper');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/auth', userRouter);
app.use('/recipe', recipeRouter);

mongoose.connect('mongodb+srv://SheetBanugaria:Sheet2005@cluster0.q4zmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


app.listen(3001, () => {
    console.log('Server Started')
})