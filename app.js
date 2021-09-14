const express= require('express');
const bodyparser = require("body-parser");
const https = require("https");
const request = require("request");
var path = require('path');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));


app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res)

{
     res.sendFile(__dirname+ "/index.html");
});

app.post("/ff",function(req,res)
{
     const firstname = req.body.fname;
     const lastname = req.body.subject;
     const emailname = req.body.email;
     const data ={
         members:[{
              email_address:emailname,
              status:"subscribed",
              merge_fields:
              {
                   LNAME:lastname,
                   FNAME:firstname,
            
                   
              }
         }]
   };
    var jsonData=JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/3aa032d2e8";
    const option=
    {
         method:"POST",
         auth:"satyan:47f2b37f7a852135074a024a68dc967a-us5"
    }
   const request= https.request(url,option,function(responds)
    {
          if(responds.statusCode==200)
          {
               res.sendFile(__dirname+"/sucess.html");
          }
          else{
               res.sendFile(__dirname+"/failuer.html")
          }
          responds.on("data",function(data)
          {
               console.log(JSON.parse(data));
          })
         
    })
    request.write(jsonData);
    request.end();
    
});


app.listen(process.env.PORT || 3000,function()
{
 console.log("listening at port 3000");

});