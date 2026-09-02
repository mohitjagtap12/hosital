import React, { useState } from 'react';
import { Clock, CalendarCheck, Filter } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AppointmentCard } from '../../components/AppointmentCard';
import { EmptyState } from '../../components/EmptyState';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { Appointment } from '../../types';

export const TodayAppointmentsScreen: React.FC = () => {
  const { navigate, setSelectedAppointment } = useAppNavigation();
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const handleApprove = (apt: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: 'Approved' } : a))
    );
  };

  const handleReject = (apt: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: 'Rejected' } : a))
    );
  };

  return (
    <div id="today-appointments-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="Today's Appointments" showBack />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="p-3.5 bg-emerald-800 text-white rounded-2xl shadow-xs">
          <h3 className="text-xs font-bold">Daily Consultation Queue</h3>
          <p className="text-[11px] text-emerald-100 mt-0.5">
            Manage incoming arrivals, approve pending bookings, and initiate clinical evaluations.
          </p>
        </div>

        <div className="space-y-3">
          {appointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              role="doctor"
              onSelect={(item) => {
                setSelectedAppointment(item);
                navigate('PatientDetails', { appointment: item });
              }}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
