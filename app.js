// jshint ESversion:6

import express from "express";
import bodyParser from "body-parser";
import request from "request";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.send(`Server running Successfully`);
})










app.listen(3000, function(){
    console.log(`Server running on port: 3000`)
})


