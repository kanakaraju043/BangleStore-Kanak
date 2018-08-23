let express = require("express")
let morgan = require("morgan")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
mongoose.connect("mongodb://kanak:"+process.env.ATLAS_MANGOO_PASSWD+"@banglestore-shard-00-00-xv7xw.mongodb.net:27017,banglestore-shard-00-01-xv7xw.mongodb.net:27017,banglestore-shard-00-02-xv7xw.mongodb.net:27017/test?ssl=true&replicaSet=BangleStore-shard-0&authSource=admin&retryWrites=true",{
    useNewUrlParser: true
})
let app = express()
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,nex) =>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept,Authorization"
)
if (req.method === "OPTIONS"){
    res.header("Access-Controll-Allow-Methods","PUT","POST","PATCH","DELETED","GET")
    return res.status(200).json({})
}
nex()
})
productRoutes = require("./api/routes/products")
app.use("/products",productRoutes)
orderRoutes = require("./api/routes/orders")
app.use("/orders",orderRoutes)

userRoutes = require(".api/routes/users")
app.use("/user",userRoutes)

app.use((req,res,next) =>{
    let error = new Error("Not found")
    error.status = 404
    next(error)
})

app.use((error,req,res,nex) =>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports = app
