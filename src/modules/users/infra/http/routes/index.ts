import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController copy';
import { GetUserByIdController } from '../controllers/GetUserByIdController';
import { SessionController } from '../controllers/SessionController';
import { UpdateUserController } from '../controllers/UpdateUserController';

const userRoutes = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const sessionController = new SessionController();
const getUserByIdController = new GetUserByIdController();

userRoutes.post('/', upload.single('file'), createUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);
userRoutes.patch('/', upload.single('file'), updateUserController.handle);
userRoutes.post('/session', sessionController.handle);
userRoutes.get('/:id', getUserByIdController.handle);

export default userRoutes;
