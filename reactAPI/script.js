const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');




const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
    port: 5432,
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PW,
    database:process.env.DB
  },
});



const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send(database.users);})




app.post('/signin',signin.handleSignin(db,bcrypt))
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)} )
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

//Keeps the server runnning 
app.listen(3000, () => {
  console.log('app is running on port 3000');
})