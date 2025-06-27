const prisma = require("../src/db/db");
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { orderId: parseInt(id) },
    });
    res.json(order);
  } catch (error) {
    console.error("Error Fetching order: ", error);
  }
};
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error("Error Fetching orders: ", error);
    //res.send("no orders");
  }
};

//adds new order to db
const postOrders = async (req, res) => {
  const { customer, total, status } = req.body;
  try {
    const newOrder = await prisma.order.create({
      data: {
        customer,
        total,
        status,
      },
    });
    res.json(newOrder);
  } catch (error) {
    console.error("Error creating order: ", error);
  }
};

//updates existing order in DB
const updatedOrder = async (req, res) => {
  const { id } = req.params;
  const {customer, total, status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { orderId: parseInt(id) },
      data: {
        customer,
        total,
        status,
      },
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Unable to update order: ", error);
  }
};

//Deletes existing order in DB
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await prisma.order.delete({
      where: { orderId: parseInt(id) },
    });
    res.json(deletedOrder);
  } catch (error) {
    console.error("Cannot Delete order: ", error);
  }
};

//GET /orders/:order_id/total

const getOrderTotal = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { orderId: parseInt(id) },
      include: { orderItems: true },
    });
    res.json(order.total);
  } catch (error) {
    console.error("Could not find total price: ", error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  postOrders,
  updatedOrder,
  deleteOrder,
  getOrderTotal,
};
