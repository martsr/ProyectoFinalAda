import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants/index";

//TO DO implementar refresh token
const getToken = (data: any) => {
  const token = jwt.sign(data, JWT_SECRET_KEY);
  return token;
};

const verifiyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return { error: "Invalid Token" };
  }
};
export { getToken, verifiyToken };
