const express = require('express');
const connectToDb = require('./config/db');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/article');
const categoryRouter = require('./routes/category');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();
connectToDb();
const port = process.env.PORT
app.use(express.json());
app.use(express.static("public/upload"))

app.use("/users",userRouter);
app.use("/article",articleRouter);
app.use("/category",categoryRouter);

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})