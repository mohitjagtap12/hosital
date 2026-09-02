import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Stethoscope,
  FileText,
  Clock,
  ArrowRight,
  Heart,
  Activity,
  Sparkles,
  ChevronRight,
  Bell,
  Pill,
} from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { DEPARTMENTS, DOCTORS, INITIAL_APPOINTMENTS, INITIAL_REPORTS } from '../../constants/mockData';
import { DoctorCard } from '../../components/DoctorCard';
import { BottomNavigation } from '../../components/BottomNavigation';
import { StatusBadge } from '../../components/StatusBadge';

export const PatientDashboardScreen: React.FC = () => {
  const { navigate, setSelectedDoctor, setSelectedDepartment, setPatientActiveTab } = useAppNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const upcomingApt = INITIAL_APPOINTMENTS.find((a) => a.status === 'Approved') || INITIAL_APPOINTMENTS[0];

  const quickServices = [
    {
      id: 'doctors',
      label: 'Doctors',
      icon: Stethoscope,
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      action: () => {
        setPatientActiveTab('doctors');
        navigate('DoctorList');
      },
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      bg: 'bg-blue-50 text-blue-700 border-blue-100',
      action: () => {
        setPatientActiveTab('appointments');
        navigate('MyAppointments');
      },
    },
    {
      id: 'prescriptions',
      label: 'Prescriptions',
      icon: Pill,
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      action: () => {
        navigate('Prescriptions');
      },
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      bg: 'bg-purple-50 text-purple-700 border-purple-100',
      action: () => {
        setPatientActiveTab('records');
        navigate('MedicalReports');
      },
    },
  ];

  return (
    <div id="patient-dashboard" className="flex flex-col min-h-screen bg-slate-50/50 pb-16">
      {/* Top Header Bar */}
      <div className="bg-white px-5 pt-5 pb-4 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate('PatientProfile')}
              className="relative cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Patient Profile"
                className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Welcome back
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Alex Johnson
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="patient-dashboard-notif"
              onClick={() => navigate('Notifications')}
              className="relative p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-2xl transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
            </button>
          </div>
        </div>

        {/* Search Doctor Input */}
        <div className="mt-4">
          <div
            onClick={() => navigate('SearchDoctor')}
            className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl cursor-pointer text-slate-400 text-xs transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search doctors, clinics, or specialities...</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6 flex-1 text-left">
        {/* Upcoming Appointment Card */}
        {upcomingApt && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Upcoming Appointment
              </span>
              <button
                onClick={() => navigate('MyAppointments')}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                View all
              </button>
            </div>

            <div
              id="upcoming-appointment-card"
              onClick={() => navigate('AppointmentDetails', { appointment: upcomingApt })}
              className="p-4 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-md shadow-emerald-900/10 cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={upcomingApt.doctorImage}
                    alt={upcomingApt.doctorName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{upcomingApt.doctorName}</h4>
                    <p className="text-xs text-emerald-200">{upcomingApt.doctorSpecialization}</p>
                  </div>
                </div>

                <StatusBadge status={upcomingApt.status} size="sm" />
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-xs text-emerald-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>{upcomingApt.date}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-emerald-300" />
                  <span>{upcomingApt.time}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Services */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Quick Services
          </span>
          <div className="grid grid-cols-4 gap-2.5">
            {quickServices.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  id={`service-btn-${service.id}`}
                  onClick={service.action}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${service.bg} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 mt-2 truncate w-full text-center">
                    {service.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Medical Departments */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Departments
            </span>
            <button
              onClick={() => navigate('DepartmentList')}
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
            >
              See All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {DEPARTMENTS.slice(0, 5).map((dept) => (
              <div
                key={dept.id}
                id={`dept-chip-${dept.id}`}
                onClick={() => {
                  setSelectedDepartment(dept);
                  navigate('DoctorList', { department: dept });
                }}
                className="shrink-0 p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-emerald-200 cursor-pointer min-w-[120px]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                  <Activity className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-slate-900 truncate">{dept.name}</h5>
                <p className="text-[10px] text-slate-400 mt-0.5">{dept.doctorCount} Doctors</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Doctors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recommended Doctors
            </span>
            <button
              onClick={() => navigate('DoctorList')}
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {DOCTORS.slice(0, 2).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onSelect={(doc) => {
                  setSelectedDoctor(doc);
                  navigate('DoctorDetails', { doctor: doc });
                }}
                onBook={(doc) => {
                  setSelectedDoctor(doc);
                  navigate('AppointmentBooking', { doctor: doc });
                }}
              />
            ))}
          </div>
        </div>

        {/* Recent Medical Records */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recent Medical Records
            </span>
            <button
              onClick={() => navigate('MedicalReports')}
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
            >
              All Reports <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {INITIAL_REPORTS.slice(0, 1).map((rep) => (
              <div
                key={rep.id}
                onClick={() => navigate('MedicalReportDetails', { report: rep })}
                className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between cursor-pointer hover:border-blue-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{rep.reportName}</h5>
                    <p className="text-[11px] text-slate-400">By {rep.doctorName}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
