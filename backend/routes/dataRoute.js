const express = require("express")
const {getAllFields} = require("../controllers/dataController")

const router = express.Router()

router.route("/").post(getAllFields)

module.exports = router