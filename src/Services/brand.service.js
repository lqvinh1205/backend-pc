import createHttpError from "http-errors";
import BrandModel from "../Models/Brand.model";
import ImageService from "./image.service";

const findBrandById = async (id) => {
  return await BrandModel.findById(id);
};

const getListBrandByConditions = async (conditions) => {
  return await BrandModel.find(conditions);
};

const findBrandByConditions = async (conditions, options = {}) => {
  return await BrandModel.findOne(conditions, options);
};

const createBrand = async (data) => {
  const brand = await findBrandByConditions({ name: data.name });
  if (brand) {
    throw createHttpError(404, "Brand already taken");
  }
  console.log(data);
  data.filePath = await ImageService.createImage(data.images);
  return await BrandModel.create(data);
};

const updateBrand = async (id, data) => {
  return await BrandModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteBrand = async (id) => {
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
