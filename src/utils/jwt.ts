import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from "../constants/index"

//TO DO implementar refresh token
const generateAccessToken = (data: any) => {
  const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "1m" })
  return token
}

const generateRefreshToken = (data: any) => {
  const refreshToken = jwt.sign(data, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "15m",
  })
}

const verifiyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY)
  } catch (error) {
    return { error: "Invalid Token" }
  }
}
export { generateAccessToken, generateRefreshToken, verifiyToken }

// A IMPLEMENTAR:
// Refresh token route
// app.post("/token", (req, res) => {
//   const refreshToken = req.body.refreshToken;
//   if (!refreshToken) return res.sendStatus(401);

//   jwt.verify(refreshToken, secretKey, (err, user) => {
//     if (err) return res.sendStatus(403);

//     const accessToken = generateAccessToken({
//       id: user.userId,
//       username: user.username,
//     });
//     res.json({ accessToken });
//   });
// });
