import React from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Download, ArrowRight, Home } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { StatusBadge } from '../../components/StatusBadge';

export const AppointmentConfirmationScreen: React.FC = () => {
  const { navigate, selectedAppointment, setPatientActiveTab } = useAppNavigation();

  const appointment = selectedAppointment || {
    id: 'apt-789',
    patientName: 'Alex Johnson',
    doctorName: 'Dr. Sarah Jenkins',
    departmentName: 'Cardiology',
    doctorSpecialization: 'Senior Cardiologist',
    date: 'Sep 03, 2026',
    time: '10:00 AM',
    reason: 'Routine cardiac health review',
    status: 'Pending' as const,
  };

  return (
    <div id="appointment-confirmation-screen" className="flex flex-col min-h-screen bg-slate-50/50 justify-between text-left">
      <Header title="Booking Submitted" showBack={false} />

      <div className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Success Banner */}
        <div className="flex flex-col items-center text-center space-y-3 py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border-4 border-emerald-50 shadow-sm animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Booking Requested!</h2>
            <p className="text-xs text-slate-500 max-w-xs">
              Your appointment request has been sent to the doctor for confirmation.
            </p>
          </div>
        </div>

        {/* Details Card */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Appointment Ref</span>
              <p className="text-xs font-mono font-bold text-slate-800">{appointment.id}</p>
            </div>
            <StatusBadge status={appointment.status} size="sm" />
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 text-[11px] block">Doctor</span>
              <h4 className="font-bold text-slate-900 text-sm">{appointment.doctorName}</h4>
              <p className="text-emerald-700 font-medium">{appointment.doctorSpecialization} • {appointment.departmentName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
              <div>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                  <Calendar className="w-3 h-3 text-emerald-700" /> Date
                </span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{appointment.date}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase">
                  <Clock className="w-3 h-3 text-emerald-700" /> Time
                </span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{appointment.time}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[11px] block">Location</span>
              <p className="font-medium text-slate-800 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Medicare Hospital, OPD Consultation Suite 204
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[11px] block">Reason for Visit</span>
              <p className="text-slate-700 mt-0.5 font-medium">{appointment.reason}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 bg-white border-t border-slate-100 space-y-2.5">
        <CustomButton
          id="view-my-appointments-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => {
            setPatientActiveTab('appointments');
            navigate('MyAppointments');
          }}
        >
          View My Appointments
        </CustomButton>

        <CustomButton
          id="back-home-btn"
          fullWidth
          size="md"
          variant="ghost"
          icon={<Home className="w-4 h-4" />}
          onClick={() => {
            setPatientActiveTab('home');
            navigate('PatientDashboard');
          }}
        >
          Return to Home
        </CustomButton>
      </div>
    </div>
  );
};
