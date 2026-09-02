import React from 'react';
import { User, Phone, Calendar, Clock, FileText, Pill, Upload, Stethoscope, ArrowRight } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';

export const PatientDetailsScreen: React.FC = () => {
  const { navigate, selectedAppointment, goBack } = useAppNavigation();
  const appointment = selectedAppointment || INITIAL_APPOINTMENTS[0];

  return (
    <div id="doctor-patient-details-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-20 text-left">
      <Header title="Patient Consultation File" showBack />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Patient Profile Card */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Encounter ID: {appointment.id}</span>
            <StatusBadge status={appointment.status} size="sm" />
          </div>

          <div className="flex items-center gap-3.5 pt-1">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg border border-emerald-200">
              {appointment.patientName.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{appointment.patientName}</h3>
              <p className="text-xs text-slate-500">ID: MED-PAT-102 • Age 32 • Male</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold">
                Blood Group: O+ (Positive)
              </span>
            </div>
          </div>
        </div>

        {/* Appointment details */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Visit Parameters
          </h4>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-slate-400 text-[10px] block">Scheduled Date</span>
              <p className="font-bold text-slate-800 mt-0.5">{appointment.date}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-slate-400 text-[10px] block">Slot Time</span>
              <p className="font-bold text-slate-800 mt-0.5">{appointment.time}</p>
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[11px] block">Chief Complaint</span>
            <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl mt-1 font-medium leading-relaxed">
              {appointment.reason}
            </p>
          </div>
        </div>

        {/* Quick Clinical Actions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Clinical Tools
          </h4>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => navigate('AddPrescription', { appointment })}
              className="p-3 bg-white rounded-2xl border border-slate-100 flex items-center gap-2.5 text-left cursor-pointer hover:border-emerald-200"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Add Rx</h5>
                <p className="text-[10px] text-slate-400">Prescription</p>
              </div>
            </button>

            <button
              onClick={() => navigate('UploadMedicalReport', { appointment })}
              className="p-3 bg-white rounded-2xl border border-slate-100 flex items-center gap-2.5 text-left cursor-pointer hover:border-blue-200"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Upload Lab</h5>
                <p className="text-[10px] text-slate-400">Reports/Scans</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 flex items-center gap-3 z-30">
        <CustomButton
          id="start-consultation-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<Stethoscope className="w-4 h-4" />}
          onClick={() => navigate('Consultation', { appointment })}
        >
          Start Consultation
        </CustomButton>
      </div>
    </div>
  );
};
