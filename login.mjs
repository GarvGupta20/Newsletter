//jshint esversion:6
import {client_id,client_secret,list_id,templatee_id,bearer} from "./secrets.mjs";
import fs from "fs";
import express from "express";
import bodyparser from "body-parser";
import axios from "axios";

/*const secret=require("secrets")
const  express=require("express");
const fs=require("fs");
const bodyparser=require("body-parser");
const axios=require("axios");*/

//this is to send the login page
const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",(req,res) => {
  res.sendFile(process.cwd()+"/index.html");
});



const config= {
  headers: {
    "Authorization":"Bearer " + bearer()

  }
};




//using this we get the resulting key

/*const options= {
      "grant_type":"client_credentials",
   "client_id":client_id(),
   "client_secret":client_secret()
 };

axios.post("https://api.sendpulse.com/oauth/access_token",options).then((response) => {
  console.log(response.data.access_token);
}).catch((error) => {
  console.log(error);
});*/



/*as the documentation swe need to generate the token every hour we can simply call this api as it will provide us with the
token which will remain each time*/


//this is to add people to the mailing list
app.post("/",(req,res) => {
  console.log(req.body);

  var data= {
    "emails":[{"email":req.body.email,"variable": {
      "name":req.body.name,
       "phonenumber":req.body.phonenumber
    }}]
  };


  axios.post("https://api.sendpulse.com/addressbooks/"+list_id()+"/emails",data,config).then((response) => {
    console.log(response.data);
    res.sendFile(process.cwd()+"/succes.html");
  }).catch((error) => {
      console.log(error);
      res.sendFile(process.cwd()+"/notsucesss.html");
    });
});


app.post("/success",(req,res) => {
  res.redirect("/");
});


app.post("/NOTSUCCESS",(req,res) => {
  res.redirect("/");
}
);


/*var data={
  "sender_name":"Garv Gupta",
    "sender_email":"garvg7904@gmail.com",
    "subject":"hello bitx",
    "list_id":list_id(),
    "name":"timepass",
    "template_id": templatee_id()
};

/*var  options1= {
  "bookName":"list of mails"
};

const config= {
  headers: {
    "Authorization":"Bearer " +  bearer()

  }
};

//this is to send the emails to the list

axios.post("https://api.sendpulse.com/campaigns",data,config).then((response) => {
  console.log("email sent");
}).catch((error) => {
  console.log(error);
});*/



//this is to get the all the templates stored so we can select to send the following mail

/*axios.get("https://api.sendpulse.com/templates",config).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});*/


//code to get the resulting adress mail id

/*axios.post("https://api.sendpulse.com/addressbooks",options1,config).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});*/


app.listen(3000,(err) => {
  if(err) {
    console.log("sorry the server cant be set up");
  }
  else{
      console.log("your server is set");
  }

});
