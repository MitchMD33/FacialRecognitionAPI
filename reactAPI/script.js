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
    connectionString: 'dpg-cq92fr2ju9rs73auvjd0-a.oregon-postgres.render.com',
    ssl: {rejectUnauthorized: false},
    port: 5432,
    user:'frdb_hzfw_user',
    password:' oBKxvLSbjZz16EDE0L0ffwiBoDck4vXD',
    database: 'frdb_hzfw'
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