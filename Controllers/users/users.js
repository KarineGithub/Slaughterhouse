const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'aasdsadlsakaasnddfgf231f'
const refreshSecret = 'pasasadlsakaasnddfof231f'
const { Pool } = require('pg')

require('dotenv').config()
let connectionString = process.env.postgresconnect

const pool = new Pool({
    connectionString,
    ssl: true
})

function createAccessToken(username) {
    return jwt.sign({ username }, secret, { expiresIn: '33s' })
}
function createRefreshToken(username) {
    return jwt.sign({ username }, refreshSecret)
}
router.use(bodyParser.json())

router.post('/signup', (req, res) => {
    let { username, password } = req.body
    pool.connect((err, client, done)=>{
        client.query('IF EXISTS (SELECT * FROM "Karine"."users" WHERE username = $1) 1 else 0', [username] )
        .then(data=>{
            if(bool === 1){
                res.send('Already exist')
            }
            if(bool === 0){
            bcrypt.hash(password, 10)
                .then(data => {
                    const hashed = data
                    pool.connect((err, client, done) => {
                        if (err) {
                            res.send(err)
                        }
                        client.query('INSERT INTO "Karine"."Users" VALUES($1,$2)', [username, hashed])
                            .catch(err => {
                                res.send(err)
                            })
                            .finally(() => {
                                done()
                            })
                    })
                    res.status(200).send(createAccessToken(username))
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send(err.detail)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
        .finally(() => {
            done()
        })
    })

})


module.exports = router