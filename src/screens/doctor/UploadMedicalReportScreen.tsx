import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, CloudUpload } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const UploadMedicalReportScreen: React.FC = () => {
  const { goBack, selectedAppointment } = useAppNavigation();

  const [patientName, setPatientName] = useState(selectedAppointment?.patientName || 'Alex Johnson');
  const [reportName, setReportName] = useState('Laboratory Blood Chemistry Panel');
  const [reportType, setReportType] = useState('Pathology / Hematology');
  const [description, setDescription] = useState('Complete metabolic count, lipid values within reference ranges.');
  const [fileName, setFileName] = useState<string | null>('lipid_panel_results.pdf');
  const [uploaded, setUploaded] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSaveReport = () => {
    setUploaded(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div id="upload-medical-report-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-24 text-left">
      <Header title="Upload Medical Report" showBack />

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
              Report Title
            </label>
            <input
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Category / Type
            </label>
            <input
              type="text"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Diagnostic Summary & Findings
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs resize-none text-slate-800"
            />
          </div>
        </div>

        {/* Upload File Zone */}
        <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center text-center relative hover:bg-emerald-50/20 transition-colors">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
            <CloudUpload className="w-6 h-6" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">
            {fileName ? fileName : 'Upload PDF, JPG, or DICOM Scans'}
          </h4>
          <p className="text-[11px] text-slate-400 mt-1">
            Drag and drop or tap to browse from device. Max file size: 25MB.
          </p>
          <span className="mt-3 px-3 py-1 bg-emerald-700 text-white text-[11px] font-semibold rounded-lg">
            Choose File
          </span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 z-30">
        <CustomButton
          id="upload-report-submit-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<CheckCircle2 className="w-4 h-4" />}
          onClick={handleSaveReport}
        >
          {uploaded ? 'Report Uploaded to Cloud!' : 'Upload & Save to Patient File'}
        </CustomButton>
      </div>
    </div>
  );
};
