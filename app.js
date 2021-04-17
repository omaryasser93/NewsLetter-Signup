const express = require("express");
const  bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { STATUS_CODES } = require("http");

const app = new express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;
    const data = {
       members:[{
           email_address:email,
           status:"subscribed",
           merge_fields:{
               FNAME:firstName,
               LNAME:lastName,
           }
       }]

    };
    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/b10ff631ab" ;

    const options = {
        method:"POST",
        auth:"oyassr93@gmail.com:3fc4bf3c4ba46c4e388034cbb07e466c-us1"
    };

    const request = https.request(url,options,function(response){

        if(response.statusCode===200){
          res.sendFile(__dirname + "/success.html");
        }else{
          res.sendFile(__dirname + "/failure.html");
        }
      response.on("data", function(data){

        console.log(JSON.parse(data));
       
      });

    });
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
 console.log("Server is working on port 3000");
});


//APIKey = 3fc4bf3c4ba46c4e388034cbb07e466c-us1

//listId = b10ff631ab


//https://peaceful-plateau-67510.herokuapp.com/