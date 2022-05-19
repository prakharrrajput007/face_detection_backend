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
    host : '127.0.0.1',
    port : 5432 ,
    user : 'postgres',
    password : 'prakhar',
    database : 'smart-brain'
  }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });


const app = express();

const saltRounds = 10;
app.use(cors());
app.use(express.json()); 



app.get('/', (req, res)=> {res.send(database.users)})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)} )
app.post('/register', (req, res) => { register.handleRegister(req , res , db , bcrypt) })
app.get('/profile/:id', (req,res)=> {profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImagecounts(req,res,db)} )

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})