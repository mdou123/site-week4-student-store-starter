//For  Update order Items what should be passed into req.body?
const prisma = require("../src/db/db");

//Grabs the id from endpoint and searches for Order info and orderItems
const getOrderItems = async (req, res) => {
  const { itemId } = req.params;
  try {
    const orderItems = await prisma.order.findUnique({
      where: { orderId: parseInt(itemId) },
      include: { orderItems: true },
    });
    res.json(orderItems);
  } catch (error) {
    console.error("Error fetching order or Order Items: ", error);
  }
};

//Will create new orderItem
const postOrderItems = async (req, res) => {
  const { orderId } = req.params;
  const { productId, quantity } = req.body;

  //Checks to see if request entries are valid
  if (!productId || !quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Product ID and a positive quantity are required." });
  }

  try {
    //grabs order and items and checks if it exists
    const order = await prisma.order.findUnique({
      where: { orderId: parseInt(orderId) },
      include: { orderItems: true },
    });

    if (!order) {
      return res.status(404).json({
        message: `Order with ID ${orderId} not found. Cannot add item.`,
      });
    }

    const product = await prisma.product.findUnique({
      where: { productId: productId },
    });
    const newOrderItem = await prisma.product.create({
      data: {
        orderId: order.orderId,
        productId: product.productId,
        quantity: quantity,
        price: product.price,
      },
    });
    //Calculate New order total
    let newOrderTotal = order.total;
    newOrderTotal += newOrderItem.quantity * newOrderItem.price;

    //Directly updates order total
    const updatedOrder = await prisma.order.update({
      where: { id: newOrderItem.orderId },
      data: { total: newOrderTotal },
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error creating order item for existing order: ", error);
  }
};

const updateOrderItems = async (req, res) => {
  const { itemId } = Number(req.params.id);
  const { quantity } = req.body;
  try {
    const updatedItem = await prisma.orderItem.update({
      where: {
        orderItemId: parseInt(itemId),
      },
      data: {
        quantity,
      },
    });
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating order items: ", error);
  }
};

module.exports = {
  getOrderItems,
  postOrderItems,
  updateOrderItems,
};
