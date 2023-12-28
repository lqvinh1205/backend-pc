const catchAsync = require("../Utils/catchAsync").default;
const billService = require("../Services/bill.service").default;

const getListBill = catchAsync(async (req, res) => {
  const conditions = req.body;
  const bills = await billService.getListBillByConditions(conditions);
  const total = await billService.getListBillByConditions();
  return res.status(200).json({
    status: 200,
    message: "success",
    data: bills,
    total: total.length,
  });
});

const findBillById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const bill = await billService.findBillById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: bill,
  });
});

const createBill = catchAsync(async (req, res) => {
  const data = req.body;
  const bill = await billService.createBill(data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: bill,
  });
});

const updateBill = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const bill = await billService.updateBill(id, data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: bill,
  });
});

const deleteBill = async (req, res) => {
  const id = req.params.id;
  await billService.deleteBill(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
};

module.exports = {
  getListBill,
  findBillById,
  createBill,
  updateBill,
  deleteBill,
};
