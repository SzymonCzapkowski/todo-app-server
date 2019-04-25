const express = require('express');

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