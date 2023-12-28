import createHttpError from "http-errors";
import mongoose from "mongoose";

import BillModel from "../Models/Bill.model";
import BillDetailModel from "../Models/BillDetail.model";
import { PASSWOD_DEFAULT, STATUS_BILL } from "../Constants";
import userService from "./user.service";
import productService from "./product.service";
import { generateRandomCode } from "../Helpers";

const findBillById = async (id) => {
  const bill = await BillModel.findById(id);
  return {
    ...bill.toObject(),
    list: await BillDetailModel.find({ bill_id: id }).populate({
      path: "product_id",
      populate: { path: "thumbnail" },
    }),
  };
};

const getListBillByConditions = async (conditions) => {
  return await BillModel.find(conditions)
    .populate("sale_staff")
    .sort({ updatedAt: -1 });
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
      await BillDetailModel.create({
        product_id: item._id,
        bill_id: bill._id,
        quantity: item.quantity,
        price: item.price,
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
