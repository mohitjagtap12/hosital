import React from 'react';
import { Activity, ChevronRight, Users } from 'lucide-react';
import { Header } from '../../components/Header';
import { DEPARTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const DepartmentListScreen: React.FC = () => {
  const { navigate, setSelectedDepartment } = useAppNavigation();

  return (
    <div id="department-list-screen" className="flex flex-col min-h-screen bg-slate-50/50">
      <Header title="Hospital Departments" showBack />

      <div className="p-4 space-y-3 flex-1 text-left">
        <div className="p-4 rounded-2xl bg-emerald-800 text-white shadow-xs mb-2">
          <h2 className="text-sm font-bold">Centers of Clinical Excellence</h2>
          <p className="text-xs text-emerald-100/90 mt-1">
            Choose a department to view certified medical faculty and available appointments.
          </p>
        </div>

        <div className="space-y-2.5">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              id={`department-card-${dept.id}`}
              onClick={() => {
                setSelectedDepartment(dept);
                navigate('DoctorList', { department: dept });
              }}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xs hover:border-emerald-200 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{dept.description}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    <span>{dept.doctorCount} Doctors available</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
