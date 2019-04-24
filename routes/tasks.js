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
