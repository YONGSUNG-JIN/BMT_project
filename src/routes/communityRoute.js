const express = require('express');
const router = express.Router();
const communityCtrl = require('../controller/communityCtrl')

router.get('/', communityCtrl.viewCommunity);
router.get('/chat', communityCtrl.viewChat);
router.post('/chat', communityCtrl.postChat);


module.exports = router;