import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/Appointment';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const parsedDate = startOfHour(date);

    const findAppointmentAtSameDate = await appointmentRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentAtSameDate) {
      throw Error('Já existe um agendamento para esse horário');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: parsedDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
