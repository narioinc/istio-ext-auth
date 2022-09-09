var express = require('express');
var router = express.Router();

router.get('/live', function(req, res, next) {
  res.status(200)
  res.json({})
});

router.get('/ready', function(req, res, next) {
  res.status(200)
  res.json({})
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers)
  if(req.headers.authorization && req.headers.authorization.includes('narioinc89')){
    res.status(200)
    res.json({})
  }
  else{
    res.status(403)
    res.json({"message": "failed to authenticate"})
  }
});


module.exports = router;
