let express= require('express')
const app = express()

app.use('/api', require('./Controllers'))


app.listen(3000)