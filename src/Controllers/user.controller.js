const catchAsync = require("../Utils/catchAsync").default;
const userService = require("../Services/user.service").default;

const getListUser = catchAsync(async (req, res) => {
  const conditions = req.body;
  const users = await userService.getListUserByConditions(conditions);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: users,
  });
});

const findUserById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await userService.findUserById(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: user,
  });
});

const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  const user = await userService.createUser(data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  console.log(12);
  const id = req.params.id;
  const data = req.body;
  const user = await userService.updateUser(id, data);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: user,
  });
});

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await userService.deleteUser(id);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: null,
  });
};

module.exports = {
  getListUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
