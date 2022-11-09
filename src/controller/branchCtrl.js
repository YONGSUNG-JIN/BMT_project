const BranchSchedule = require('../model/BranchSchedule.js');
const Branch = require('../model/Branch.js');

const viewBranchCtrl = async (req, res) => {
    const branchSchedule = await BranchSchedule.find({branch: res.locals.currentUser.branch}).sort({status:1, date:-1});
    const branchInfo = await Branch.findOne({ branch: res.locals.currentUser.branch });
    res.render('Branch.ejs', { branchSchedule, branchInfo })
}

const viewBranchSchedule = async (req, res) => {
    const branchSchedule = await BranchSchedule.findById({ _id: req.params.id });
    res.render('branchSchedule.ejs', { branchSchedule })
}

const addBranchSchedule = async (req, res) => {
    res.render('addBranchSchedule.ejs');
}

const postBranchSchedule = async (req, res) => {
    // const branch = res.locals.currentUser.branch;
    const { branch, title, category, content, date, status } = req.body;
    console.log(req.body)
    const newSchedule = await BranchSchedule.create({branch, title, category, content, date, status});
    console.log(newSchedule);
    res.redirect('/branch')
}

const viewEditbranchScheduleCtrl = async (req, res) => {
    const branchSchedule = await BranchSchedule.findById({ _id: req.params.id });
    res.render('editBranch.ejs', {branchSchedule});
}

const postEditbranchScheduleCtrl = async (req, res) => {
    const {title, category, content, date, status } = req.body;
    await BranchSchedule.findByIdAndUpdate({ _id: req.params.id },{title, category, content, date, status })
    res.redirect('/branch')
}


const deleteBranchSchedule = async (req, res) => {
    await BranchSchedule.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/branch')
}

module.exports = { viewBranchCtrl, viewBranchSchedule, addBranchSchedule, postBranchSchedule, deleteBranchSchedule, viewEditbranchScheduleCtrl, postEditbranchScheduleCtrl }