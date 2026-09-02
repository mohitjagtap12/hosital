import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Stethoscope, Search } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { CustomButton } from '../../components/CustomButton';
import { DOCTORS } from '../../constants/mockData';
import { Doctor } from '../../types';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const ManageDoctorsScreen: React.FC = () => {
  const { navigate, setSelectedDoctor } = useAppNavigation();
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(DOCTORS);
  const [search, setSearch] = useState('');

  const handleDeleteDoctor = (id: string) => {
    setDoctorsList((prev) => prev.filter((d) => d.id !== id));
  };

  const filtered = doctorsList.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.departmentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="manage-doctors-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header
        title="Manage Doctors"
        showBack
        rightAction={
          <button
            onClick={() => navigate('AddDoctor')}
            className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl"
            title="Add Doctor"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <div className="p-4 bg-white border-b border-slate-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{filtered.length} Medical Practitioners</span>
          <button
            onClick={() => navigate('AddDoctor')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Doctor
          </button>
        </div>

        <div className="space-y-2.5">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={doc.profileImage}
                  alt={doc.name}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                  <p className="text-[11px] text-emerald-700 truncate">{doc.specialization}</p>
                  <p className="text-[10px] text-slate-400 truncate">{doc.departmentName} • ${doc.consultationFee}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    setSelectedDoctor(doc);
                    navigate('DoctorDetails', { doctor: doc });
                  }}
                  className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg cursor-pointer"
                  title="View"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteDoctor(doc.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
