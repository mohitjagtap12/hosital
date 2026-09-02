import React from 'react';
import { History, Calendar } from 'lucide-react';
import { Header } from '../../components/Header';
import { AppointmentCard } from '../../components/AppointmentCard';
import { EmptyState } from '../../components/EmptyState';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const AppointmentHistoryScreen: React.FC = () => {
  const { navigate, setSelectedAppointment } = useAppNavigation();

  // Completed or cancelled appointments
  const historyList = INITIAL_APPOINTMENTS.filter(
    (a) => a.status === 'Completed' || a.status === 'Cancelled'
  );

  return (
    <div id="appointment-history-screen" className="flex flex-col min-h-screen bg-slate-50/50 text-left">
      <Header title="Past Appointments" showBack />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-xs">
          <h3 className="text-xs font-bold">Completed & Historic Visits</h3>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Archive of consultations, discharged encounters, and previous physician notes.
          </p>
        </div>

        {historyList.length === 0 ? (
          <EmptyState
            icon={History}
            title="No Past Visits"
            description="You have not completed any clinical consultations yet."
          />
        ) : (
          historyList.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              role="patient"
              onSelect={(item) => {
                setSelectedAppointment(item);
                navigate('AppointmentDetails', { appointment: item });
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
