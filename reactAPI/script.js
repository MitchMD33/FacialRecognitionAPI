const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name:'John',
      email: 'john@gmail.com',
      password:'cookies',
      entries: '0',
      joined: new Date()
    },
    {
      id: '124',
      name:'Mike',
      email: 'mike@gmail.com',
      password: 'cookies',
      entries: '0',
      joined: new Date()
    }
    
  ],
  login: [
    {
      id: '987',
      hash:'',
      email:'john@gmail.com'
    }

  ]
} 


app.get('/', (req, res) => {
  res.send(database.users);

})

//For the login page
app.post('/signin', (req, res)=> {
  bcrypt.compare("apples", '$2a$10$1JeOJZQ4bes.S9Ff.utqae/COepUQTfmzZNKG8vsHitw7iNhTi9qa', function(err, res) {
     console.log('first guess', res);

  });
  bcrypt.compare("veggies", '$2a$10$1JeOJZQ4bes.S9Ff.utqae/COepUQTfmzZNKG8vsHitw7iNhTi9qa', function(err, res) {
    console.log('second guess', res);
  });

  if (req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password) {
      res.json('success');
    } else {
      res.status(400).json('error logging in')
    }
  })

//Keeps the server runnning 
app.listen(3000, () => {
  console.log('app is running on port 3000');
})

//push new user to the database 
app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
  database.users.push({
      id: '125',
      name: name,
      email:  email,
      entries: '0',
      joined: new Date()
  })
  res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  const found = false;
  database.users.forEach(user => {
   if (user.id === id) {
    return res.json(user);
    found = true;
    
   } 
  })
  if (!found) {
    res.status(404).json('This user does not exist.');
   }
})

app.post('/image', (req, res) => {
  const {id} = req.body;
  const found = false;
  database.users.forEach(user => {
   if (user.id === id) {
    user.entries++
    return res.json(user.entries);
    found = true;
   } 
  })
  if (!found) {
    res.status(404).json('No image found.');
   }
})

/*bcrypt.hash("bacon", null, null, function(err, hash) {
  // Store hash in your password DB.
});

// Load hash from your password DB.


*/





/*

/profile/:userID ---> GET = user
/image --> PUT --> user 
*/