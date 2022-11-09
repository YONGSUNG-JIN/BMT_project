const express = require('express');
const homeCtrl = require('../controller/homeCtrl');
const router = express.Router();

router.get('/', homeCtrl)

module.exports = router;