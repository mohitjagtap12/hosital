import React from 'react';
import { Star, Clock, MapPin, Calendar } from 'lucide-react';
import { Doctor } from '../types';
import { CustomButton } from './CustomButton';

interface DoctorCardProps {
  doctor: Doctor;
  onBook?: (doctor: Doctor) => void;
  onSelect?: (doctor: Doctor) => void;
  compact?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBook,
  onSelect,
  compact = false,
}) => {
  return (
    <div
      id={`doctor-card-${doctor.id}`}
      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
      onClick={() => onSelect && onSelect(doctor)}
    >
      <div className="flex items-start gap-3.5">
        <div className="relative shrink-0">
          <img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
            ★ {doctor.rating}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 rounded-full border border-emerald-100">
              {doctor.departmentName}
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              ${doctor.consultationFee}
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mt-1 truncate">
            {doctor.name}
          </h3>

          <p className="text-xs font-medium text-slate-600 truncate">
            {doctor.specialization}
          </p>

          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            {doctor.qualification} • {doctor.experience}
          </p>
        </div>
      </div>

      {!compact && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              {doctor.availableDays.join(', ')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {doctor.availableSlots[0]}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <CustomButton
              id={`book-btn-${doctor.id}`}
              size="sm"
              fullWidth
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onBook ? onBook(doctor) : onSelect?.(doctor);
              }}
            >
              Book Appointment
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};
