require('dotenv').config();
const express = require('express');
const app = express();
const port = 2000;
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
mongoose.set("strictQuery", true);
const userRouter = require('./routes/userRouter')



// middleware
app.use(express.json());


// routes
app.use(userRouter)



// error route
app.use(notFound)


const start = async () => {
    try{
        await mongoose.connect(process.env.MONGDB);
        app.listen(port, ()=> {
            console.log(`server is running on port ${port}`)
        })

    }catch(error) {
        console.log(error)
    }
}
start()