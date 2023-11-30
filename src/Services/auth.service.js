import createHttpError, { Unauthorized } from "http-errors";
import { compare } from "bcrypt";
import {
  findUserByConditions,
  findUserById,
  updateUser,
} from "../Services/user.service";
import { sign, verify } from "jsonwebtoken";

const loginWithEmailAndPassword = async (email, password) => {
  const user = await findUserByConditions(
    { email },
    { email: true, username: true, password: true }
  );
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const valid = await compare(password, user.password);
  if (!valid) {
    throw createHttpError(401, "Email or password not corect");
  }
  const { token, refreshToken } = generateToken(user);
  await updateUser(user._id, { refresh_token: refreshToken });

  return {
    token,
    refreshToken,
  };
};

const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(403, "Refesh token not empty");
  }
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) {
    throw Unauthorized();
  }
  await updateUser(payload._id, { refresh_token: null });
  return null;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = sign(payload, process.env.SECRET_KEY, {
    expiresIn: 5 * 60,
  });
  const refreshToken = sign(payload, process.env.SECRET_REFRESH_KEY, {
    expiresIn: "1 year",
  });
  return {
    token,
    refreshToken,
  };
};

const verifyToken = (token) => {
  return verify(token, process.env.SECRET_KEY, function (error, decode) {
    if (error) {
      const message =
        error.name == "JsonWebTokenError" ? "Unauthorized" : error.message;
      throw Unauthorized(message);
    }
  });
};

const verifyRefreshToken = async (token) => {
  const payload = verify(
    token,
    process.env.SECRET_REFRESH_KEY,
    function (error, decode) {
      if (error) {
        const message =
          error.name == "JsonWebTokenError" ? "Unauthorized" : error.message;
        throw Unauthorized(message);
      }
      return decode;
    }
  );
  if (!payload) {
    throw Unauthorized();
  }
  const { refresh_token: refToken } = await findUserById(payload._id);

  if (token != refToken) {
    throw Unauthorized();
  }

  return payload;
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(403, "Refesh token not empty");
  }
  const payload = await verifyRefreshToken(refreshToken);
  delete payload.iat;
  delete payload.exp;
  const response = generateToken(payload);
  await updateUser(payload._id, { refresh_token: response.refreshToken });
  return response;
};

export default {
  logout,
  loginWithEmailAndPassword,
  refreshToken,
  verifyToken,
};
