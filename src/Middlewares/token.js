const createHttpError = require("http-errors");
const { verifyToken } = require("../Services/auth.service").default;

const checkAuthentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw createHttpError(401, "Token not empty");
  }
  const valid = verifyToken(token);
  if (!valid) {
    throw createHttpError.Unauthorized();
  }
  next();
};

module.exports = {
  checkAuthentication,
};
