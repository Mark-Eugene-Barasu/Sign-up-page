// jshint ESversion:6

import express from "express";
import bodyParser from "body-parser";
import request from "request";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// to import path and url modules
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const app = express();
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.write(`Works like magic \n`)
    // res.sendFile(`${__dirname}/signup.html`);
    res.write(`${__dirname}\\public\\signup.html`);
    res.send();
});



app.listen(3000, function(){
    console.log(`Server running on port: 3000`)
    // console.log(`${__filename}`);
    // console.log(`${__dirname}`); 
})


