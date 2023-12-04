import createHttpError from "http-errors";
import ReceiptModel from "../Models/Receipt.model";

const findReceiptById = async (id) => {
  return await ReceiptModel.findById(id);
};

const getListReceiptByConditions = async (conditions) => {
  return await ReceiptModel.find(conditions);
};

const findReceiptByConditions = async (conditions, options = {}) => {
  return await ReceiptModel.findOne(conditions, options);
};

const createReceipt = async (data) => {
  const brand = await findReceiptByConditions({ name: data.name });
  if (brand) {
    throw createHttpError(404, "Receipt already taken");
  }
  return await ReceiptModel.create(data);
};

const updateReceipt = async (id, data) => {
  return await ReceiptModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteReceipt = async (id) => {
  return await ReceiptModel.findByIdAndDelete(id);
};

export default {
  createReceipt,
  getListReceiptByConditions,
  findReceiptByConditions,
  findReceiptById,
  updateReceipt,
  deleteReceipt,
};
