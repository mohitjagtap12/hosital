import React from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, AlertTriangle, FileText, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';

export const AppointmentDetailsScreen: React.FC = () => {
  const { navigate, selectedAppointment, goBack } = useAppNavigation();
  const appointment = selectedAppointment || INITIAL_APPOINTMENTS[0];

  return (
    <div id="appointment-details-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-20 text-left">
      <Header title="Appointment Details" showBack />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Status Header Card */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400">ID: {appointment.id}</span>
            <StatusBadge status={appointment.status} size="md" />
          </div>

          <div className="flex items-center gap-3.5 pt-2">
            {appointment.doctorImage ? (
              <img
                src={appointment.doctorImage}
                alt={appointment.doctorName}
                className="w-14 h-14 rounded-2xl object-cover border border-emerald-100"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-lg">
                {appointment.doctorName.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900">{appointment.doctorName}</h3>
              <p className="text-xs text-emerald-700 font-medium">{appointment.doctorSpecialization}</p>
              <p className="text-[11px] text-slate-400">{appointment.departmentName} Department</p>
            </div>
          </div>
        </div>

        {/* Date, Time & Location */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Consultation Schedule
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold uppercase">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Date
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">{appointment.date}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold uppercase">
                <Clock className="w-3.5 h-3.5 text-emerald-700" /> Time
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">{appointment.time}</p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-600 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">Medicare Main Hospital Campus</p>
              <p className="text-slate-400 text-[11px]">Building 4, OPD Consultation wing, Room 218</p>
            </div>
          </div>
        </div>

        {/* Reason for Visit & Notes */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Reason for Visit
          </h4>
          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed">
            {appointment.reason}
          </p>
          {appointment.notes && (
            <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <p className="font-bold flex items-center gap-1 mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Doctor's Clinical Note:
              </p>
              {appointment.notes}
            </div>
          )}
        </div>

        {/* Connected Prescriptions or Reports shortcut */}
        {appointment.status === 'Completed' && (
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="text-xs font-bold text-emerald-900">Consultation Completed</h4>
            <p className="text-xs text-emerald-800">
              The doctor has issued medical records for this appointment.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <CustomButton
                size="sm"
                variant="primary"
                onClick={() => navigate('Prescriptions')}
              >
                View Prescription
              </CustomButton>
              <CustomButton
                size="sm"
                variant="outline"
                onClick={() => navigate('MedicalReports')}
              >
                View Reports
              </CustomButton>
            </div>
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 flex items-center gap-3 z-30">
        <CustomButton
          id="back-to-appointments-btn"
          fullWidth
          variant="outline"
          onClick={goBack}
        >
          Back to List
        </CustomButton>
      </div>
    </div>
  );
};
