import React from 'react';
import { Home, Users, Calendar, FileText, User, Clock, CalendarCheck, ShieldCheck, Stethoscope } from 'lucide-react';
import { useAppNavigation } from '../navigation/NavigationContext';

export const BottomNavigation: React.FC = () => {
  const {
    userRole,
    navigate,
    patientActiveTab,
    setPatientActiveTab,
    doctorActiveTab,
    setDoctorActiveTab,
    adminActiveTab,
    setAdminActiveTab,
  } = useAppNavigation();

  if (!userRole) return null;

  if (userRole === 'patient') {
    const tabs = [
      { id: 'home', label: 'Home', icon: Home, screen: 'PatientDashboard' as const },
      { id: 'doctors', label: 'Doctors', icon: Stethoscope, screen: 'DoctorList' as const },
      { id: 'appointments', label: 'Appointments', icon: Calendar, screen: 'MyAppointments' as const },
      { id: 'records', label: 'Records', icon: FileText, screen: 'MedicalReports' as const },
      { id: 'profile', label: 'Profile', icon: User, screen: 'PatientProfile' as const },
    ];

    return (
      <nav id="patient-bottom-nav" className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = patientActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`patient-tab-${tab.id}`}
                onClick={() => {
                  setPatientActiveTab(tab.id as any);
                  navigate(tab.screen);
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-3 min-h-[48px] rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-emerald-800 font-semibold'
                    : 'text-slate-500 hover:text-slate-700 font-normal'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (userRole === 'doctor') {
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, screen: 'DoctorDashboard' as const },
      { id: 'today', label: "Today's", icon: Clock, screen: 'TodayAppointments' as const },
      { id: 'upcoming', label: 'Upcoming', icon: CalendarCheck, screen: 'UpcomingAppointments' as const },
      { id: 'profile', label: 'Profile', icon: User, screen: 'DoctorProfile' as const },
    ];

    return (
      <nav id="doctor-bottom-nav" className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = doctorActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`doctor-tab-${tab.id}`}
                onClick={() => {
                  setDoctorActiveTab(tab.id as any);
                  navigate(tab.screen);
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-3 min-h-[48px] rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-emerald-800 font-semibold'
                    : 'text-slate-500 hover:text-slate-700 font-normal'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Admin bottom nav
  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, screen: 'AdminDashboard' as const },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope, screen: 'ManageDoctors' as const },
    { id: 'patients', label: 'Patients', icon: Users, screen: 'ManagePatients' as const },
    { id: 'appointments', label: 'Bookings', icon: Calendar, screen: 'ManageAppointments' as const },
  ];

  return (
    <nav id="admin-bottom-nav" className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {adminTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = adminActiveTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
              onClick={() => {
                setAdminActiveTab(tab.id as any);
                navigate(tab.screen);
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 min-h-[48px] rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-800 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 font-normal'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
