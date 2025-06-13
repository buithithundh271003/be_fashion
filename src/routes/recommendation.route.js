const express = require("express")
const { mining } = require("../services/mining.services")
const router = express.Router()
router.get('/', async function(req, res) {
    const products = await mining()
    return res.status(200).json(products)
})
module.exports = router