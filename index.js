const express = require('express')
const orders = require('./orders')

const app = express()

const port = 3000
const hostname = "localhost"

// middleware
app.use("/orders", orders)

app.get("/", (req, res) => {
    res.send("Hello Umberto Emonds")
})

app.listen(port, () => {
    console.log(`TP1 app listening at http://${hostname}:${port}/`)
})