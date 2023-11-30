import createHttpError from "http-errors";
import ConfiguarationModel from "../Models/Configuaration.model";

const findConfiguarationById = async (id) => {
  return await ConfiguarationModel.findById(id);
};

const getListConfiguarationByConditions = async (conditions) => {
  return await ConfiguarationModel.find(conditions);
};

const findConfiguarationByConditions = async (conditions, options = {}) => {
  return await ConfiguarationModel.findOne(conditions, options);
};

const createConfiguaration = async (data) => {
  const configuaration = await findConfiguarationByConditions({
    name: data.name,
  });
  if (configuaration) {
    throw createHttpError(404, "Configuaration already taken");
  }
  return await ConfiguarationModel.create(data);
};

const updateConfiguaration = async (id, data) => {
  return await ConfiguarationModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteConfiguaration = async (id) => {
  return await ConfiguarationModel.findByIdAndDelete(id);
};

export default {
  createConfiguaration,
  getListConfiguarationByConditions,
  findConfiguarationByConditions,
  findConfiguarationById,
  updateConfiguaration,
  deleteConfiguaration,
};
