const DataModel = require("../models/data")

const getEndYear=async(req,res)=>{

    try{

    const end_years= await  DataModel.find({end_year:{$ne: ""}}).select({end_year:1,_id:0})
        const uy = end_years.map(obj=>obj.end_year)
        return res.status(201).json([...new Set(uy)]);
    }catch(e){
        return res.status(401).send("Something went wrong")
    }
}

const getTopics=async(req,res)=>{

    try{

    const topics= await  DataModel.find({topic:{$ne: ""}}).select({topic:1,_id:0})
        const uy = topics.map(obj=>obj.topic)
        return res.status(201).json([...new Set(uy)]);
    }catch(e){
        return res.status(401).send("Something went wrong")
    }
}

const getSector=async(req,res)=>{

    try{

    const sectors= await  DataModel.find({sector:{$ne: ""}}).select({sector:1,_id:0})
        const uy = sectors.map(obj=>obj.sector)
        return res.status(201).json([...new Set(uy)]);
    }catch(e){
        return res.status(401).send("Something went wrong")
    }
}
const getRegion=async(req,res)=>{

    try{

    const regions= await  DataModel.find({region:{$ne: ""}}).select({region:1,_id:0})
        const uy = regions.map(obj=>obj.region)
        return res.status(201).json([...new Set(uy)]);
    }catch(e){
        return res.status(401).send("Something went wrong")
    }
}
const getPEST=async(req,res)=>{

    try{

    const pestles= await  DataModel.find({pestle:{$ne: ""}}).select({pestle:1,_id:0})
        const uy = pestles.map(obj=>obj.pestle)
        return res.status(201).json([...new Set(uy)]);
    }catch(e){
        return res.status(401).send("Something went wrong")
    }
}
const getSources=async(req,res)=>{

    try{

    const sources= await  DataModel.find({source:{$ne: ""}}).select({source:1,_id:0})
        const uy = sources.map(obj=>obj.source)
        return res.status(201).json([...new Set(uy)]);
    }catch(e){
        return res.status(401).send("Something went wrong")
    }
}
// const getSWOT=async(req,res)=>{

//     try{

//     const end_years= await  DataModel.find({end_year:{$ne: ""}}).select({end_year:1,_id:0})
//         const uy = end_years.map(obj=>obj.end_year)
//         return res.status(201).json([...new Set(uy)]);
//     }catch(e){
//         return res.status(401).send("Something went wrong")
//     }
// }

const getCountry=async(req,res)=>{

    try{

    const countries= await  DataModel.find({country:{$ne: ""}}).select({country:1,_id:0})
        const uy = countries.map(obj=>obj.country)
        return res.status(201).json([...new Set(uy)]);
    }catch(e){
        return res.status(401).send("Something went wrong")
    }
}
// const getCity=async(req,res)=>{

//     try{

//     const end_years= await  DataModel.find({end_year:{$ne: ""}}).select({end_year:1,_id:0})
//         const uy = end_years.map(obj=>obj.end_year)
//         return res.status(201).json([...new Set(uy)]);
//     }catch(e){
//         return res.status(401).send("Something went wrong")
//     }
// }


module.exports = {getEndYear , getTopics,getSector,getRegion,getPEST,getSources,getCountry}