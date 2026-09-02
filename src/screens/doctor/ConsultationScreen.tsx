import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, Pill, FileText, Plus, ArrowRight } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { INITIAL_APPOINTMENTS } from '../../constants/mockData';

export const ConsultationScreen: React.FC = () => {
  const { navigate, selectedAppointment } = useAppNavigation();
  const appointment = selectedAppointment || INITIAL_APPOINTMENTS[0];

  const [symptoms, setSymptoms] = useState('Patient reports intermittent palpitations, mild exertion fatigue.');
  const [vitals, setVitals] = useState({ bp: '128/84 mmHg', pulse: '74 bpm', temp: '98.6 °F', spo2: '99%' });
  const [diagnosis, setDiagnosis] = useState('Mild Sinus Tachycardia & Fatigue');
  const [clinicalNotes, setClinicalNotes] = useState('Advised hydration, 8 hours sleep, and 2-week ECG follow-up.');
  const [completed, setCompleted] = useState(false);

  const handleCompleteConsultation = () => {
    setCompleted(true);
    setTimeout(() => {
      navigate('DoctorDashboard');
    }, 1500);
  };

  return (
    <div id="consultation-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-20 text-left">
      <Header title="Live Consultation" showBack />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Patient header */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Consultation For</span>
            <h3 className="text-sm font-bold text-slate-900">{appointment.patientName}</h3>
            <p className="text-xs text-slate-500">Scheduled: {appointment.time} ({appointment.date})</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse">
            In Session
          </span>
        </div>

        {/* Vital Signs Input */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Recorded Vitals
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-slate-400 text-[10px] block mb-0.5">Blood Pressure</label>
              <input
                type="text"
                value={vitals.bp}
                onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="text-slate-400 text-[10px] block mb-0.5">Heart Rate</label>
              <input
                type="text"
                value={vitals.pulse}
                onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="text-slate-400 text-[10px] block mb-0.5">Temperature</label>
              <input
                type="text"
                value={vitals.temp}
                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="text-slate-400 text-[10px] block mb-0.5">Oxygen Saturation</label>
              <input
                type="text"
                value={vitals.spo2}
                onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Symptoms & Diagnosis */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Observations & Symptoms
            </label>
            <textarea
              rows={2}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs resize-none text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Final Clinical Diagnosis
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Clinical Advice / Notes
            </label>
            <textarea
              rows={2}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs resize-none text-slate-800"
            />
          </div>
        </div>

        {/* Shortcut to attach prescription or report */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-medium text-emerald-900">Need to issue medication?</span>
          </div>
          <button
            onClick={() => navigate('AddPrescription', { appointment })}
            className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
          >
            Create Rx +
          </button>
        </div>
      </div>

      {/* Complete Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 z-30">
        <CustomButton
          id="complete-consultation-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<CheckCircle2 className="w-4 h-4" />}
          onClick={handleCompleteConsultation}
        >
          {completed ? 'Consultation Finalized!' : 'Complete Consultation'}
        </CustomButton>
      </div>
    </div>
  );
};
