import { Router } from "express";
import UserController from "../controllers/user";
import { authorizeUser } from "../middlewares/token-validator";
import { handle405Error } from "../middlewares/wrong-method-handler";

const userRouter = Router();

userRouter.post("/", UserController.createUser);
// userRouter.post("/", (req, res) => {
//   res.status(200).json({ message: "UserController.createUser" });
// });
userRouter.get("/all", UserController.getAll);

userRouter.post("/login", UserController.login);

userRouter.get("/:id", UserController.getUserInfo);
//userRouter.get("/me", authorizeUser, UserController.getUserInfo);
// userRouter.get("/me", authorizeUser, (req, res) => {
//   res.status(200).json({ message: "UserController.getUserInfo" });
// });

userRouter.patch("/:id", UserController.updateUser);
// userRouter.patch("/:username", (req, res) => {
//   res.status(200).json({ message: "UserController.updateUser" });
// });

// userRouter.post("/auth/token", (req, res) => {
//   res.status(200).json({ message: "UserController.login" });
// });

// userRouter.delete('/logout', UserController.logout);
userRouter.delete("/logout", (req, res) => {
  res.status(200).json({ message: "UserController.logout" });
});

userRouter.delete("/:id", UserController.deleteUser);
// userRouter.delete("/:id", (req, res) => {
//   res.status(200).json({ message: "UserController.delete" }); // deleteUser
// });

userRouter.all("/", handle405Error);
userRouter.all("/auth/token", handle405Error);
userRouter.all("/me", handle405Error);

export default userRouter;

// import { Router } from 'express';
// import UserController from '../controllers/user-controller';
// import authMiddleware from '../middlewares/auth';

// export const userRouter = Router();

// userRouter.get('/', UserController.getAll);

// // Para efectuar el login, el método que corresponde es POST, ya que su función es la de CREAR un nuevo token.
// userRouter.post('/login', UserController.login);

// userRouter.post('/', authMiddleware, UserController.createUser);
// userRouter.patch('/:username', authMiddleware, UserController.update);

// // Para efectuar el logout de un usuario, el método que corresponde es el DELETE, ya que estamos borrando info de la BBDD, el token creado al momento del login.
// userRouter.delete('/logout', authMiddleware, UserController.logout);
// userRouter.delete('/:username', authMiddleware, UserController.delete);
