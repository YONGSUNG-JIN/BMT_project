const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({

    branch: {
        type: String,
        required: true
    },
    basicInfo: {
        registrationNo: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        floor: {
            type: String,
            required: true
        },
        capa: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    parking: {
        visitor: {
            free: {
                type: Number
            },
            paid: {
                daily: {
                    type: Number
                },
                hourly: {
                    type: Number
                }
            }
        },
        member: {
            monthly: {
                type: String
            },
        }
    }
}
);

// const branchScheduleSchema = new Schema({
//     title : {
//         type: String,
//         required: true
//     },    
//     category : {
//         type: String,
//         required: true
//     },
//     date : {
//         type: String,
//         required: true
//     },
//     content : {
//         type: String,
//         required: true
//     }
// }, { 
//     timestamps: 
//     true 
// });

// module.exports = mongoose.model('BranchSchedule', branchScheduleSchema);
module.exports = mongoose.model('Branch', branchSchema);
