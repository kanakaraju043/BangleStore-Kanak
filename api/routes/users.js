let express = require("express")
let mongoose = require("mongoose")
let router = express.Router()
let bcrypt = require("bcrypt")

let User = require("../models/user")
router.post("/sinup",(req,res,next) =>{

    bcrypt.hash(req.body.password,10,(error,hash)=>{
        if(error){
            return res.status(500).json({
            error: err
    })
        }else{
            let user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
                })
        }

    
    })

    user.save()
           .then(result =>{
                console.log(result)
                res.status(201).json({
                    message : "Usesr Created",
                    createdUser: user
                })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            error: err
        })
    })
    
})

module.exports = router
