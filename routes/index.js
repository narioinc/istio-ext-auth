var express = require('express');
var router = express.Router();
var jwtdecode = require('jwt-decode')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers)
  if(!req.headers.authorization){
    res.status(403)
    res.json({"message": "failed to authenticate"})
  }
  
  try{
  var decoded = jwtdecode(req.headers.authorization);
  console.log(decoded);
  }catch(err){
    console.log(err)
    res.status(403)
    res.json({"message": "failed to authorize action, invalid token"})
  }
  
  if(decoded.name === 'narioinc89'){
    console.log("user is valid")
    res.status(200)
    res.json({})
  }
  else{
    console.log("user is invalid")
    res.status(403)
    res.json({"message": "failed to authorize action"})
  }
});

module.exports = router;
