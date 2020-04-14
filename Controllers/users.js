const express = require('express')
const router = express()

const {Pool} = require('pg')

require('dotenv').config()
let connectionString = process.env.postgresconnect

const pool = new Pool({
    connectionString,
    ssl:true
})

router.get('/', (req, res)=>{
    pool.connect((err, client, done)=>{
           if(err){
               res.send(err)
           }
           client.query('SELECT * FROM "Karine".usersall WHERE ID = $1', [1])
           .then(data=>{
               return data.rows
           })
           .then(data1=>{
               res.send(data1)
           })
           .catch(err=>{
               res.send(err)
           })
           .finally(()=>{
               done()
           })
       
       })
   })

module.exports = router