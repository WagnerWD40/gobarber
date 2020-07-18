import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);

    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.use(ensureAuthenticated);

usersRouter.patch('/avatar', upload.single('avatar'), async (request, response) => {
    return response.json({ message: 'ok' });
});

export default usersRouter;