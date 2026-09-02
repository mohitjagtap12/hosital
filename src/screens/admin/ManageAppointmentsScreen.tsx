import React, { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AppointmentCard } from '../../components/AppointmentCard';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';
import { Appointment, AppointmentStatus } from '../../types';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const ManageAppointmentsScreen: React.FC = () => {
  const { navigate, setSelectedAppointment } = useAppNavigation();
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Completed' | 'Cancelled'>('All');

  const handleApprove = (apt: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: 'Approved' as AppointmentStatus } : a))
    );
  };

  const handleCancel = (apt: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: 'Cancelled' as AppointmentStatus } : a))
    );
  };

  const filtered = appointments.filter((a) => {
    if (statusFilter === 'All') return true;
    return a.status === statusFilter;
  });

  return (
    <div id="manage-appointments-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="All Appointments" showBack />

      {/* Filter Tabs */}
      <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        {(['All', 'Pending', 'Approved', 'Completed', 'Cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === tab
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <span className="text-xs text-slate-500 font-medium">{filtered.length} Bookings Recorded</span>

        <div className="space-y-2.5">
          {filtered.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              role="admin"
              onSelect={(item) => {
                setSelectedAppointment(item);
                navigate('AppointmentDetails', { appointment: item });
              }}
              onApprove={handleApprove}
              onCancel={handleCancel}
            />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
