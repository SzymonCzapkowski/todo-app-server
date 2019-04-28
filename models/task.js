const mongoose = require('mongoose');
const Joi = require('joi');


const Task = mongoose.model('Task', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    // User: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    category: {
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },

}));


function validateTask(task) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(255).required(),
        User: Joi.required(),
        category: Joi.string().valid(['work', 'home', 'personal']).required(),
        status: Joi.boolean().default(false)
    });
    return Joi.validate(task, schema);
}



exports.Task = Task;
exports.validateTask = validateTask;