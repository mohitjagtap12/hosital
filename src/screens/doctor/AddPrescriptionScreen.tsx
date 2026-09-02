import React, { useState } from 'react';
import { Pill, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { MedicineItem } from '../../types';

export const AddPrescriptionScreen: React.FC = () => {
  const { goBack, selectedAppointment } = useAppNavigation();

  const [patientName, setPatientName] = useState(selectedAppointment?.patientName || 'Alex Johnson');
  const [diagnosis, setDiagnosis] = useState('Mild Hypertension & Routine Follow-up');
  const [advice, setAdvice] = useState('Take medicine after food. Drink plenty of water and reduce sodium intake.');
  const [medicines, setMedicines] = useState<MedicineItem[]>([
    {
      name: 'Paracetamol',
      dosage: '500 mg',
      frequency: '2 times/day',
      duration: '3 days',
      instructions: 'Take medicine after food.',
    },
  ]);
  const [saved, setSaved] = useState(false);

  const addMedicineRow = () => {
    setMedicines((prev) => [
      ...prev,
      {
        name: '',
        dosage: '',
        frequency: 'Once daily',
        duration: '5 days',
        instructions: 'Take with water.',
      },
    ]);
  };

  const removeMedicineRow = (index: number) => {
    if (medicines.length > 1) {
      setMedicines((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateMedicine = (index: number, field: keyof MedicineItem, value: string) => {
    setMedicines((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSavePrescription = () => {
    setSaved(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div id="add-prescription-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-24 text-left">
      <Header title="Create Prescription" showBack />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Patient & Diagnosis Information */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Clinical Diagnosis
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute Bronchitis, Hypertension"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* Medicines list builder */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Prescribed Medicines ({medicines.length})
            </span>
            <button
              type="button"
              onClick={addMedicineRow}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100"
            >
              <Plus className="w-3.5 h-3.5" /> Add Drug
            </button>
          </div>

          {medicines.map((med, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs space-y-2.5 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Drug #{idx + 1}
                </span>
                {medicines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMedicineRow(idx)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-slate-500 text-[10px] block mb-0.5">Medicine Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Paracetamol"
                    value={med.name}
                    onChange={(e) => updateMedicine(idx, 'name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] block mb-0.5">Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 mg"
                    value={med.dosage}
                    onChange={(e) => updateMedicine(idx, 'dosage', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] block mb-0.5">Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 times/day"
                    value={med.frequency}
                    onChange={(e) => updateMedicine(idx, 'frequency', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] block mb-0.5">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 days"
                    value={med.duration}
                    onChange={(e) => updateMedicine(idx, 'duration', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-[10px] block mb-0.5">Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Take medicine after food."
                  value={med.instructions}
                  onChange={(e) => updateMedicine(idx, 'instructions', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Clinical Advice */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Doctor's Advice & Lifestyle Guidance
          </label>
          <textarea
            rows={3}
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs resize-none text-slate-800"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 z-30">
        <CustomButton
          id="issue-prescription-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<CheckCircle2 className="w-4 h-4" />}
          onClick={handleSavePrescription}
        >
          {saved ? 'Prescription Issued & Stored!' : 'Save & Issue Prescription'}
        </CustomButton>
      </div>
    </div>
  );
};
