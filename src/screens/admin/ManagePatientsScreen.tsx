import React, { useState } from 'react';
import { Users, Search, ChevronRight, Phone, Mail } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';

export const ManagePatientsScreen: React.FC = () => {
  const [patients] = useState([
    { id: 'pat-1', name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '+1 (555) 019-2834', age: 32, blood: 'O+', visits: 4 },
    { id: 'pat-2', name: 'Maria Rodriguez', email: 'maria.r@example.com', phone: '+1 (555) 345-9871', age: 45, blood: 'A+', visits: 2 },
    { id: 'pat-3', name: 'David Kim', email: 'david.k@example.com', phone: '+1 (555) 782-3490', age: 28, blood: 'B+', visits: 1 },
    { id: 'pat-4', name: 'Emma Thompson', email: 'emma.t@example.com', phone: '+1 (555) 234-7711', age: 54, blood: 'AB-', visits: 6 },
  ]);

  const [search, setSearch] = useState('');

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="manage-patients-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="Manage Patients" showBack />

      <div className="p-4 bg-white border-b border-slate-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <span className="text-xs text-slate-500 font-medium">{filtered.length} Registered Patients</span>

        <div className="space-y-2.5">
          {filtered.map((pat) => (
            <div
              key={pat.id}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs">
                    {pat.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{pat.name}</h4>
                    <p className="text-[11px] text-slate-400">{pat.email}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full">
                  {pat.visits} Visits
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[9px]">Age</span>
                  <span className="font-semibold">{pat.age} yrs</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Blood Group</span>
                  <span className="font-semibold text-rose-600">{pat.blood}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Contact</span>
                  <span className="font-semibold truncate block">{pat.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
