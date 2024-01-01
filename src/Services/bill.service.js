import BillModel from "../Models/Bill.model";
import BillDetailModel from "../Models/BillDetail.model";
import { STATUS_BILL } from "../Constants";
import productService from "./product.service";
import { generateRandomCode } from "../Helpers";
import ProductModel from "../Models/Product.model";
import ReceiptDetailModel from "../Models/ReceiptDetail.model";

const findBillById = async (id) => {
  const bill = await BillModel.findById(id);
  return {
    ...bill.toObject(),
    list: await BillDetailModel.find({ bill_id: id }).populate({
      path: "receipt_detail_id",
      populate: { path: "product_id", populate: "thumbnail" },
    }),
  };
};

const getListBillByConditions = async (conditions) => {
  return await BillModel.aggregate([
    {
      $lookup: {
        from: "billdetails",
        localField: "_id",
        foreignField: "bill_id",
        as: "list",
      },
    },
    {
      $unwind: "$list",
    },
    {
      $lookup: {
        from: "receiptdetails",
        localField: "list.receipt_detail_id",
        foreignField: "_id",
        as: "list.receipt",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "list.receipt.product_id",
        foreignField: "_id",
        as: "list.receipt.product_id",
      },
    },
    {
      $group: {
        _id: "$_id",
        code: { $first: "$code" },
        sale_date: { $first: "$sale_date" },
        status: { $first: "$status" },
        username: { $first: "$username" },
        total: { $first: "$total" },
        createdAt: { $first: "$createdAt" },
        list: { $push: "$list" },
      },
    },
  ]).sort({ createdAt: -1 });
};

const findBillByConditions = async (conditions, options = {}) => {
  return await BillModel.findOne(conditions, options);
};

const createBill = async (data) => {
  const carts = data.carts;
  if (carts.length < 1) {
    throw Error("Carts empty !");
  }
  const arrayTotal = await Promise.all(
    carts.map(async (item) => {
      const product = await productService.findProductById(item._id);
      return product.price * item.quantity;
    })
  );
  const total = arrayTotal.reduce((prev, crr) => {
    return prev + crr;
  }, 0);
  const dataInsert = {
    code: generateRandomCode(10),
    username: data.username,
    email: data.email,
    phone_number: data.phone_number,
    address: data.address,
    total,
    sale_date: Date.now(),
    sale_staff: data?.sale_staff,
    status: STATUS_BILL["pending"],
    note: data.note,
  };
  const bill = await BillModel.create(dataInsert);
  await Promise.all(
    carts.map(async (item) => {
      const receiptDetail = await ReceiptDetailModel.find({
        product_id: item._id,
        quantity_in_stock: {
          $gt: 0,
        },
      }).sort({ createdAt: -1 });
      let quantity = item.quantity;
      const receiptIds = await Promise.all(
        receiptDetail.map(async (item) => {
          if (quantity <= 0) {
            return false; // Đã đủ quantity, không cần xử lý thêm
          }

          const quantityToReduce = Math.min(quantity, item.quantity_in_stock);

          await ReceiptDetailModel.findByIdAndUpdate(item._id, {
            $inc: { quantity_in_stock: -quantityToReduce },
          });

          quantity -= quantityToReduce;

          return item._id.toString();
        })
      );
      if (receiptIds.length === 0) {
        throw new Error("Hết hàng");
      }

      await BillDetailModel.create({
        receipt_detail_id: receiptIds,
        bill_id: bill._id,
        quantity: item.quantity,
        price: item.price,
      });
      await ProductModel.findByIdAndUpdate(item._id, {
        $inc: { quantity_in_stock: -item.quantity },
      });
    })
  );
  return bill;
};

const updateBill = async (id, data) => {
  return await BillModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteBill = async (id) => {
  return await BillModel.findByIdAndUpdate(
    id,
    {
      is_deleted: true,
    },
    { new: true }
  );
};

export default {
  createBill,
  getListBillByConditions,
  findBillByConditions,
  findBillById,
  updateBill,
  deleteBill,
};
