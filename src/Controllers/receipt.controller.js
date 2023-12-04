const catchAsync = require("../Utils/catchAsync").default;
const receiptService = require("../Services/receipt.service").default;

const getListReceipt = catchAsync(async (req, res) => {
  const conditions = req.body;
  const receipts = await receiptService.getListReceiptByConditions(conditions);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: receipts,
  });
});

const findReceiptById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const receipt = await receiptService.findReceiptById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: receipt,
  });
});

const createReceipt = catchAsync(async (req, res) => {
  const data = req.body;
  const receipt = await receiptService.createReceipt(data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: receipt,
  });
});

const updateReceipt = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const receipt = await receiptService.updateReceipt(id, data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: receipt,
  });
});

const deleteReceipt = async (req, res) => {
  const id = req.params.id;
  await receiptService.deleteReceipt(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
};

module.exports = {
  getListReceipt,
  findReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
};
