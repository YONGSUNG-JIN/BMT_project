const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    sender : {
        type: String,
        required: true
    },
    receiver : {
        type: [String],
        required: true
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
        type: String,
        enum: ['A: Please Check','B: Checked','C: Holding', 'D: Done'],
    }
}, { 
    timestamps: 
    true 
})
module.exports = mongoose.model('Task', taskSchema)
