const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");

const privateKey = fs.readFileSync("./privateKey.key", "utf-8");
const cert = fs.readFileSync("./certificate.crt", "utf-8");

const credentials = {
    key: privateKey,
    cert: cert
};



app.use(bodyParser.json());

const vapidKeys = {
    "publicKey": "BEiao96Q1unFcE6ZWo-ninSPZv_uwvcNfIJcHkBzzctBHyeV_qehnYEl6cKUis90Reu6HeY-iL9HncSpyp4eP6g",
    "privateKey": "Ze8jXD08XfKnRfrxenNyewZqQGJkpNorOme2x9whcw8"
};

webpush.setVapidDetails("mailto:valentyn.hrcek@gmail.com",
vapidKeys.publicKey, vapidKeys.privateKey);

app.post("/subscribe", (req, res)=>{
    const subscription = req.body;

    const payload = JSON.stringify({
        title: "Push notification example"
    });

    const notificationPayload = {
        "notification": {
            "title": "Notification Title",
            "body": "Notification body text",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    setInterval(() => {
        console.log("Notification sent!");
        webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
        .catch(error => {
            console.error(error);
        });  
    }, 15000);

    console.log(subscription);
    res.status(201).json();
})

const p = path.join(__dirname, "../frontend/dist/frontend/index.html");

app.get("/", (req, res)=>{
    res.sendFile(p);
})

app.use(express.static("../frontend/dist/frontend"));

const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

httpsServer.listen(port);
//httpServer.listen(port);