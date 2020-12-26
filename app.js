const express = require('express')
const app = express()

const filedrops = require('./routes/filedrop-router')
const options = require('./options')
const version = require('./version')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {title: 'Startseite', ...options.config, version: version})
})

app.use('/static', express.static('static'))
app.use('/data', express.static('data'))
app.use('/', filedrops)

const port = 3000
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
