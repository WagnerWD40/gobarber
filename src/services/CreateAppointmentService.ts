import Appointment from '../models/Appointment';
import AppointMentsRepository from '../repositories/AppointmentsReposiotory';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import AppError from '../errors/AppError';

interface RequestDTO {
    providerId: string;
    date: Date;
};

class CreateAppointmentService {
    public async execute({ date, providerId}: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointMentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        };

        const appointment = appointmentsRepository.create({
            provider_id: providerId,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    };
};

export default CreateAppointmentService;