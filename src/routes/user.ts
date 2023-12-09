import { Router } from "express"
// import UserController from '../controllers/user';
import { authorizeUser } from "../middlewares/token-validator"
import { handle405Error } from "../middlewares/wrong-method-handler"

const userRouter = Router()

// userRouter.post('/', UserController.createNew);
// userRouter.post('/auth/token', UserController.login);

// userRouter.get('/me', authorizeUser, UserController.getInfo);

userRouter.all("/", handle405Error)
userRouter.all("/auth/token", handle405Error)
userRouter.all("/me", handle405Error)

export default userRouter
