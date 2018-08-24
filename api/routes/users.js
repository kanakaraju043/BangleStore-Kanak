let express = require("express")
let mongoose = require("mongoose")
let router = express.Router()
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")

let User = require("../models/user")
router.post("/signup",(req,res,next) =>{
    console.log("signup req")

    User.find({email:req.body.email})
        .exec()
        .then(user =>{
            if(user.length >= 1){
                return res.status(409).json({
                    message: "Email already existed!"
                })
            }else{

                bcrypt.hash(req.body.password,10,(error,hash)=>{
                    if(error){
                        console.log(error)
                        return res.status(500).json({
                        error: error
                })
                    }else{
                        console.log("signup success req")
            
                        let user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                            })
            
                            user.save()
                       .then(result =>{
                            console.log(result)
                            res.status(201).json({
                                message : "Usesr Created",
                            })
                }).catch(err => {
                    console.log(err),
                    res.status(500).json({
                        error: err
                    })
                })
                    }                
                })
            }
        })
})



router.delete("/:userId",(req, res, next) =>{
    let userId = req.params.userId
    Product.deleteOne({_id:userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "user deleted"
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post("/login",(req,res,next) =>{
   User.find({ email: req.body.email})
        .exec().
        then(user => {
            if(user.length < 1){
                return status.length(401).json({
                    message: "Auth failed"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if(result){
                    let token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {

                            expiresIn: "1h"
                        }
                )
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })
                }

                res.status(401).json({
                    message: "Auth failed"
                })
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})

module.exports = router
