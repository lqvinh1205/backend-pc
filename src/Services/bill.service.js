import createHttpError from "http-errors";
import BillModel from "../Models/Bill.model";

const findBillById = async (id) => {
  return await BillModel.findById(id);
};

const getListBillByConditions = async (conditions) => {
  return await BillModel.find(conditions);
};

const findBillByConditions = async (conditions, options = {}) => {
  return await BillModel.findOne(conditions, options);
};

const createBill = async (data) => {
  const brand = await findBillByConditions({ name: data.name });
  if (brand) {
    throw createHttpError(404, "Bill already taken");
  }
  return await BillModel.create(data);
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
