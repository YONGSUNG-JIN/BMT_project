const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const {title, category, date, content } = req.body;
    const newSchedule = await BranchSchedule.create({title, category, date, content});
    console.log(newSchedule);
})

module.exports = router;