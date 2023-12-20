const catchAsync = require("../Utils/catchAsync").default;
const configuarationService =
  require("../Services/configuaration.service").default;

const getListConfiguaration = catchAsync(async (req, res) => {
  const conditions = req.body;
  const configuarations =
    await configuarationService.getListConfiguarationByConditions(conditions);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: configuarations,
  });
});

const createConfiguaration = catchAsync(async (req, res) => {
  const data = req.body;
  const configuaration = await configuarationService.createConfiguaration(data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: configuaration,
  });
});

module.exports = {
  getListConfiguaration,
  createConfiguaration,
};
