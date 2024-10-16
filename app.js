// jshint ESversion:6

// internal modules
import { api } from "./api.js";
import { listID } from "./api";


//npm packages
import express from "express";
import bodyParser from "body-parser";
import request from "request";
import https from "https"

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// to import path and url modules
import path from 'path';
import { fileURLToPath } from 'url';
import { subscribe } from "diagnostics_channel";

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
    // res.send(`
    //     <h1>Welcome, ${firstName} ${lastName},</h1>
    //     <p>You will get frequent updates from out NewsLetter via your email: <a href='mailto:${emailAddress}'>${emailAddress} </a>\nThank you.
    //     </p>`);    

    // creating an Object
    const data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    // Now, to we need to turn this object above into flat pack JSON
    const jsonData = JSON.stringify(data);

    const url = `https://us9.api.mailchimp.com/3.0/lists/${listID}/members`; // updated

    const options = {
        method : `POST`,
        auth: `EugeneMarkKorku:${api}`

    }

    // create our HTTPS request
    const request = https.request(url, options, function(response) {
        response.on(`data`, function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});



app.listen(3000, function(){
    console.log(`Server running on port: 3000`)
    // console.log(`${__filename}`);
    // console.log(`${__dirname}`); 
});

// Everything works successfully