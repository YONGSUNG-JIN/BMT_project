const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchScheduleSchema = new Schema({
    branch : {
        type: String,
    },    
    title : {
        type: String,
        required: true
    },    
    category : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    status: {
        type: String
    }
}, { 
    timestamps: 
    true 
});

module.exports = mongoose.model('BranchSchedule', branchScheduleSchema);