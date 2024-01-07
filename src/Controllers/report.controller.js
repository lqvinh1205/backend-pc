const catchAsync = require("../Utils/catchAsync").default;
const reportService = require("../Services/report.service").default;

const getListInventory = catchAsync(async (req, res) => {
  const conditions = req.body;
  const brands = await reportService.getListInventoryByConditions(conditions);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: brands,
  });
});

const getReportDashboard = catchAsync(async (req, res) => {
  const conditions = req.query;
  const brands = await reportService.getReportDashboardByConditions(conditions);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: brands,
  });
});

module.exports = {
  getListInventory,
  getReportDashboard,
};
