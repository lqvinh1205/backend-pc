import BrandModel from "../Models/Brand.model";
import ReceiptDetailModel from "../Models/ReceiptDetail.model";
import BillModel from "../Models/Bill.model";
import ProductModel from "../Models/Product.model";
import { STATUS_BILL } from "../Constants";
import dayjs from "dayjs";

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

const getReportDashboardByConditions = async (conditions) => {
  let { startDate, endDate } = conditions;

  startDate = dayjs(startDate).hour(0).minute(0).second(0).toDate();
  endDate = dayjs(endDate).hour(23).minute(59).second(59).toDate();
  const totalProducts = await ProductModel.find({
    is_deleted: false,
  }).count();
  const totalBills = await BillModel.find({
    status: conditions?.status ?? STATUS_BILL["success"],
  }).count();

  const result = await BillModel.aggregate([
    {
      $match: {
        status: STATUS_BILL["success"].toString(),
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        sum: { $sum: "$total" },
      },
    },
  ]);
  const allDays = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    allDays.push(currentDate.toDate());
    currentDate = currentDate.add(1, "day");
  }
  let total = 0;
  const finishResult = allDays.map((day) => {
    const formattedDay = dayjs(day).format("YYYY-MM-DD");
    const res = result.find((item) => {
      return dayjs(item._id).isSame(formattedDay);
    });
    if (res) {
      total += res.sum;
      return {
        ...res,
        _id: dayjs(res._id).format("DD/MM/YYYY"),
      };
    }
    return {
      _id: dayjs(day).format("DD/MM/YYYY"),
      sum: 0,
    };
  });

  const totalSum = await BillModel.aggregate([
    {
      $match: {
        status: STATUS_BILL["success"].toString(),
      },
    },
    {
      $group: {
        _id: null,
        sum: { $sum: "$total" },
      },
    },
  ]);
  return {
    totalRevenue: finishResult,
    report: {
      total,
      totalSum: totalSum[0] ? totalSum[0].sum : 0,
      totalProducts: totalProducts,
      totalBills: totalBills,
    },
  };
};

export default {
  getListInventoryByConditions,
  getReportDashboardByConditions,
};
