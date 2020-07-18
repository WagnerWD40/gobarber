import Appointment from '../models/Appointment';
import AppointMentsRepository from '../repositories/AppointmentsReposiotory';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

interface RequestDTO {
    provider: string;
    date: Date;
};

class CreateAppointmentService {
    public async execute({ date, provider}: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointMentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        };

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    };
};

export default CreateAppointmentService;