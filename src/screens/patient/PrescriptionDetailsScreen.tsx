import React from 'react';
import { Pill, Calendar, User, Stethoscope, Clock, AlertCircle, Download, Printer } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { INITIAL_PRESCRIPTIONS } from '../../constants/mockData';

export const PrescriptionDetailsScreen: React.FC = () => {
  const { selectedPrescription, goBack } = useAppNavigation();
  const prescription = selectedPrescription || INITIAL_PRESCRIPTIONS[0];

  return (
    <div id="prescription-details-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-20 text-left">
      <Header
        title="Prescription Details"
        showBack
        rightAction={
          <button
            onClick={() => alert('Prescription PDF download initiated.')}
            className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </button>
        }
      />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Prescription Header / Doctor info */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Prescription ID</span>
              <p className="text-xs font-mono font-bold text-slate-800">{prescription.id}</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
              Verified Rx
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div>
              <span className="text-slate-400 text-[11px] block">Doctor</span>
              <p className="font-bold text-slate-900 mt-0.5">{prescription.doctorName}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Patient</span>
              <p className="font-bold text-slate-900 mt-0.5">{prescription.patientName}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Date Issued</span>
              <p className="font-medium text-slate-700 mt-0.5">{prescription.date}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Appointment Ref</span>
              <p className="font-mono text-slate-700 mt-0.5">{prescription.appointmentId}</p>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Clinical Diagnosis
          </h4>
          <p className="text-sm font-bold text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
            {prescription.diagnosis}
          </p>
        </div>

        {/* Medicines List */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Prescribed Medications ({prescription.medicines.length})
          </h4>

          <div className="space-y-3">
            {prescription.medicines.map((med, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{med.name}</h5>
                      <span className="text-xs font-semibold text-emerald-700">{med.dosage}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-200/70 text-slate-700 text-[11px] font-medium rounded-md">
                    {med.duration}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-200/50">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Frequency</span>
                    <p className="font-medium text-slate-800">{med.frequency}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Instructions</span>
                    <p className="font-medium text-slate-800">{med.instructions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor's Additional Advice */}
        {prescription.advice && (
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/70 space-y-1.5">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Additional Clinical Advice
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              {prescription.advice}
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 flex items-center gap-3 z-30">
        <CustomButton
          id="back-prescriptions-btn"
          fullWidth
          variant="outline"
          onClick={goBack}
        >
          Back to Prescriptions
        </CustomButton>
      </div>
    </div>
  );
};
