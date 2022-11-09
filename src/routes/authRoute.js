const express = require('express');
const router = express.Router();
const { logoutGetCtrl, loginGetCtrl, loginPostCtrl, registerGetCtrl, registerPostCtrl } = require('../controller/authCtrl')


router.get('/register', registerGetCtrl);
router.post('/register', registerPostCtrl)

router.get('/login', loginGetCtrl);
router.post('/login', loginPostCtrl)

router.get('/logout', logoutGetCtrl);

module.exports = router;
