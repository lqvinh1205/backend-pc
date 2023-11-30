const catchAsync = require("../Utils/catchAsync").default;
const imageService = require("../Services/image.service").default;

const findAllImageById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const images = await imageService.findAllImageById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: images,
  });
});

const findImageById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const image = await imageService.findImageById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: image,
  });
});

const createImage = catchAsync(async (req, res) => {
  const image = await imageService.createImage(req, res);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: image,
  });
});

const deleteImage = async (req, res) => {
  const id = req.params.id;
  await imageService.deleteImage(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
};

module.exports = {
  findAllImageById,
  findImageById,
  createImage,
  deleteImage,
};
