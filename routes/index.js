var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BIN-GENERATOR' });
});

router.get('/generate', function (req, res, next) {
  const params = req.query;
  const { number, valid, cvv } = params;
  res.send([params, { number, valid, cvv }, { number, valid, cvv }]);
});

module.exports = router;
