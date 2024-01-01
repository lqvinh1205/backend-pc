const catchAsync = require("../Utils/catchAsync").default;
const productService = require("../Services/product.service").default;

const getListProduct = catchAsync(async (req, res) => {
  const conditions = req.query;
  const products = await productService.getListProductByConditions(conditions);
  const total = await productService.getListProductByConditions(conditions);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: products,
    total: total.length,
  });
});

const findProductById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const product = await productService.findProductById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: product,
  });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: product,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const product = await productService.updateProduct(id, req);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: product,
  });
});

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await productService.deleteProduct(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
};

module.exports = {
  getListProduct,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
