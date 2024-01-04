import createHttpError from "http-errors";
import ProductModel from "../Models/Product.model";
import ImageService from "./image.service";

const findProductById = async (id) => {
  return await ProductModel.findById(id)
    .populate("images")
    .populate("thumbnail")
    .populate("brand_id");
};

const getListProductByConditions = async (conditions) => {
  const perpage = Number(conditions?.perpage);
  const page = Number(conditions?.page);
  delete conditions?.perpage;
  delete conditions?.page;
  const query = ProductModel.find()
    .populate("images")
    .populate("thumbnail")
    .sort({ createdAt: -1 });
  if (perpage) {
    query.limit(perpage);
  }
  if (perpage && page) {
    query.skip((page - 1) * perpage);
  }
  if (conditions?.brand) {
    query.where("brand_id").equals(conditions.brand);
  }
  if (conditions?.search) {
    const searchTerm = conditions.search;
    const regex = new RegExp(searchTerm, "i");
    query.where("name").regex(regex);
  }
  return await query.exec();
};

const findProductByConditions = async (conditions, options = {}) => {
  return await ProductModel.findOne(conditions, options);
};

const createProduct = async (req) => {
  const brand = await findProductByConditions({ name: req.body.name });
  if (brand) {
    throw createHttpError(404, "Product already taken");
  }
  const images = await ImageService.createMultilImages(req.files["images"]);
  req.body.images = images.map((item) => item._id);
  req.body.thumbnail = await ImageService.createImage(
    req.files["thumbnail"][0]
  );
  return await ProductModel.create(req.body);
};

const updateProduct = async (id, req) => {
  const product = await findProductById(id);
  await ImageService.deleteMultilImage(req.body.ids_delete);
  if (req.files["images"]) {
    req.body.images = [
      ...product.images.map((item) => item._id),
      ...(await ImageService.createMultilImages(req.files["images"])),
    ];
  } else {
    delete req.body.images;
  }
  if (req.files["thumbnail"]?.[0]) {
    await ImageService.deleteImage(product.thumbnail?._id);
    req.body.thumbnail = await ImageService.createImage(
      req.files["thumbnail"][0]
    );
  } else {
    delete req.body.thumbnail;
  }
  return await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
};

const deleteProduct = async (id) => {
  return await ProductModel.findByIdAndUpdate(
    id,
    { is_deleted: true },
    { new: true }
  );
};

export default {
  createProduct,
  getListProductByConditions,
  findProductByConditions,
  findProductById,
  updateProduct,
  deleteProduct,
};
