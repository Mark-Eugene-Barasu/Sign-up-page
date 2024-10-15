// jshint ESversion:6

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

    const url = `https://us9.api.mailchimp.com/3.0/lists/0d790ef5f0`;

    const options = {
        method : `POST`,
        auth: `EugeneMarkKorkuBarasu:63b3dac34f04996a93f7a790b67ed7fc-us9`
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

// API 
// 63b3dac34f04996a93f7a790b67ed7fc-us9

// List ID
// 0d790ef5f0


// Initialization Code.
// MailchimpSDK.initialize(token: 63b3dac34f04996a93f7a790b67ed7fc-us9)
// var contact: Contact = Contact(emailAddress: "Insert Email Here")
// MailchimpSDK.createOrUpdate(contact: contact) { result in
//     switch result {
//     case .success:
//         print("Successfully added or updated contact")
//     case .failure(let error):
//         print("Error: \(error.localizedDescription)")
//     }
// }



/* Merge Field
--------------------
Merge Tag: FNAME
Name: First Name
Type: text (string)
--------------------
Merge Tag: LNAME
Name: Last Name
Type: text (string)
--------------------
Merge Tag: ADDRESS
Name: Address
Type: address
--------------------
Merge Tag: PHONE
Name: Phone Number
Type: phone (string)
--------------------
Merge Tag: BIRTHDAY
Name: Birthday
Type: birthday (string)
--------------------
Merge Tag: COMPANY
Name: Company
Type: text (string)
*/