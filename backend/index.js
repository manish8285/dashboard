require("dotenv").config()
require("./db")
PORT = process.env.PORT || 8181
const DataModel = require("./models/data")
const express = require("express")
const filterRoutes = require("./routes/filterRoute")
const dataRouters = require("./routes/dataRoute")
const cors = require("cors")

const app =express()

app.use(express.json())
app.use(cors())

app.use("/filter",filterRoutes)

app.use("/data",dataRouters)






app.listen(PORT,()=>console.log("Server started at port "+process.env.PORT));


