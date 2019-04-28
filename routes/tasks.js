const express = require('express');
const app = express();
const router = express.Router();
const { Task } = require('../models/task');
const { User } = require('../models/user');

app.use(express.json());


//get tasks

router.get('/', async(req, res) => {
    const task = await Task.find();
    res.send(task);
});


// post task
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = new Task {
        id: _id,
        name: req.body.name,
        user: {
            User.email
        },
        category: req.body.category,
        status: req.body.status
    };

    const result = await task.save()
    res.send(result);
});

//edit task
router.put('/edit/:id', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const task = await Task.findByIdAndUpdate(req.params.id, {
        id: _id,
        name: req.body.name,
        user: {
            User._id
        },
        category: req.body.category,
        status: req.body.status
    }, { new: true });

    res.send(task);


});

// mark tasks as done
router.put('/status/:id', (req, res) => {
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




router.get('/', async(req, res) => {
    const task = await Task.find();
    res.send(task);
})

module.exports = router;