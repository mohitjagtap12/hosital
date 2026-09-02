import React from 'react';
import { CalendarCheck, Calendar } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AppointmentCard } from '../../components/AppointmentCard';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const UpcomingAppointmentsScreen: React.FC = () => {
  const { navigate, setSelectedAppointment } = useAppNavigation();

  return (
    <div id="upcoming-appointments-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="Upcoming Consultations" showBack />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="p-3.5 bg-blue-900 text-white rounded-2xl shadow-xs">
          <h3 className="text-xs font-bold">Confirmed Advance Bookings</h3>
          <p className="text-[11px] text-blue-100 mt-0.5">
            Patients scheduled for consultations later this week and upcoming months.
          </p>
        </div>

        <div className="space-y-3">
          {INITIAL_APPOINTMENTS.filter((a) => a.status === 'Approved').map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              role="doctor"
              onSelect={(item) => {
                setSelectedAppointment(item);
                navigate('PatientDetails', { appointment: item });
              }}
            />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
