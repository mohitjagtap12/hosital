import React from 'react';
import { History } from 'lucide-react';
import { Header } from '../../components/Header';
import { AppointmentCard } from '../../components/AppointmentCard';
import { EmptyState } from '../../components/EmptyState';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const DoctorAppointmentHistoryScreen: React.FC = () => {
  const { navigate, setSelectedAppointment } = useAppNavigation();
  const completedAppointments = INITIAL_APPOINTMENTS.filter((a) => a.status === 'Completed');

  return (
    <div id="doctor-appointment-history-screen" className="flex flex-col min-h-screen bg-slate-50/50 text-left">
      <Header title="Consultation Archive" showBack />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-xs">
          <h3 className="text-xs font-bold">Past Consultations & Discharges</h3>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Historic patient visits, recorded vitals, prescriptions, and completed diagnoses.
          </p>
        </div>

        {completedAppointments.length === 0 ? (
          <EmptyState
            icon={History}
            title="No Historic Visits"
            description="You have not finalized any patient consultations yet."
          />
        ) : (
          completedAppointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              role="doctor"
              onSelect={(item) => {
                setSelectedAppointment(item);
                navigate('PatientDetails', { appointment: item });
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
