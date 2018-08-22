let express = require("express")

// creating router 
let router = express.Router()

router.get("/",(req,res,next) =>{
    res.status(200).json({
        message : "Handling GET Requests to /orders"
    })
})

router.post("/",(req,res,next) =>{
    let order = {
        orderId: req.body.orderId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message : "order was created",
        order: order
    })
})

router.get("/:orderId",(req, res, next) =>{
    const id = req.params.orderId
    if(id === "111"){
        res.status(200).json({
            message:"You found the order",
            id:id
        })
    }else{
        res.status(200).json({
            message: "order not found"
        })
    }
})
// Update Order

router.patch("/:orderId",(req, res, next) =>{
   
    res.status(200).json({
        message: "order updated"
    })
})

// Delete Order
router.delete("/:orderId",(req, res, next) =>{
    res.status(200).json({
        message: "order deleted",
})
})

module.exports = router
