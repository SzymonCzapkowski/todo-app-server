const express = require('express');
const app = express();

const router = express.Router();

const {
    Task,
} = require('../models/task')

app.use(express.json());



// mark tasks as done
router.put('/api/tasks/status/:id', (req, res) => {
    const task = taskList.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('The task with given ID does not exist');
        return;
    }

    if (req.body.hasOwnProperty('done') === false) {
        res.status(400).send("Task cannot be changed - 'done' parameter is not defined");
        return;
    }

    task.done = req.body.done;
    res.send(task);
});



router.post('/api/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        name: req.body.name
    };
    tasks.push(task);
    res.send(task);
});


router.put('/api/tasks/edit/:id', (req, res) => {

    task.name = req.body.name;
    res.send(task)
})


    
    
    router.get('/api/tasks', async (req, res) => {
        const task = await Task.find();
        res.send(task);       
    })

module.exports = router;