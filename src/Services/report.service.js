import BrandModel from "../Models/Brand.model";
import ReceiptDetailModel from "../Models/ReceiptDetail.model";

const getListInventoryByConditions = async (conditions) => {
  return await ReceiptDetailModel.find({
    quantity_in_stock: {
      $gt: 0,
    },
  })
    .populate("receipt_id")
    .populate({
      path: "product_id",
      populate: {
        path: "brand_id",
      },
    })
    .sort({ createdAt: -1 });
};

export default {
  getListInventoryByConditions,
};
