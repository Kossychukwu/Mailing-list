
const express = require("express");

const axios = require("axios");

const mailchimp = require('@mailchimp/mailchimp_marketing');

const { urlencoded, response } = require("express");



const https = require("https");

const bodyParser = require("body-parser");

const path = require("path");

const app = express();

const PORT = 3000;

// app.use(express.json());

app.use(express.static('/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.urlencoded({ extended : true}));

app.use(express.static((path.join(__dirname))));

app.use(express.json());


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/signup.html'))

});

app.post('/failure', (req, res) => {
    res.redirect('/')
})


app.post("/", function(req, res){
 
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
 
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
 
    const jsonData = JSON.stringify(data);
 
    const url = "https://us13.api.mailchimp.com/3.0/lists/e15ec40688";
 
    const options = {
        method: "POST",
        auth: "rick:c2061c738661e337b3ae4549cb75e71a-us13"
    };
 
    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(path.join(__dirname, '/success.html'))
        }
        else{
            res.sendFile(path.join(__dirname, '/failure.html'))
        }
 
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
 
    request.write(jsonData);
    request.end();
 
});




app.listen(PORT, () => {
    console.log("server running at port 3000");
})




