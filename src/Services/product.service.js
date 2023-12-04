import createHttpError from "http-errors";
import ProductModel from "../Models/Product.model";

const findProductById = async (id) => {
  return await ProductModel.findById(id);
};

const getListProductByConditions = async (conditions) => {
  return await ProductModel.find(conditions);
};

const findProductByConditions = async (conditions, options = {}) => {
  return await ProductModel.findOne(conditions, options);
};

const createProduct = async (data) => {
  const brand = await findProductByConditions({ name: data.name });
  if (brand) {
    throw createHttpError(404, "Product already taken");
  }
  return await ProductModel.create(data);
};

const updateProduct = async (id, data) => {
  return await ProductModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  return await ProductModel.findByIdAndDelete(id);
};

export default {
  createProduct,
  getListProductByConditions,
  findProductByConditions,
  findProductById,
  updateProduct,
  deleteProduct,
};
