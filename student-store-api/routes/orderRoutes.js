const express = require("express");
const router = express.Router();
const orderController = require("../models/order")

router.get("/", orderController.getOrders)
router.get("/:id", orderController.getOrderById)
router.post("/", orderController.postOrders)
router.put("/:id", orderController.updatedOrder)
router.delete("/:id", orderController.deleteOrder)
router.get("/:id/total", orderController.getOrderTotal)

// router.get("/:id/items", orderController.)



module.exports =router