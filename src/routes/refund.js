const authenticate = require("../middleware/authenticate");
const express = require("express");
const router = express.Router();

const returnController = require("../controller/refund");

// User routes
router.post("/", authenticate, returnController.createReturnRequest);
router.get("/user", authenticate, returnController.getUserReturnRequests);
router.get("/:id", authenticate, returnController.getReturnRequestById);

// Lấy tất cả yêu cầu (vẫn yêu cầu authenticate nhưng không check role)
router.get("/", authenticate, returnController.getAllReturnRequests);

// Cập nhật trạng thái yêu cầu
router.put("/:id/status", authenticate, returnController.updateReturnStatus);

module.exports = router;