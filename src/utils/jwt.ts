import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from "../constants/index";

//TO DO implementar refresh token
const generateAccessToken = (data: any) =>
  jwt.sign({ data }, JWT_SECRET_KEY, { expiresIn: "1m" });

const generateRefreshToken = (data: any) =>
  jwt.sign({ data }, JWT_REFRESH_SECRET_KEY, { expiresIn: "15m" });

const verifiyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return { error: "Invalid Token" };
  }
};
const verifiyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET_KEY);
  } catch (error) {
    return { error: "Invalid Token" };
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifiyToken,
  verifiyRefreshToken,
};
