import React from 'react';
import { AppointmentStatus } from '../types';

interface StatusBadgeProps {
  status: AppointmentStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let bg = 'bg-slate-100';
  let text = 'text-slate-700';
  let dot = 'bg-slate-500';

  if (normalized === 'pending') {
    bg = 'bg-amber-50 border border-amber-200';
    text = 'text-amber-800';
    dot = 'bg-amber-500';
  } else if (normalized === 'approved') {
    bg = 'bg-emerald-50 border border-emerald-200';
    text = 'text-emerald-800';
    dot = 'bg-emerald-500';
  } else if (normalized === 'completed') {
    bg = 'bg-blue-50 border border-blue-200';
    text = 'text-blue-800';
    dot = 'bg-blue-500';
  } else if (normalized === 'cancelled') {
    bg = 'bg-slate-100 border border-slate-300';
    text = 'text-slate-700';
    dot = 'bg-slate-400';
  } else if (normalized === 'rejected') {
    bg = 'bg-rose-50 border border-rose-200';
    text = 'text-rose-800';
    dot = 'bg-rose-500';
  }

  const padding = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs';

  return (
    <span
      id={`status-badge-${status.toLowerCase()}`}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${bg} ${text} ${padding} shadow-xs select-none`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
};
