const express = require('express')
const orders = require('./orders')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const port = 3000
const hostname = "localhost"

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

mongoose.connect('mongodb+srv://admin:6CrsKfkc3r3S7J6@cluster0.v9pdu.mongodb.net/orders?retryWrites=true&w=majority', 
        {useNewUrlParser: true,
        useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// middleware
app.use("/orders", orders)

app.get("/", (req, res) => {
    res.send("Hello Umberto Emonds")
})

app.get("*", (req, res) => {
    res.status(404).send('<iframe src="https://giphy.com/embed/zxt9AHjMEOtGM" width="480" height="271" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>La page demandée n\'existe pas...</p>')
})

app.listen(port, () => {
    console.log(`TP1 app listening at http://${hostname}:${port}/`)
})