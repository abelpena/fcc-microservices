// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Get route /api/ and return current time in unix and utc
app.get("/api/", function (req, res) {
  //let time = new Date.now();
  let utc = new Date().toUTCString();
  res.json({unix: Date.now(), "utc": utc});
});

// Get route given valid date and parse
// if valid then return unix and utc, else return json error
app.get("/api/:date", function (req, res) {
  let time = Date.parse(req.params.date);
  let timestamp = new Date(Number(req.params.date));
  console.log(time)
  if(isNaN(time)&&!timestamp instanceof Date && isFinite(timestamp))
    return res.json({error: "Invalid Date"});
  console.log(req.params.date)

  //if time is a number
  if(!isNaN(time)){
    console.log("date parsed correctly")
    console.log(time);
    let utc = new Date(req.params.date).toUTCString();
    res.json({unix: time, "utc": utc});
  } else if (isNaN(time)){
      let utc = new Date(Number(req.params.date)).toUTCString();
      if(utc == 'Invalid Date' || Number(req.params.date)==null)
        return res.json({error: "Invalid Date"});
      res.json({unix: Number(req.params.date), "utc": utc});
  }
  //let time = new Date.now();
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
