const catchAsync = require("../Utils/catchAsync").default;
const brandService = require("../Services/brand.service").default;

const getListBrand = catchAsync(async (req, res) => {
  const conditions = req.body;
  const brands = await brandService.getListBrandByConditions(conditions);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: brands,
  });
});

const findBrandById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const brand = await brandService.findBrandById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: brand,
  });
});

const createBrand = catchAsync(async (req, res) => {
  const data = req.body;
  const brand = await brandService.createBrand(data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: brand,
  });
});

const updateBrand = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const brand = await brandService.updateBrand(id, data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: brand,
  });
});

const deleteBrand = async (req, res) => {
  const id = req.params.id;
  await brandService.deleteBrand(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
};

module.exports = {
  getListBrand,
  findBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
