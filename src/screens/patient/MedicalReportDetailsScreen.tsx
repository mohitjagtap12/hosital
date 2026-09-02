import React from 'react';
import { FileText, Calendar, User, Stethoscope, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { INITIAL_REPORTS } from '../../constants/mockData';

export const MedicalReportDetailsScreen: React.FC = () => {
  const { selectedReport, goBack } = useAppNavigation();
  const report = selectedReport || INITIAL_REPORTS[0];

  return (
    <div id="medical-report-details-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-20 text-left">
      <Header
        title="Report Details"
        showBack
        rightAction={
          <button
            onClick={() => alert(`Downloading ${report.reportName}`)}
            className="p-2 text-blue-700 hover:bg-blue-50 rounded-xl"
            title="Download Report"
          >
            <Download className="w-5 h-5" />
          </button>
        }
      />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Report Overview Card */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                {report.fileType}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{report.reportName}</h3>
              <p className="text-xs text-slate-500">Issued by {report.doctorName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
            <div>
              <span className="text-slate-400 text-[10px] block">Patient Name</span>
              <p className="font-bold text-slate-900 mt-0.5">{report.patientName}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Document Size</span>
              <p className="font-bold text-slate-900 mt-0.5">{report.fileSize || '2.1 MB'}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Upload Date</span>
              <p className="font-medium text-slate-700 mt-0.5">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Security Status</span>
              <p className="font-medium text-emerald-700 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Encrypted
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Summary */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Clinical Notes & Findings
          </h4>
          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed">
            {report.description}
          </p>
        </div>

        {/* Document Preview Placeholder */}
        <div className="p-6 bg-slate-100 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-2">
          <FileText className="w-10 h-10 text-slate-400" />
          <h5 className="text-xs font-bold text-slate-700">Digital Document Preview</h5>
          <p className="text-[11px] text-slate-500 max-w-xs">
            Stored securely in Firebase Storage with authenticated access tokens.
          </p>
          <CustomButton
            size="sm"
            variant="outline"
            className="mt-2"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            onClick={() => alert('Opening preview viewer')}
          >
            Open in Document Viewer
          </CustomButton>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 flex items-center gap-3 z-30">
        <CustomButton
          id="back-reports-btn"
          fullWidth
          variant="outline"
          onClick={goBack}
        >
          Back to Reports
        </CustomButton>
      </div>
    </div>
  );
};
