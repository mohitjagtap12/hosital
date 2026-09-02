import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Plus,
  Pill,
  ChevronRight,
  Stethoscope,
  Upload,
} from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AppointmentCard } from '../../components/AppointmentCard';
import { StatusBadge } from '../../components/StatusBadge';
import { INITIAL_APPOINTMENTS, DOCTORS } from '../../constants/mockData';
import { Appointment } from '../../types';

export const DoctorDashboardScreen: React.FC = () => {
  const { navigate, setDoctorActiveTab, setSelectedAppointment } = useAppNavigation();
  const doctor = DOCTORS[0]; // Dr. Sarah Jenkins
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const todayCount = appointments.filter((a) => a.date.includes('Tomorrow') || a.date.includes('Today')).length;
  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

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

  const quickActions = [
    {
      id: 'today',
      label: "Today's Schedule",
      icon: Clock,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      action: () => {
        setDoctorActiveTab('today');
        navigate('TodayAppointments');
      },
    },
    {
      id: 'prescription',
      label: 'Write Rx',
      icon: Pill,
      color: 'bg-blue-50 text-blue-800 border-blue-100',
      action: () => navigate('AddPrescription'),
    },
    {
      id: 'upload',
      label: 'Upload Report',
      icon: Upload,
      color: 'bg-purple-50 text-purple-800 border-purple-100',
      action: () => navigate('UploadMedicalReport'),
    },
    {
      id: 'consult',
      label: 'Consultation',
      icon: Stethoscope,
      color: 'bg-amber-50 text-amber-800 border-amber-100',
      action: () => navigate('Consultation'),
    },
  ];

  return (
    <div id="doctor-dashboard" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      {/* Top Doctor Profile Bar */}
      <div className="bg-white px-5 pt-5 pb-4 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                setDoctorActiveTab('profile');
                navigate('DoctorProfile');
              }}
              className="relative cursor-pointer"
            >
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-600 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-600 border-2 border-white rounded-full" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Physician Portal
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5 leading-tight">{doctor.name}</h2>
              <p className="text-xs text-slate-500">{doctor.specialization}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-xl font-extrabold text-slate-900">{todayCount}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Today's Visits</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <p className="text-xl font-extrabold text-amber-700">{pendingCount}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Pending Approval</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xl font-extrabold text-blue-700">{completedCount}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Completed</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Doctor Actions
          </span>
          <div className="grid grid-cols-4 gap-2.5">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.id}
                  onClick={qa.action}
                  className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xs flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${qa.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 mt-2 truncate w-full">
                    {qa.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Appointments List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pending & Today's Appointments
            </span>
            <button
              onClick={() => {
                setDoctorActiveTab('today');
                navigate('TodayAppointments');
              }}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              View Schedule
            </button>
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
      </div>

      <BottomNavigation />
    </div>
  );
};
