const express = require('express')
const router = express()

//router.use('/signup', require('./signup'))
//router.use('/login', require('/login'))
router.use('/users', require('./users/users'))
//router.use('/farmers', require('./farmer/farmer'))
//router.use('/slaughterhouses', require('./slaughterhouse/slaughterhose'))

module.exports = router