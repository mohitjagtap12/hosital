import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { DOCTORS } from '../../constants/mockData';
import { Appointment } from '../../types';

export const AppointmentBookingScreen: React.FC = () => {
  const { navigate, selectedDoctor, setSelectedAppointment } = useAppNavigation();
  const doctor = selectedDoctor || DOCTORS[0];

  const dates = [
    { label: 'Today', date: 'Sep 02', day: 'Wed' },
    { label: 'Tomorrow', date: 'Sep 03', day: 'Thu' },
    { label: 'Fri', date: 'Sep 04', day: 'Fri' },
    { label: 'Sat', date: 'Sep 05', day: 'Sat' },
    { label: 'Mon', date: 'Sep 07', day: 'Mon' },
  ];

  const [selectedDate, setSelectedDate] = useState(dates[1].date);
  const [selectedTime, setSelectedTime] = useState(doctor.availableSlots[0] || '10:00 AM');
  const [reason, setReason] = useState('');
  const [patientName, setPatientName] = useState('Alex Johnson');
  const [patientPhone, setPatientPhone] = useState('+1 (555) 019-2834');

  const handleConfirm = () => {
    const newAppointment: Appointment = {
      id: `apt-${Math.floor(100 + Math.random() * 900)}`,
      patientId: 'pat-1',
      doctorId: doctor.id,
      patientName,
      doctorName: doctor.name,
      departmentName: doctor.departmentName,
      doctorSpecialization: doctor.specialization,
      doctorImage: doctor.profileImage,
      date: selectedDate,
      time: selectedTime,
      reason: reason || 'General medical consultation',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setSelectedAppointment(newAppointment);
    navigate('AppointmentConfirmation', { appointment: newAppointment });
  };

  return (
    <div id="appointment-booking-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-24 text-left">
      <Header title="Book Appointment" showBack />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Selected Doctor Summary Card */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3.5">
          <img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-14 h-14 rounded-2xl object-cover border border-emerald-100 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {doctor.departmentName}
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">{doctor.name}</h3>
            <p className="text-xs text-slate-500 truncate">{doctor.specialization}</p>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">Fee: ${doctor.consultationFee}</p>
          </div>
        </div>

        {/* Date Selection */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <CalendarIcon className="w-4 h-4 text-emerald-700" />
            <span>Select Consultation Date</span>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {dates.map((d, index) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {d.day}
                  </span>
                  <span className="text-xs font-bold mt-0.5">{d.date.split(' ')[1]}</span>
                  <span className={`text-[9px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {d.date.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Available Time Slots</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {doctor.availableSlots.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Patient Details & Reason */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <User className="w-4 h-4 text-emerald-700" />
            <span>Patient Information</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-slate-600 block mb-1 font-medium">Patient Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="text-slate-600 block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="text-slate-600 block mb-1 font-medium">Chief Complaint / Health Reason</label>
              <textarea
                rows={2}
                placeholder="Briefly describe your symptoms or reason for visit..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Confirmation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 z-40 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Payable</span>
          <p className="text-base font-extrabold text-emerald-800">${doctor.consultationFee}</p>
        </div>
        <CustomButton
          id="confirm-booking-btn"
          size="lg"
          variant="primary"
          className="flex-1"
          onClick={handleConfirm}
        >
          Confirm & Book
        </CustomButton>
      </div>
    </div>
  );
};
