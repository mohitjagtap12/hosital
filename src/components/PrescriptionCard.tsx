import React from 'react';
import { FileText, Pill, Calendar, ChevronRight } from 'lucide-react';
import { Prescription } from '../types';

interface PrescriptionCardProps {
  prescription: Prescription;
  onSelect?: (prescription: Prescription) => void;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  onSelect,
}) => {
  return (
    <div
      id={`prescription-card-${prescription.id}`}
      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect && onSelect(prescription)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {prescription.diagnosis}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              Prescribed by {prescription.doctorName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{prescription.date}</span>
        </div>
      </div>

      <div className="mt-3 bg-emerald-50/60 rounded-xl p-2.5 border border-emerald-100/50">
        <p className="text-xs font-semibold text-emerald-900 mb-1">
          {prescription.medicines.length} Medicines Prescribed:
        </p>
        <div className="space-y-0.5">
          {prescription.medicines.slice(0, 2).map((med, idx) => (
            <p key={idx} className="text-xs text-slate-700 truncate">
              • <span className="font-medium">{med.name}</span> ({med.dosage}) - {med.frequency}
            </p>
          ))}
          {prescription.medicines.length > 2 && (
            <p className="text-[11px] text-emerald-700 font-medium">
              +{prescription.medicines.length - 2} more medicines
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <span className="text-slate-500 text-[11px] truncate max-w-[220px]">
          Advice: {prescription.advice}
        </span>
        <span className="font-semibold text-emerald-700 flex items-center gap-0.5 shrink-0">
          View Rx <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
