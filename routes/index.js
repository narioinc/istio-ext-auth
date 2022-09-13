var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers)
  if(req.headers.authorization && req.headers.authorization.includes('narioinc89')){
    res.status(200)
    res.json({"status": "ok"})
  }
  else{
    res.status(403)
    res.json({"message": "failed to authenticate"})
  }
});


module.exports = router;
