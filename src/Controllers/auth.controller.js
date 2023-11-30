const catchAsync = require("../Utils/catchAsync").default;
const userSevice = require("../Services/user.service").default;
const authService = require("../Services/auth.service").default;

const register = catchAsync(async (req, res) => {
  const user = await userSevice.createUser(req.body);
  return res.status(201).json({
    status: 201,
    message: "success",
    data: user,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const response = await authService.loginWithEmailAndPassword(email, password);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: response,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const response = await authService.refreshToken(refreshToken);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: response,
  });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const response = await authService.logout(refreshToken);
  return res.status(200).json({
    status: 200,
    message: "success",
    data: response,
  });
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
