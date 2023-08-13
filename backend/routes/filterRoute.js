const express = require("express")
const { getEndYear , getTopics,getSector,getRegion,getPEST,getSources,getCountry } = require("../controllers/filterController")

const router = express.Router()

router.route("/end_year").get(getEndYear)
router.route("/topics").get(getTopics)
router.route("/sectors").get(getSector)
router.route("/regions").get(getRegion)
router.route("/pests").get(getPEST)
router.route("/sources").get(getSources)
router.route("/countries").get(getCountry)

module.exports = router