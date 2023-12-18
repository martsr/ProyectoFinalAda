import { Router } from "express";
import UserController from "../controllers/user";
import { authorizeUser } from "../middlewares/token-validator";
import { handle405Error } from "../middlewares/wrong-method-handler";

const userRouter = Router();

userRouter.post("/", UserController.createUser);

userRouter.get("/all", UserController.getAll);

userRouter.post("/login", UserController.login);

userRouter.get("/me", authorizeUser, UserController.getUserInfo);

userRouter.patch("/me", authorizeUser, UserController.updateUser);

userRouter.delete("/logout", authorizeUser, UserController.logout);

userRouter.delete("/me", authorizeUser, UserController.deleteUser);

userRouter.all("/", handle405Error);

userRouter.all("/auth/token", handle405Error);

userRouter.all("/me", handle405Error);

export default userRouter;
