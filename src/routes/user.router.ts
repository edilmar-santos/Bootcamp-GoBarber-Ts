import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import requestAuthentication from '../middlewares/auth';
import multerConfig from '../config/upload';

const router = Router();
const upload = multer(multerConfig);

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.patch(
  '/avatar',
  requestAuthentication,
  upload.single('avatar'),
  async (req, res) => {
    console.log(req.file);

    res.json({ ok: true });
  },
);

export default router;
