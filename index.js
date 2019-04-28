const config = require('config');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const express = require('express');
const jwt_decode = require('jwt-decode')
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

const {
  User,
  validateUser
} = require('./models/user');

const {
  Task,
  validateTask

} = require('./models/task');

// if(!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   process.exit(1);
// }


mongoose.connect('mongodb://localhost/todo-app', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use('/api/tasks', tasks);
// app.use('/api/users', users);
app.use('/api', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// *********************Pobieranie i usuwanie taskow *********************

app.get('/api/tasks', async (req, res) => {
  const decoded = jwt_decode(req.query.token);
  const task = await Task.find({User:decoded._id});

  res.send(task);      
})

app.delete('/api/tasks', async (req, res) => { 
  console.log(req.query._id)
  await Task.deleteOne({_id:req.query._id})
});


// *********category***********

app.get('/api/tasks/category', async (req, res) => {

  const decoded = jwt_decode(req.query.token);
  const categoryTasks = await Task.find({User:decoded._id,category:`${req.query.category}`});  

  res.send(categoryTasks)
}); 