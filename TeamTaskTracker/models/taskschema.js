const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: String,
    createdBy: String,
    assignedTo: String
})

module.exports = mongoose.model('Task', taskSchema)