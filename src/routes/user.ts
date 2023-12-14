import { Router } from "express";
import UserController from "../controllers/user";
import { authorizeUser } from "../middlewares/token-validator";
import { handle405Error } from "../middlewares/wrong-method-handler";

const userRouter = Router();

//userRouter.post("/", UserController.createUser);
userRouter.post("/", (req, res) => {
    res.status(200).json({ message: "UserController.createUser" });
  });
  
//userRouter.post('/auth/token', UserController.loginUser);
userRouter.post("/auth/token", (req, res) => {
  res.status(200).json({ message: "UserController.loginUser" });
});

// userRouter.patch('/:username', UserController.update);
userRouter.patch("/:username", (req, res) => {
  res.status(200).json({ message: "UserController.update" });
});

//userRouter.get("/me", authorizeUser, UserController.getUserInfo);
userRouter.get("/me", authorizeUser, (req, res) => {
    // Lógica que necesitas antes de enviar la respuesta al cliente
  
    // Enviar una respuesta al cliente con el mensaje deseado
    res.status(200).json({ message: "UserController.getUserInfo" });
  });
  

// userRouter.delete('/logout', UserController.logout);
userRouter.delete('/logout', (req, res) => {
    res.status(200).json({ message: "UserController.logout" });
  });
  
// userRouter.delete('/:username', UserController.delete);
userRouter.delete('/:username', (req, res) => {
    res.status(200).json({ message: "UserController.delete" });
  });
  

userRouter.all("/", handle405Error);
userRouter.all("/auth/token", handle405Error);
userRouter.all("/me", handle405Error);

export default userRouter;

// falta gregar update, logout y delete

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
