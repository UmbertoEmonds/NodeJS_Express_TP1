var express = require("express")
var router = express.Router()
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    description : {type: String, required: true},
    imageUrl : {type: String, required: true},
    userId : {type: String, required: true},
    price : {type: Number, required: true}
})

let OrderModel = mongoose.model('order', orderSchema)

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

    OrderModel.find(null, (err, values) => {
        if (err) {
            res.status(500).send("Une erreur interne s'est produite")
        } else {
            res.status(200).send(values)
        }
    })
})

router.get("/:id", (req, res) => {
    
    let id = req.params.id

    OrderModel.findById(id, (err, order) => {
        if (err) {
            res.status(500).send("Une erreur interne s'est produite")
        } else {
            res.status(200).send(order)
        }
    })
})

router.post("/", (req, res) => {
    let newOrder = new OrderModel(req.body)

    newOrder.save((err, result) => {
        if (err) { 
            res.status(500).send("Une erreur interne s'est produite")
        } else {
            res.status(201).send(`Order d'id ${result._id}`)
        }
    })
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    OrderModel.updateOne({_id: id}, {...req.body}, err => {
        if(err) {
            res.status(500).send("Une erreur s'est produite")
        } else {
            res.send(`Order d'id ${id} mis à jour`)
        }
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    OrderModel.deleteOne({_id: id}, (err, result) => {
        if(err){
            res.status(500).send("Une erreur interne s'est produite")
        } else {
            res.status(204).send(`Order d'id ${id} supprimée`)
        }
    })
})

module.exports = router, OrderModel