const express = require('express');
const app = express();
const router = express.Router();
const jwt_decode = require('jwt-decode');
const {
    Task,
    validateTask
} = require('../models/task');


app.use(express.json());



// post task
router.post('/', async(req, res) => {
    const userDecoded = jwt_decode(req.query.token);
    const {
        error
    } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = new Task({
        //id: _id,
        name: req.body.name,
        User: new mongoose.Types.ObjectId(userDecoded._id),
        category: req.body.category,
        status: false
    });

    const result = await task.save();
    res.send(result);
});

//edit task
router.put('/edit/:id', async(req, res) => {
    const userDecoded = jwt_decode(req.query.token);

    const {
        error
    } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const task = await Task.findByIdAndUpdate(req.params.id, {
        id: _id,
        name: req.body.name,
        User: new mongoose.Types.ObjectId(userDecoded._id),
        category: req.body.category,
        status: false
    }, {
        new: true
    });

    res.send(task);
});




module.exports = router;