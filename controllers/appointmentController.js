// Mock Appointment Data
let appointments = [];

const scheduleAppointment = (req, res) => {
  const { doctor, date, time } = req.body;
  appointments.push({ doctor, date, time });
  res.status(201).json({ message: 'Appointment scheduled successfully', appointment: { doctor, date, time } });
};

module.exports = { scheduleAppointment };
