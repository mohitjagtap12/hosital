import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const AddDiagnosisScreen: React.FC = () => {
  const { goBack } = useAppNavigation();
  const [patientName, setPatientName] = useState('Alex Johnson');
  const [icdCode, setIcdCode] = useState('I10 - Essential (primary) hypertension');
  const [description, setDescription] = useState('Elevated systolic readings following rigorous exercise.');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Mild');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div id="add-diagnosis-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-20 text-left">
      <Header title="Add Diagnosis" showBack />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
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
              Diagnosis / ICD Code
            </label>
            <input
              type="text"
              value={icdCode}
              onChange={(e) => setIcdCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Severity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Mild', 'Moderate', 'Severe'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSeverity(lvl)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    severity === lvl
                      ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Clinical Assessment Details
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs resize-none text-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 z-30">
        <CustomButton
          id="save-diagnosis-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<CheckCircle2 className="w-4 h-4" />}
          onClick={handleSave}
        >
          {saved ? 'Diagnosis Stored!' : 'Save Diagnosis'}
        </CustomButton>
      </div>
    </div>
  );
};
