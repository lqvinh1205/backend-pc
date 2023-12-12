import createHttpError from "http-errors";
import BrandModel from "../Models/Brand.model";
import ImageService from "./image.service";

const findBrandById = async (id) => {
  return await BrandModel.findById(id).populate("logo");
};

const getListBrandByConditions = async (conditions) => {
  return await BrandModel.find(conditions)
    .populate("logo")
    .sort({ updatedAt: -1 });
};

const findBrandByConditions = async (conditions, options = {}) => {
  return await BrandModel.findOne(conditions, options);
};

const createBrand = async (req) => {
  const brand = await findBrandByConditions({ name: req.body.name });
  if (brand) {
    throw createHttpError(404, "Brand already taken");
  }
  req.body.logo = await ImageService.createImage(req.file);
  return await BrandModel.create(req.body);
};

const updateBrand = async (id, req) => {
  if (req.file) {
    const brand = await findBrandById(id);
    await ImageService.deleteImage(brand.logo.id);
    req.body.logo = await ImageService.createImage(req.file);
  }
  return await BrandModel.findByIdAndUpdate(id, req.body, { new: true });
};

const deleteBrand = async (id) => {
  const brand = await findBrandById(id);
  await ImageService.deleteImage(brand.logo.id);
  return await BrandModel.findByIdAndDelete(id);
};

export default {
  createBrand,
  getListBrandByConditions,
  findBrandByConditions,
  findBrandById,
  updateBrand,
  deleteBrand,
};
