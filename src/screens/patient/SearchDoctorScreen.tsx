import React, { useState } from 'react';
import { Search, X, Stethoscope, ChevronRight } from 'lucide-react';
import { Header } from '../../components/Header';
import { DOCTORS, DEPARTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const SearchDoctorScreen: React.FC = () => {
  const { navigate, setSelectedDoctor, setSelectedDepartment } = useAppNavigation();
  const [query, setQuery] = useState('');

  const filteredDoctors = DOCTORS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialization.toLowerCase().includes(query.toLowerCase()) ||
      d.departmentName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDepartments = DEPARTMENTS.filter((dep) =>
    dep.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div id="search-doctor-screen" className="flex flex-col min-h-screen bg-slate-50/50">
      <Header title="Search" showBack />

      <div className="p-4 bg-white border-b border-slate-100">
        <div className="relative">
          <input
            autoFocus
            type="text"
            placeholder="Search doctors, treatments, departments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pl-11 pr-10 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 text-left">
        {/* Popular searches / Tags */}
        {!query && (
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Cardiologist', 'Skin Allergy', 'Dental Surgeon', 'Pediatrics', 'Knee Pain', 'ECG Test'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 hover:border-emerald-300 cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <>
            {filteredDoctors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Doctors ({filteredDoctors.length})
                </span>
                <div className="space-y-2">
                  {filteredDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctor(doc);
                        navigate('DoctorDetails', { doctor: doc });
                      }}
                      className="p-3 bg-white rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer hover:border-emerald-200"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.profileImage}
                          alt={doc.name}
                          className="w-10 h-10 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                          <p className="text-[11px] text-emerald-700">{doc.specialization}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredDepartments.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Departments ({filteredDepartments.length})
                </span>
                <div className="space-y-2">
                  {filteredDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => {
                        setSelectedDepartment(dept);
                        navigate('DoctorList', { department: dept });
                      }}
                      className="p-3 bg-white rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer hover:border-emerald-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                          <Stethoscope className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{dept.name}</h4>
                          <p className="text-[11px] text-slate-400">{dept.doctorCount} Doctors available</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
