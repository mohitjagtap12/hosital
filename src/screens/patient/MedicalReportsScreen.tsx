import React from 'react';
import { FileText, Upload } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { MedicalReportCard } from '../../components/MedicalReportCard';
import { EmptyState } from '../../components/EmptyState';
import { INITIAL_REPORTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const MedicalReportsScreen: React.FC = () => {
  const { navigate, setSelectedReport } = useAppNavigation();

  return (
    <div id="medical-reports-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="Medical Reports" showBack />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="p-3.5 bg-blue-900 text-white rounded-2xl shadow-xs">
          <h3 className="text-xs font-bold">Diagnostic & Laboratory Files</h3>
          <p className="text-[11px] text-blue-100 mt-0.5">
            ECG charts, pathology results, radiological scans, and discharge summaries.
          </p>
        </div>

        {INITIAL_REPORTS.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No Medical Reports"
            description="Diagnostic test results uploaded by your physician or lab will appear here."
          />
        ) : (
          INITIAL_REPORTS.map((report) => (
            <MedicalReportCard
              key={report.id}
              report={report}
              onSelect={(r) => {
                setSelectedReport(r);
                navigate('MedicalReportDetails', { report: r });
              }}
              onDownload={() => alert(`Downloading ${report.reportName}`)}
            />
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
