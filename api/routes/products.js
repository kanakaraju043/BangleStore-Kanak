let express = require("express")
let Product = require("../models/product")
let mongoose = require("mongoose")
let router = express.Router()

router.get("/",(req,res,next) =>{
   Product.
           find().
           exec().
           then(docs =>{
               console.log(docs)
               res.status(200).json(docs)
           }).catch(err =>{
            console.log(err),
            res.status(500).json({
                error: err
            })
           })
})

router.post("/",(req,res,next) =>{
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
           .then(result =>{
                console.log(result)
                res.status(201).json({
                    message : "Handling Post Requests to /products",
                    createdProduct: product
                })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            error: err
        })
    })
    
})

router.get("/:productId",(req, res, next) =>{
    const id = req.params.productId
    Product.findById(id)
            .exec()
            .then(doc =>{
                if(doc){
                    res.status(200).json(doc)
                }else{
                    res.status(400).json({
                        message: "No record found"
                    })
                }
                console.log("From database:",doc)
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
})

router.patch("/:productId",(req, res, next) =>{
   
    console.log("update called")

    let productId = req.params.productId
    let updatedOps = {};
    for(const ops of req.body){
        console.log("ops "+ops.json)
        updatedOps[ops.propName] = ops.value
    }

    Product.update({_id:productId},{$set:updatedOps})
            .exec()
            .then(result =>{
                console.log(result)
                res.status(200).json(result)
            }).catch(error =>{
                res.status(500).json({
                    error:error
                }
                )
            })
})

router.delete("/:productId",(req, res, next) =>{
    let productId = req.params.productId
    Product.deleteOne({_id:productId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "record deleted"
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router
