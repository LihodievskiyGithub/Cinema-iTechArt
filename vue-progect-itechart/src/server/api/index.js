const express = require('express');
const router = express.Router();
const moviesRoutes = require('./movies');  // пример файла

router.use("/movies", moviesRoutes);  // пример подключения


module.exports =  router;