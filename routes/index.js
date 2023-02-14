var express = require('express');
var router = express.Router();
var jwtdecode = require('jwt-decode')
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers)
  
  if(!req.headers.authorization){
    res.status(403)
    res.set("x-auth-response", "403")
    res.set("x-auth-handler", "istio-ext-auth")
    res.json({"message": "failed to authenticate invocation"})
    return;
  }
  
  try{
  var token = req.headers.authorization.split(" ")[1]  
  var decoded = jwtdecode(req.headers.authorization);
  console.log(decoded);
  }catch(err){
    console.log(err)
    res.status(403)
    res.set("x-auth-response", "403")
    res.set("x-auth-handler", "istio-ext-auth")
    res.json({"message": "failed to authorize action, invalid token"})
  }
  
  if(decoded){
    console.log("API invocation is valid")
    res.status(200)
    res.set("x-auth-handler", "istio-ext-auth")
    res.set("x-auth-response", "200")
    res.set("x-auth-sessionid", uuidv4())
    res.set("x-auth-app-token", uuidv4())
    res.json({})
  }
  else{
    console.log("user is invalid")
    res.status(403)
    res.set("x-auth-response", "403")
    res.set("x-auth-handler", "istio-ext-auth")
    res.json({"message": "failed to authorize invocation"})
  }
});

module.exports = router;
