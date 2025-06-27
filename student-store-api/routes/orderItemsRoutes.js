const express = require("express");
const router = express.Router();
const orderItemController = require("../models/orderItem")

router.get("/:itemId", orderItemController.getOrderItems)
router.post("/:orderId",orderItemController.postOrderItems)
router.put("/:itemId", orderItemController.updateOrderItems)

module.exports =router