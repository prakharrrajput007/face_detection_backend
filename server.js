const express = require('express');
const bodyParser = require('body-parser'); 
const bcrypt=require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');

const signin = require('./controllers/signin');

const profile = require('./controllers/profile')

const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});
// const { Client } = require('pg');

// const db = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// db.connect();

// db.select('*').from('users').then(data => {
//     console.log(data);
// });


const app = express();
app.use(cors());
app.use(express.json()); 



app.get('/', (req, res) => { res.send('working!!!')})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)} )
app.post('/register', (req, res) => { register.handleRegister(req , res , db , bcrypt) })
app.get('/profile/:id', (req,res)=> {profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImagecounts(req,res,db)} )
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
app.listen(process.env.PORT || 3000, function(){
  console.log("server listening on port %d in %s mode", this.address().port, app.settings.env);
});