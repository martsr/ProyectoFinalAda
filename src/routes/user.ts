import { Router } from "express"
// import UserController from '../controllers/user';
// //import MovementController from '../controllers/movement';
// import { authorizeUser } from '../middlewares/token-validator';
// import { handle405Error } from '../middlewares/wrong-method-handler';

const userRouter = Router()

// userRouter.post('/', UserController.createNew);
// userRouter.post('/auth/token', UserController.login);

// userRouter.get('/me', authorizeUser, UserController.getInfo);

// // userRouter.get('/me/movements', authorizeUser, MovementController.getAll);

// // userRouter.post('/me/movements', authorizeUser, MovementController.createNew);

// userRouter.all('/', handle405Error);
// userRouter.all('/auth/token', handle405Error);
// userRouter.all('/me', handle405Error);
// //userRouter.all('/me/movements', handle405Error);

export default userRouter
