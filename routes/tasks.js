const express = require('express');
const app = express();
const router = express.Router();
const { Task } = require('../models/task');
const { User } = require('../models/user');

app.use(express.json());


// post task
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = new Task( {
        id: _id,
        name: req.body.name,
        user: 
            User.email,
        // },
        category: req.body.category,
        status: req.body.status
    });

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
        user: User._id,
        category: req.body.category,
        status: req.body.status
    }, { new: true });

    res.send(task);


});

// mark tasks as done
router.put('/status/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).send('The task with given ID does not exist');
        return;
    }

    if (req.body.hasOwnProperty('status') === false) {
        res.status(400).send("Task cannot be changed - 'status' parameter is not defined");
        return;
    }

    task.status = req.body.status;
    const result = await task.save();
    res.send(result);
});


module.exports = router;