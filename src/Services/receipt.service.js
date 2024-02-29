import createHttpError from "http-errors";
import ReceiptModel from "../Models/Receipt.model";
import { generateRandomCode } from "../Helpers";
import ReceiptDetailModel from "../Models/ReceiptDetail.model";
import ProductModel from "../Models/Product.model";

const findReceiptById = async (id) => {
  const receipt = await ReceiptModel.findById(id).populate("importer");
  return {
    ...receipt.toObject(),
    list: await ReceiptDetailModel.find({
      receipt_id: id,
    }).populate({
      path: "product_id",
      populate: { path: "thumbnail" },
    }),
  };
};

const getListReceiptByConditions = async (conditions) => {
  return await ReceiptModel.find(conditions)
    .populate("importer")
    .sort({ createdAt: -1 });
};

const findReceiptByConditions = async (conditions, options = {}) => {
  return await ReceiptModel.findOne(conditions, options);
};

const createReceipt = async (data) => {
  if (!data.products || data.products.length == 0) {
    throw new Error("Sản phẩm không hợp lệ");
  }
  const receipt = await ReceiptModel.create({
    code: generateRandomCode(10),
    import_date: new Date(),
    importer: data.importer,
    address: data.address,
    warehouse: data.warehouse,
    deliver: data.deliver,
  });
  await Promise.all(
    data.products.map(async (product) => {
      await ReceiptDetailModel.create({
        product_id: product._id,
        quantity: product.quantity,
        receipt_id: receipt._id,
        price: product.price,
        quantity_in_stock: product.quantity,
      });
      await ProductModel.findByIdAndUpdate(product._id, {
        $inc: { quantity_in_stock: product.quantity },
      });
    })
  );

  return receipt;
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
