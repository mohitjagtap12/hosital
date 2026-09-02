import React from 'react';
import { FileText, Download, Calendar, ExternalLink } from 'lucide-react';
import { MedicalReport } from '../types';

interface MedicalReportCardProps {
  report: MedicalReport;
  onSelect?: (report: MedicalReport) => void;
  onDownload?: (report: MedicalReport) => void;
}

export const MedicalReportCard: React.FC<MedicalReportCardProps> = ({
  report,
  onSelect,
  onDownload,
}) => {
  return (
    <div
      id={`report-card-${report.id}`}
      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect && onSelect(report)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {report.reportName}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              Issued by {report.doctorName}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span>•</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">
                {report.fileType}
              </span>
              {report.fileSize && (
                <>
                  <span>•</span>
                  <span>{report.fileSize}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          id={`download-report-${report.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onDownload ? onDownload(report) : onSelect?.(report);
          }}
          className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
          title="Download Report"
          aria-label="Download Report"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
        {report.description}
      </p>

      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400">Patient: {report.patientName}</span>
        <span className="font-semibold text-emerald-700 flex items-center gap-1">
          Open Document <ExternalLink className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
