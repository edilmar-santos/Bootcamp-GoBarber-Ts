import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();

router.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return res.json(appointments);
});

router.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  try {
    const createAppointmentService = new CreateAppointmentService();

    const parsedData = parseISO(date);

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedData,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
