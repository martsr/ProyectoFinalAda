import { Request, Response, NextFunction } from "express"
import { verifiyToken } from "../utils/jwt"

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) return res.status(401).json("Nothing to do over here ...")
  const token = authorization.split(" ")[1]
  const validatedToken = verifiyToken(authorization) as any
  if (validatedToken.error) {
    return res.status(401).json("Nothing to do over here ...")
  }
  const { email, userId } = validatedToken
  res.locals.userData = { email, userId }
  next()
}

export { authorizeUser }
