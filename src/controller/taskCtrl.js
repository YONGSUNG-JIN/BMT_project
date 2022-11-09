const Task = require('../model/Task');

const viewTaskListCtrl = async (req, res) => {
    const taskList = await Task.find({$or:[{sender:res.locals.currentUser.branch},{receiver:{$all:[res.locals.currentUser.branch]}}]})
    .sort({status:1, date:-1}); 
    console.log(taskList)
    res.render('taskList.ejs', { taskList })
}
    
const viewTaskCtrl = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id });
    res.render('task.ejs', { task })
}

const viewAddTaskCtrl = async (req, res) => {
    res.render('addTask.ejs')
}

const addTaskCtrl = async (req, res) => {
    const receiver = req.body.receiver.split(',');
    const {sender, title, category, content, date, status  } = req.body;
    console.log(receiver)
    await Task.create({sender, receiver, title, category, content, date, status  });
    res.redirect('/task')
}

const viewEditTaskCtrl = async (req, res) => {
    const task = await Task.findById({ _id: req.params.id });
    res.render('editTask.ejs', {task});
}

const postEditTaskCtrl = async (req, res) => {
    const {sender, receiver, title, category, content, date, status } = req.body;
    await Task.findByIdAndUpdate({ _id: req.params.id },{sender, receiver, title, category, content, date, status })
    res.redirect('/task')
}

const deleteTaskCtrl = async (req, res) => {
    await Task.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/task')
}
// const editTaskCtrl = async (req, res) => {
//     res.render('editTask.ejs')
// }
// const postTaskCtrl = async (req, res) => {
//     res.render('editTask.ejs')
// }

module.exports = { viewTaskListCtrl, viewTaskCtrl, addTaskCtrl, viewAddTaskCtrl, viewEditTaskCtrl, postEditTaskCtrl, deleteTaskCtrl }