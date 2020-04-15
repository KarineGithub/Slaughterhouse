const express = require('express')
const app = express()

const {Pool}=require('pg')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
let connectionString = process.env.postgresconnect

const pool = new Pool({
    connectionString,
    ssl: true
})


const secret = 'aasdsadlsakaasnddfgf231f'
const refreshSecret = 'pasasadlsakaasnddfof231f'

app.use('/api', require('./Controllers'))
app.post("/s", (req, res) => {

 // let { username, password } = req.body
  //bcrypt.hash(password, 10)
      //.then(data => {
         // const hashed = data
          pool.query('SELECT * from "Karine".users')
          //INSERT INTO "Karine".users(username, password) VALUES ($1,$2)', [username, hashed])
          .then(data=>{
              res.send(data.rows)
          })
          .catch(err=>{
              res.send(err)
          })
       
    //  })
      //.catch(err => {
     //     res.status(500).send(err.detail)
    //  })
})
  /*
app.post('/login', (req,res)=>{
    const user = pool.query('select username from "Karine".users where username = ' + req.body.username) ,
    if(user === null){
        res.status(401).send('cannot find user')
    }
    const pass = pool.query('select password from "Karine".users where username = ' + user)
    bcrypt.compare(req.body.password, pass)
    .then(data =>{
        if(data){
            let accessToken = createAccessToken(user)
            let refreshToken = createRefreshToken(user)
            res.status(200).send(accessToken, refreshToken)
        }else{
           res.status(403).send('bad password')
        }
        console.log('bool', data)
    })
    .catch(error=>{
        console.log(error)
        res.status(403).send('bad password')
    })
    res.send('user added')
  })
  

  app.post('/token',(req, res)=>{
    const refreshToken = req.body.token
    if(!refreshToken){
      res.status(404).send('Please, send refresh token')
    }
    jwt.verify(refreshToken, refreshSecret, (err, user)=>{
      if(err){
        res.send('wrong refresh token')
      }else{
        let accessToken = createAccessToken(user)
        res.send(accessToken)
      }
    })
  })
  
  function checkToken(req, res, next) {
    const authHeader = req.headers['auth']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
      res.status(402).send("Token is null. Please, send a token")
    }
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.log(err)
        res.status(404).send("Wrong token")
      }
      else {
        req.user = user
        next()
      }
    })
  
  }
  */
app.listen(3000)