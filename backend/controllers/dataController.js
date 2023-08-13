const DataModel = require("../models/data")

const getAllFields=async(req,res)=>{

    const filter = req.body
    console.log(filter)

    try{
        const data = await DataModel.find(filter)
        return res.status(201).json(data)
    }catch(e){
        console.log(e)
       return res.status(401).send("Something went wrong")
    }
}

module.exports = {getAllFields}