require("dotenv").config();
const express = require("express");
const app = express();
const port = 2000;
const mongoose = require("mongoose");
const notFound = require("./middleware/notFound");
mongoose.set("strictQuery", true);
// const userRouter = require('./routes/userRouter')
const newRouter = require("./routes/newUserRouter");
app.set("view engine", "ejs");
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

// routes
// app.use(userRouter)
app.use(newRouter);

// set cookies
app.get("/example", (req, res) => {
  res.cookie("isAdmin", true);

  res.send("cookies set");

  res.cookie("another", false, {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: true,
  });
  res.send("cookie set");
});



app.get("/get", (req, res) => {
  const cookies = req.cookies;
  const { isAdmin } = cookies;
  res.json(cookies);
});



// error route
app.use(notFound);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGDB);
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
