import ConfiguarationModel from "../Models/Configuaration.model";
import ConfiguarationDetail from "../Models/ConfiguarationDetail.model";

const getListConfiguarationByConditions = async (conditions) => {
  return await ConfiguarationModel.aggregate([
    {
      $lookup: {
        from: "configuarationdetails",
        localField: "_id",
        foreignField: "configuaration_id",
        as: "list",
      },
    },
  ]);
};

const createConfiguaration = async ({ configuage }) => {
  await ConfiguarationModel.deleteMany({});
  await ConfiguarationDetail.deleteMany({});
  const req = configuage.map(async (config) => {
    const entrie = await ConfiguarationModel.create({ name: config.name });
    const dataIteams = config.list.map((item) => ({
      name: item.name,
      configuaration_id: entrie._id,
    }));
    const responseItems = await ConfiguarationDetail.insertMany(dataIteams);
    return {
      configure: entrie,
      configureItems: responseItems,
    };
  });
  return await Promise.all(req);
};

export default {
  createConfiguaration,
  getListConfiguarationByConditions,
};
