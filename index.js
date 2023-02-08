require('dotenv').config();
const express = require('express');
const app = express();
const port = 2000;
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
mongoose.set("strictQuery", true);
// const userRouter = require('./routes/userRouter')
const newRouter = require('./routes/newUserRouter')
app.set("view engine", "ejs")



// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
// app.use(userRouter)
app.use(newRouter)





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