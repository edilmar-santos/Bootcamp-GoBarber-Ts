import { Router } from 'express';
import appointments from './appointment.router';
import users from './user.router';
import sessions from './session.router';

const router = Router();

router.use('/sessions', sessions);
router.use('/appointments', appointments);
router.use('/users', users);

export default router;
