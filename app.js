const express = require('express'); 
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){
    var firstname = req.body.fname
    var lastanme = req.body.lname
    var email = req.body.email 
    var data = {
      number:[
        {
          email_address: email,
          status: 'subscribed',
          merge_fields:{
            FNAME: firstname,
            LNAME: lastanme
          }
        }
      ]
    }
    var jsondata = JSON.stringify(data)
    var options={
      url: 'https://us18.api.mailchimp.com/3.0/lists/7b80f67abe',
      method: 'POST',
      headers:{
        'Authorization': 'angela1 b4b603b2e04fac087bc5c0acd0baed44-us18'
      },
      body: jsondata
    }
    request(options, function(error,response,body){
      if(error){
        res.sendFile(__dirname+ '/failure.html')
      } else {
        if(response.statusCode===200){
          res.sendFile(__dirname+ '/success.html')
        } else {
          res.sendFile(__dirname+ '/failure.html')
        }
      }
    })
})

app.post('/failure', function(req,res){
  res.redirect('/')
})

app.listen( process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});











// b4b603b2e04fac087bc5c0acd0baed44-us18