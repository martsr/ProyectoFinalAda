import { Request, Response, NextFunction } from "express";
import {
  generateAccessToken,
  verifiyRefreshToken,
  verifiyToken,
} from "../utils/jwt";
const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers["authorization"] as string;
  const refreshToken = req.cookies["refreshToken"];
  console.log(accessToken, refreshToken);
  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    verifiyToken(accessToken);
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      const decoded = verifiyRefreshToken(refreshToken) as any;
      // tengo que crear un nuevo access token, y necesito la password del usuario para eso, ver aca como implementarlo
      const accessToken = generateAccessToken("test");

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
};

export { authorizeUser };
