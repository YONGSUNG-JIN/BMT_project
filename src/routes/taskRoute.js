const express = require('express');
const router = express.Router();
const { viewTaskListCtrl, viewTaskCtrl, viewAddTaskCtrl,  addTaskCtrl, viewEditTaskCtrl, postEditTaskCtrl, deleteTaskCtrl } = require('../controller/taskCtrl')

router.get('/', viewTaskListCtrl);

router.get('/add', viewAddTaskCtrl);
router.post('/add', addTaskCtrl);
router.get('/:id', viewTaskCtrl);
router
    .post('/:id/edit', postEditTaskCtrl)
    .get('/:id/edit', viewEditTaskCtrl);
router.get('/:id/delete', deleteTaskCtrl);

module.exports = router;
