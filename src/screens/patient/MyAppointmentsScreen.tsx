import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AppointmentCard } from '../../components/AppointmentCard';
import { EmptyState } from '../../components/EmptyState';
import { CustomButton } from '../../components/CustomButton';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { Appointment, AppointmentStatus } from '../../types';

export const MyAppointmentsScreen: React.FC = () => {
  const { navigate, setSelectedAppointment, setPatientActiveTab } = useAppNavigation();
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [filter, setFilter] = useState<'All' | 'Approved' | 'Pending' | 'Completed'>('All');

  const handleCancelAppointment = (apt: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: 'Cancelled' as AppointmentStatus } : a))
    );
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'All') return true;
    return apt.status === filter;
  });

  return (
    <div id="my-appointments-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header
        title="My Appointments"
        showBack
        rightAction={
          <button
            onClick={() => {
              setPatientActiveTab('doctors');
              navigate('DoctorList');
            }}
            className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl"
            aria-label="Book new"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      {/* Filter Tabs */}
      <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        {(['All', 'Approved', 'Pending', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            id={`filter-tab-${tab}`}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filter === tab
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {filteredAppointments.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No Appointments"
            description="You don't have any appointments matching this category right now."
            actionText="Find a Doctor"
            onAction={() => {
              setPatientActiveTab('doctors');
              navigate('DoctorList');
            }}
          />
        ) : (
          filteredAppointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              role="patient"
              onSelect={(item) => {
                setSelectedAppointment(item);
                navigate('AppointmentDetails', { appointment: item });
              }}
              onCancel={handleCancelAppointment}
            />
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
