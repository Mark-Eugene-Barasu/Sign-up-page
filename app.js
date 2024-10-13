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
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/public/signup.html`);
});

app.post("/", function (req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.email;

    console.log(`User first name: ${firstName}`);
    console.log(`User last name: ${lastName}`);
    console.log(`User email address: ${emailAddress}`);
    res.send(`
        <h1>Welcome, ${firstName} ${lastName},</h1>
        <p>You will get frequent updates from out NewsLetter via your email: <a href='mailto:${emailAddress}'>${emailAddress} </a>\nThank you.
        </p>`);    
})



app.listen(3000, function(){
    console.log(`Server running on port: 3000`)
    // console.log(`${__filename}`);
    // console.log(`${__dirname}`); 
})


