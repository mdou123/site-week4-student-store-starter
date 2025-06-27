const express = require("express");
const router = express.Router();
const productController = require("../models/product")

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById)
router.post("/", productController.postProduct);
router.put("/:id", productController.updatedProduct);
router.delete("/:id", productController.deleteProduct);


module.exports =router