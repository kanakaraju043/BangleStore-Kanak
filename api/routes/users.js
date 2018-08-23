let express = require("express")
let mongoose = require("mongoose")
let router = express.Router()
let bcrypt = require("bcrypt")

let User = require("../models/user")
router.post("/signup",(req,res,next) =>{
    console.log("signup req")

    User.find({email:req.body.email})
        .exec()
        .then(user =>{
            if(user){
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

module.exports = router
