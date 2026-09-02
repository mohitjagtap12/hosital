import React from 'react';
import { Stethoscope, Calendar, Clock, Award, Phone, Mail, LogOut, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { DOCTORS } from '../../constants/mockData';

export const DoctorProfileScreen: React.FC = () => {
  const { navigate, logout } = useAppNavigation();
  const doctor = DOCTORS[0];

  return (
    <div id="doctor-profile-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="Physician Profile" showBack={false} />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Doctor Header */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-900 truncate">{doctor.name}</h3>
            <p className="text-xs text-emerald-700 font-semibold">{doctor.specialization}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{doctor.departmentName} Department</p>
          </div>
        </div>

        {/* Credentials */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Professional Credentials
          </h4>
          <div className="space-y-1.5 text-xs text-slate-700">
            <p><span className="font-semibold text-slate-900">Degrees:</span> {doctor.qualification}</p>
            <p><span className="font-semibold text-slate-900">Experience:</span> {doctor.experience}</p>
            <p><span className="font-semibold text-slate-900">Consultation Fee:</span> ${doctor.consultationFee}</p>
          </div>
        </div>

        {/* Available Schedule Settings */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Active Schedule
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {doctor.availableDays.map((d) => (
              <span key={d} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-2">
            {doctor.availableSlots.map((s) => (
              <span key={s} className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] text-center font-medium rounded-lg">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Doctor Links */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
          <button
            onClick={() => navigate('DoctorAppointmentHistory')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Historic Encounters Archive</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Logout */}
        <div className="pt-2">
          <CustomButton
            id="doctor-logout-btn"
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
