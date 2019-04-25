const express = require('express');

const router = express.Router();
const taskList = [
    { 
        id: 1,
        subject: 'mleko',
        done: false
    }
];

// mark tasks as done
router.put('/:id', (req, res) => {
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


module.exports = router;

const app = express();

app.use(express.json());

const tasks = [{
        id: 1,
        name: 'Create app'
    },
    {
        id: 2,
        name: 'Make a dinner'
    },
    {
        id: 3,
        name: 'Watch TV'
    },
];

/*
app.get('/api/tasks', (req, res) => {
    res.send(tasks);
});
*/

app.post('/api/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        name: req.body.name
    };
    tasks.push(task);
    res.send(task);
});


app.put('/api/tasks/:id', (req, res) => {

    task.name = req.body.name;
    res.send(task)
})







app.listen(3000, () => {
    console.log('server started on port 3000');
});