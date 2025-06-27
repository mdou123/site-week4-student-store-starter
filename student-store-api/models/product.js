//adjust the way the query is accepted or read so that it's not dependent on capitalization
//make sure each orderItem is deleted whrn order is deleted
//don't increment for orderItem

const prisma = require("../src/db/db");

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { productId: parseInt(id) },
    });
    res.json(product);
  } catch (error) {
    console.error("Error Fetching product: ", error);
  }
};

//gets entire list of products from db
const getProduct = async (req, res) => {
  //query logic

  const { category, sortBy, sortOrder } = req.query;
  const filters = {};
  if (category) {
    filters.category = category;
  }

  let orderByFilter = {};

  //sortBy Logic
  const allowedSortFields = ["name", "price"];
  const allowedSortOrders = ["asc", "desc"];

  //Checks if sortBy is query parameter and also checks if sortBy is one of allowed options
  if (sortBy && allowedSortFields.includes(sortBy)) {
    //Same checking but with sortOrder
    if (sortOrder && allowedSortOrders.includes(sortOrder)) {
      orderByFilter[sortBy] = sortOrder;
    } else {
      orderByFilter[sortBy] = "asc";
    }
  } else {
    orderByFilter = { productId: "asc" };
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: orderByFilter,
    });
    res.json(products);
  } catch (error) {
    console.error("Error Fetching products: ", error);
    //res.send("no products");
  }
};

//adds new product to db
const postProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;
  const newProduct = await prisma.product.create({
    data: {
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
      category: category,
    },
  });
  res.json(newProduct);
};

//updates existing product in DB
const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, category } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { productId: parseInt(id) },
      data: {
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        category: category,
      },
    });
    res.json(updatedProduct);
    console.log(imageUrl);
  } catch (error) {
    console.error("Unable to update Product: ", error);
  }
};

//Deletes existing product in DB
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: { productId: parseInt(id) },
    });
    res.json(deletedProduct);
  } catch (error) {
    console.error("Cannot Delete product: ", error);
  }
};

module.exports = {
  getProduct,
  getProductById,
  postProduct,
  updatedProduct,
  deleteProduct,
};
