import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from "../constants/index";

const generateAccessToken = (data: any) =>
  jwt.sign({ data }, JWT_SECRET_KEY, { expiresIn: "1m" });

const generateRefreshToken = (data: any) =>
  jwt.sign({ data }, JWT_REFRESH_SECRET_KEY, { expiresIn: "15m" });

const verifiyToken = (token: string) => jwt.verify(token, JWT_SECRET_KEY);

const verifiyRefreshToken = (token: string) =>
  jwt.verify(token, JWT_REFRESH_SECRET_KEY);

export {
  generateAccessToken,
  generateRefreshToken,
  verifiyToken,
  verifiyRefreshToken,
};
