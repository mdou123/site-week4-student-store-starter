require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

//creates connection to routes
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const orderItemRoutes = require("../routes/orderItemsRoutes");

const corsOption = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOption));
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/orderItems", orderItemRoutes);



app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log("Server running on port 3000"));
