var express = require("express")
var router = express.Router()
const { v4: uuidv4 } = require('uuid')

//middleware
router.use(function timestamp(req, res, next){
    console.log(Date.now())
    // passe au middleware suivant
    next()
})

//middleware
router.use(function test(req, res, next){
    console.log(`METHOD: ${req.method} - URL: http://${req.hostname + req.baseUrl}/`)
    next()
})

router.get("/", (req, res) => {
    res.send("Voici la list des orders")
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`Voici l'order d'id : ${id}`)
})

router.post("/", (req, res) => {
    res.send(`Order d'id ${uuidv4()}`)
})

module.exports = router