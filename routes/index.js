var express = require('express');
var router = express.Router();

const { generator } = require('../src/generator');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BIN-GENERATOR' });
});

router.get('/generate', function (req, res, next) {
  const params = req.query;
  const { number, valid, cvv, range, randomG, digits } = params;
  res.send(generator({ number: number, valid: valid, cvv: cvv, range: range, randomG: randomG, digits: digits }));
});

module.exports = router;
