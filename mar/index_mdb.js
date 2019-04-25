const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/todolist')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection to MongoDB failed', err));


const taskSchema = new mongoose.Schema({
    name: String
});

const Task = mongoose.model('Task', taskSchema);

async function createTask() {
    const task = new Task({
        name: 'Move a mountain'
    });

    const result = await task.save();
    console.log(result);
};
createTask();


async function updateTask(id) {
    const result = await Task.update({ _id: id }, {
        $set: {
            name: 'Bake a cake'
        }
    });

    console.log(result);
};

updateTask();