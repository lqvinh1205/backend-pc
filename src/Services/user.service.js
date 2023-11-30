import createHttpError from "http-errors";
import UserModel from "../Models/User.model";
import { hash } from "bcrypt";

const findUserById = async (id) => {
  return await UserModel.findById(id);
};

const getListUserByConditions = async (conditions) => {
  return await UserModel.find(conditions);
};

const findUserByConditions = async (conditions, options = {}) => {
  return await UserModel.findOne(conditions, options);
};

const createUser = async (data) => {
  const user = await findUserByConditions({
    $or: [{ email: data.email }, { phone_number: data.phone_number }],
  });
  if (user) {
    throw createHttpError(404, "User already taken");
  }
  data.password = await hash(data.password, 8);
  return await UserModel.create(data);
};

const updateUser = async (id, data) => {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

export default {
  createUser,
  getListUserByConditions,
  findUserByConditions,
  findUserById,
  updateUser,
  deleteUser,
};
