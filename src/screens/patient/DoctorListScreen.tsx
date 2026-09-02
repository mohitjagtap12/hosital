import React, { useState } from 'react';
import { Search, Filter, Stethoscope } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { DoctorCard } from '../../components/DoctorCard';
import { EmptyState } from '../../components/EmptyState';
import { DOCTORS, DEPARTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const DoctorListScreen: React.FC = () => {
  const { navigate, setSelectedDoctor, selectedDepartment } = useAppNavigation();
  const [selectedDeptId, setSelectedDeptId] = useState<string>(selectedDepartment?.id || 'all');
  const [search, setSearch] = useState('');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = selectedDeptId === 'all' || doc.departmentId === selectedDeptId;
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div id="doctor-list-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16">
      <Header title="Find Specialists" showBack />

      {/* Filter and Search */}
      <div className="p-4 bg-white border-b border-slate-100 space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by doctor name or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        {/* Department filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-left">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedDeptId === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Departments
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedDeptId === dept.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3 flex-1 text-left">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredDoctors.length} available doctors</span>
          <span className="font-medium text-emerald-700">Verified Specialists</span>
        </div>

        {filteredDoctors.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title="No Doctors Found"
            description="We could not find any doctors matching your search filters. Try selecting a different department."
            actionText="Reset Filters"
            onAction={() => {
              setSelectedDeptId('all');
              setSearch('');
            }}
          />
        ) : (
          filteredDoctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onSelect={(doctor) => {
                setSelectedDoctor(doctor);
                navigate('DoctorDetails', { doctor });
              }}
              onBook={(doctor) => {
                setSelectedDoctor(doctor);
                navigate('AppointmentBooking', { doctor });
              }}
            />
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
