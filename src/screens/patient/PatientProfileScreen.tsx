import React from 'react';
import { User, Phone, Mail, MapPin, Calendar, Heart, Shield, LogOut, ChevronRight, Bell, FileText } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const PatientProfileScreen: React.FC = () => {
  const { navigate, logout, setPatientActiveTab } = useAppNavigation();

  return (
    <div id="patient-profile-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="My Profile" showBack={false} />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* User Card */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Alex Johnson"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-white text-[9px] font-bold rounded-full">
              Patient
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-900 truncate">Alex Johnson</h3>
            <p className="text-xs text-slate-500">Patient ID: MED-89410</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold">
              Blood Group: O+ (Positive)
            </span>
          </div>
        </div>

        {/* Vital stats */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 bg-white rounded-2xl border border-slate-100 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Age</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">32 yrs</p>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-slate-100 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Weight</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">68 kg</p>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-slate-100 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Height</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">178 cm</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Contact Information
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 text-slate-700">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>alex.johnson@example.com</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>+1 (555) 019-2834</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>742 Evergreen Terrace, Springfield</span>
            </div>
          </div>
        </div>

        {/* Quick Menu List */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
          <button
            onClick={() => navigate('AppointmentHistory')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Appointment History</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigate('Prescriptions')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>My Prescriptions</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigate('Notifications')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-emerald-700" />
              <span>Notification Preferences</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <CustomButton
            id="patient-logout-btn"
            fullWidth
            variant="outline"
            className="border-rose-200 text-rose-700 hover:bg-rose-50"
            icon={<LogOut className="w-4 h-4" />}
            onClick={logout}
          >
            Sign Out
          </CustomButton>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
