import React from 'react';
import {
  Shield,
  Users,
  Stethoscope,
  Activity,
  Calendar,
  Plus,
  TrendingUp,
  Building2,
  CheckCircle2,
  Clock,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { BottomNavigation } from '../../components/BottomNavigation';
import { DEPARTMENTS, DOCTORS, INITIAL_APPOINTMENTS } from '../../constants/mockData';

export const AdminDashboardScreen: React.FC = () => {
  const { navigate, setAdminActiveTab, logout } = useAppNavigation();

  const totalDoctors = DOCTORS.length;
  const totalDepartments = DEPARTMENTS.length;
  const totalAppointments = INITIAL_APPOINTMENTS.length;
  const pendingAppointments = INITIAL_APPOINTMENTS.filter((a) => a.status === 'Pending').length;

  const adminShortcuts = [
    {
      id: 'doctors',
      label: 'Doctors',
      count: `${totalDoctors} active`,
      icon: Stethoscope,
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      action: () => {
        setAdminActiveTab('doctors');
        navigate('ManageDoctors');
      },
    },
    {
      id: 'patients',
      label: 'Patients',
      count: '1,420 registered',
      icon: Users,
      bg: 'bg-blue-50 text-blue-800 border-blue-100',
      action: () => {
        setAdminActiveTab('patients');
        navigate('ManagePatients');
      },
    },
    {
      id: 'departments',
      label: 'Departments',
      count: `${totalDepartments} units`,
      icon: Building2,
      bg: 'bg-purple-50 text-purple-800 border-purple-100',
      action: () => {
        setAdminActiveTab('departments');
        navigate('ManageDepartments');
      },
    },
    {
      id: 'appointments',
      label: 'Bookings',
      count: `${pendingAppointments} pending`,
      icon: Calendar,
      bg: 'bg-amber-50 text-amber-800 border-amber-100',
      action: () => {
        setAdminActiveTab('appointments');
        navigate('ManageAppointments');
      },
    },
  ];

  return (
    <div id="admin-dashboard" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      {/* Header */}
      <div className="bg-white px-5 pt-5 pb-4 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full">
                Hospital Administration
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">Medicare HQ</h2>
              <p className="text-xs text-slate-500">Facility Operations & Staff Control</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 text-slate-500 hover:text-rose-600 rounded-xl"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Hospital Metrics Overview */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Hospital Key Metrics
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Consultations</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">2,840</p>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +14% this month
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">Bed Occupancy</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">82%</p>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                164 of 200 beds active
              </span>
            </div>
          </div>
        </div>

        {/* Management Shortcuts */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Management Modules
            </span>
            <button
              onClick={() => navigate('AddDoctor')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> New Doctor
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {adminShortcuts.map((sc) => {
              const Icon = sc.icon;
              return (
                <button
                  key={sc.id}
                  id={`admin-module-${sc.id}`}
                  onClick={sc.action}
                  className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xs hover:border-emerald-200 transition-all text-left cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${sc.bg} mb-2.5 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{sc.label}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{sc.count}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent System Activity */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Live Hospital Activity
          </span>
          <div className="bg-white rounded-2xl border border-slate-100 p-3 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Dr. Sarah Jenkins approved Apt #101</span>
              </div>
              <span className="text-[10px] text-slate-400">10m ago</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="font-semibold text-slate-800">New patient registration: Alex Johnson</span>
              </div>
              <span className="text-[10px] text-slate-400">2h ago</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="font-semibold text-slate-800">Cardiology department updated slots</span>
              </div>
              <span className="text-[10px] text-slate-400">Yesterday</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
