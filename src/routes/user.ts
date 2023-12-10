import { Router } from 'express';
import UserController from '../controllers/user';
import { authorizeUser } from '../middlewares/token-validator';
import { handle405Error } from '../middlewares/wrong-method-handler';

 const userRouter = Router();

userRouter.post('/', UserController.createUser);
//userRouter.post('/auth/token', UserController.loginUser);

userRouter.get('/me', authorizeUser, UserController.getUserInfo);

userRouter.all('/', handle405Error);
userRouter.all('/auth/token', handle405Error);
userRouter.all('/me', handle405Error);

export default userRouter;
