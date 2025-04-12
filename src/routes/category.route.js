const authenticate = require("../middleware/authenticate.js");
const express = require("express");
const router = express.Router();
console.log("Đay r")
const categoryController = require("../controller/category.controller.js");
router.get("/", categoryController.getAllCategorys);
router.get("/id/:id",  categoryController.findCategoryById);
router.post("/", authenticate, categoryController.creatCategory);
router.delete("/:id", authenticate, categoryController.deleteCategory);
// router.put("/:id", authenticate, categoryController.updateCategory);
module.exports = router;