import React from 'react';
import { Calendar, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { Appointment } from '../types';
import { StatusBadge } from './StatusBadge';
import { CustomButton } from './CustomButton';

interface AppointmentCardProps {
  appointment: Appointment;
  onSelect?: (appointment: Appointment) => void;
  onApprove?: (appointment: Appointment) => void;
  onReject?: (appointment: Appointment) => void;
  onCancel?: (appointment: Appointment) => void;
  role?: 'patient' | 'doctor' | 'admin';
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onSelect,
  onApprove,
  onReject,
  onCancel,
  role = 'patient',
}) => {
  const isDoctor = role === 'doctor';
  const isAdmin = role === 'admin';

  return (
    <div
      id={`appointment-card-${appointment.id}`}
      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect && onSelect(appointment)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {appointment.doctorImage && !isDoctor ? (
            <img
              src={appointment.doctorImage}
              alt={appointment.doctorName}
              className="w-12 h-12 rounded-xl object-cover border border-emerald-100 shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base border border-emerald-100 shrink-0">
              {isDoctor ? appointment.patientName.charAt(0) : appointment.doctorName.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {isDoctor ? appointment.patientName : appointment.doctorName}
            </h3>
            <p className="text-xs font-medium text-slate-600 truncate">
              {isDoctor ? `Patient • ${appointment.departmentName}` : appointment.doctorSpecialization}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ref: {appointment.id}
            </p>
          </div>
        </div>

        <StatusBadge status={appointment.status} size="sm" />
      </div>

      <div className="mt-3.5 bg-slate-50 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span>{appointment.time}</span>
        </div>
      </div>

      <p className="text-xs text-slate-600 mt-2.5 line-clamp-1">
        <span className="font-semibold text-slate-700">Reason: </span>
        {appointment.reason}
      </p>

      {/* Action buttons based on status & role */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          id={`view-details-${appointment.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect && onSelect(appointment);
          }}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer py-1"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {isDoctor && appointment.status === 'Pending' && (
          <div className="flex items-center gap-2">
            <CustomButton
              id={`reject-btn-${appointment.id}`}
              size="sm"
              variant="outline"
              className="text-rose-600 border-rose-200 hover:bg-rose-50"
              onClick={(e) => {
                e.stopPropagation();
                onReject && onReject(appointment);
              }}
            >
              Reject
            </CustomButton>
            <CustomButton
              id={`approve-btn-${appointment.id}`}
              size="sm"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onApprove && onApprove(appointment);
              }}
            >
              Approve
            </CustomButton>
          </div>
        )}

        {role === 'patient' && (appointment.status === 'Pending' || appointment.status === 'Approved') && (
          <CustomButton
            id={`cancel-btn-${appointment.id}`}
            size="sm"
            variant="ghost"
            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 text-xs py-1"
            onClick={(e) => {
              e.stopPropagation();
              onCancel && onCancel(appointment);
            }}
          >
            Cancel
          </CustomButton>
        )}
      </div>
    </div>
  );
};
