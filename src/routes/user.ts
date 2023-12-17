import { Router } from "express";
import UserController from "../controllers/user";
import { authorizeUser } from "../middlewares/token-validator";
import { handle405Error } from "../middlewares/wrong-method-handler";


const userRouter = Router();

userRouter.post("/", UserController.createUser);

userRouter.get("/all", UserController.getAll);

userRouter.post("/login", UserController.login);

userRouter.get("/:id", authorizeUser, UserController.getUserInfo);

userRouter.patch("/:id", authorizeUser, UserController.updateUser);

userRouter.delete("/logout", authorizeUser, UserController.logout);

userRouter.delete("/:id", authorizeUser, UserController.deleteUser);

userRouter.all("/", handle405Error);
userRouter.all("/auth/token", handle405Error);
userRouter.all("/me", handle405Error);

export default userRouter;
