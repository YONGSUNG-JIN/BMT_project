const express = require('express');
const branchCtrl = require('../controller/branchCtrl');
const router = express.Router();

router.get('/', branchCtrl.viewBranchCtrl);

router
    .get('/addSchedule', branchCtrl.addBranchSchedule)
    .post('/addSchedule', branchCtrl.postBranchSchedule);

router.get('/:id', branchCtrl.viewBranchSchedule);
router
    .get('/:id/edit', branchCtrl.viewEditbranchScheduleCtrl)
    .post('/:id/edit', branchCtrl.postEditbranchScheduleCtrl);

router.get('/:id/delete', branchCtrl.deleteBranchSchedule);

module.exports = router;