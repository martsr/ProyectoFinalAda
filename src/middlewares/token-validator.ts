import { Request, Response, NextFunction } from "express";
import {
  generateAccessToken,
  verifiyRefreshToken,
  verifiyToken,
} from "../utils/jwt";
import Auth from "../models/auth";

async function validateUserAccessToken(userId: string, accessToken: string) {
  const user = await Auth.getUserInfo(userId);
  if (!user) return user;
  return user.accessToken == accessToken;
}
async function authorizeUser(req: Request, res: Response, next: NextFunction) {
  let accessToken = req.headers["authorization"] as string;
  const refreshToken = req.cookies["refreshToken"];
  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  console.log("Tengo tokens");
  try {
    const decoded = verifiyToken(accessToken) as any;
    if (!(await validateUserAccessToken(decoded.data, accessToken)))
      return res.status(404).json({ error: "Wrong Credentials" });

    console.log("access token valido");
    next();
  } catch (error) {
    console.log("access token expired");
    try {
      console.log(
        "chequeo de refresh token",
        verifiyRefreshToken(refreshToken)
      );
    } catch (error) {
      res.status(400).json({ message: "Expired tokens, please login" });
    }
  }
  // try {
  //   const verified = verifiyToken(accessToken);
  //   console.log(verified);
  //   next();
  // } catch (error) {
  //   if (!refreshToken) {
  //     return res.status(401).send("Access Denied. No refresh token provided.");
  //   }

  //   try {
  //     const decoded = verifiyRefreshToken(refreshToken) as any;
  //     console.log(decoded);
  //     const accessToken = generateAccessToken(decoded);

  //     res
  //       .cookie("refreshToken", refreshToken, {
  //         httpOnly: true,
  //         sameSite: "strict",
  //       })
  //       .header("Authorization", accessToken)
  //       .send(decoded.user);
  //   } catch (error) {
  //     return res.status(400).send("Invalid Token.");
  //   }
  // }
}

export { authorizeUser };
