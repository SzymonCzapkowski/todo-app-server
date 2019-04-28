const config = require('config');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const express = require('express');
const app = express();

const {
  User,
  validateUser
} = require('./models/user');

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
  const task = await User.find();
  res.send(task);      
})

app.delete('/api/tasks/', async (req, res) => { 
  console.log(req.query._id)
  await User.deleteOne({_id:req.query._id})
});


// *********category***********

app.delete('/api/tasks/category1', async (req, res) => { 
  const taskCategory1 = await User.find({category:`${req.query.category}`});
  res.send(taskCategory1); 
  app.get('/api/tasks/category1', async (req, res) => {
  res.send(taskCategory1);      
  });
})

app.delete('/api/tasks/category2', async (req, res) => { 
  const taskCategory2 = await User.find({category:`${req.query.category}`});
  res.send(taskCategory2); 
  app.get('/api/tasks/category2', async (req, res) => {
  res.send(taskCategory2);      
  });
})

app.delete('/api/tasks/category3', async (req, res) => { 
  const taskCategory3 = await User.find({category:`${req.query.category}`});
  res.send(taskCategory3); 
  app.get('/api/tasks/category3', async (req, res) => {
  res.send(taskCategory3);      
  });
})

app.delete('/api/tasks/category4', async (req, res) => { 
  const taskCategory4 = await User.find();
  res.send(taskCategory4); 
  app.get('/api/tasks/category4', async (req, res) => {
  res.send(taskCategory4);      
  });
})

// app.get('/api/tasks/category3', async (req, res) => {
//   const categoryTasks = await User.find({category:`${req.query.category}`});  
//   console.log(categoryTasks)
//   // res.send(categoryTasks)
// }); 