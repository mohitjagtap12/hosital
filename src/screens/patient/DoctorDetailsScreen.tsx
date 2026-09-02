import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Award,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Heart,
} from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { DOCTORS } from '../../constants/mockData';

export const DoctorDetailsScreen: React.FC = () => {
  const { navigate, selectedDoctor, setSelectedDoctor } = useAppNavigation();
  const doctor = selectedDoctor || DOCTORS[0];

  return (
    <div id="doctor-details-screen" className="flex flex-col min-h-screen bg-slate-50/50">
      <Header
        title="Doctor Profile"
        showBack
        rightAction={
          <button className="p-2 text-slate-500 hover:text-rose-600 rounded-xl">
            <Heart className="w-5 h-5" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-24 text-left">
        {/* Profile Hero */}
        <div className="bg-white p-6 border-b border-slate-100 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-50 shadow-md"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-2 bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full ring-2 ring-white">
              ★ {doctor.rating} ({doctor.reviewCount})
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 mt-4">{doctor.name}</h2>
          <p className="text-xs font-semibold text-emerald-700">{doctor.specialization}</p>
          <p className="text-xs text-slate-500 mt-0.5">{doctor.departmentName} Department</p>

          {/* Key metrics row */}
          <div className="grid grid-cols-3 gap-3 w-full mt-5 pt-4 border-t border-slate-100">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400">Experience</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{doctor.experience}</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400">Consultation</span>
              <p className="text-xs font-bold text-emerald-700 mt-0.5">${doctor.consultationFee}</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400">Rating</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{doctor.rating} / 5.0</p>
            </div>
          </div>
        </div>

        {/* Doctor Details Body */}
        <div className="p-5 space-y-4">
          {/* About */}
          <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              About Doctor
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {doctor.about || 'Senior clinical medical practitioner focused on providing compassionate, patient-first evidence-based health treatments.'}
            </p>
            <p className="text-xs font-medium text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
              Graduated: {doctor.qualification}
            </p>
          </div>

          {/* Hospital / Clinic Info */}
          <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Hospital & Department
            </h3>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Medicare Central Hospital • Tower B, 3rd Floor</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{doctor.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{doctor.email}</span>
            </div>
          </div>

          {/* Availability */}
          <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Available Days
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.availableDays.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-100"
                >
                  {day}
                </span>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pt-1">
              Available Time Slots
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availableSlots.map((slot) => (
                <span
                  key={slot}
                  className="px-2.5 py-1.5 bg-slate-50 text-slate-700 text-xs text-center font-medium rounded-lg border border-slate-200"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Booking Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-between gap-4 z-40">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Fee</span>
          <p className="text-base font-extrabold text-slate-900">${doctor.consultationFee}</p>
        </div>
        <CustomButton
          id="doctor-book-appointment-btn"
          size="lg"
          variant="primary"
          className="flex-1"
          onClick={() => {
            setSelectedDoctor(doctor);
            navigate('AppointmentBooking', { doctor });
          }}
        >
          Book Appointment
        </CustomButton>
      </div>
    </div>
  );
};
