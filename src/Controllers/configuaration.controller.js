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

const findConfiguarationById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const configuaration = await configuarationService.findConfiguarationById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: configuaration,
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

const updateConfiguaration = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const configuaration = await configuarationService.updateConfiguaration(
    id,
    data
  );
  return res.status(201).json({
    status: 201,
    message: "success",
    data: configuaration,
  });
});

const deleteConfiguaration = async (req, res) => {
  const id = req.params.id;
  await configuarationService.deleteConfiguaration(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
};

module.exports = {
  getListConfiguaration,
  findConfiguarationById,
  createConfiguaration,
  updateConfiguaration,
  deleteConfiguaration,
};
