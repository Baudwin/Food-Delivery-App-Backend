const express = require("express")
const app = express()
const db = require('../models')
const port  = 3005
const cookieParser = require('cookie-parser')
const userRoute = require('../routes/user')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(userRoute)







db.sequelize.sync({alter:true}).then(()=>{
    app.listen(port, ()=>{
        console.log(`server started on port ${port}`)
    })
}).catch(err=>{
    console.log(err);
})
