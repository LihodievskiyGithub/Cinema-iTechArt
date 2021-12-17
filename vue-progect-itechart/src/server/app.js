const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const routes = require("./api/index.js");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const User = require("./model/User");
const jwt = require("jsonwebtoken");

// роуты
const movies = require("./api/movies");
const sessions = require("./api/sessions");
const cities = require("./api/city");
const cinemas = require("./api/cinema");
const dates = require("./api/date");
const times = require("./api/time");
const halls = require("./api/hall");


// ...

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/signup", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "email in use",
      });
    }
    return res.status(200).json({
      title: "signup success",
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    if (!user) {
      return res.status(401).json({
        title: "user not found",
        error: "invalid credentials",
      });
    }
    //incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        tite: "login failed",
        error: "invalid credentials",
      });
    }
    //IF ALL IS GOOD create a token and send to frontend
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      title: "login sucess",
      token: token,
    });
  });
});

// grabbing user info
app.get('/user', (req, res) => {
  let token = req.headers.token; //token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'unauthorized'
    })
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: "user grabbed",
        user: {
          email: user.email,
          username: user.username,
        },
      });
    })

  })
})

app.use("/api/sessions", sessions);
app.use("/api/movies", movies);
app.use("/api/city", cities);
app.use("/api/cinema", cinemas);
app.use("/api/date", dates);
app.use("/api/time", times);
app.use("/api/hall", halls);




// app.get("/Login", (req, res) => {
//   res.render("index", { title: "Home" });
// });

mongoose
  .connect("mongodb://localhost:27017/node-auth-progect", {
    // userNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Mongo connection");
    app.use("/api", routes);
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  });
