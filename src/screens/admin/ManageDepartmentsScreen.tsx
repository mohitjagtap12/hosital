import React, { useState } from 'react';
import { Building2, Plus, Users, Trash2, Edit3 } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { DEPARTMENTS } from '../../constants/mockData';
import { Department } from '../../types';

export const ManageDepartmentsScreen: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(DEPARTMENTS);
  const [showAdd, setShowAdd] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptDesc, setNewDeptDesc] = useState('');

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName) return;
    const newDept: Department = {
      id: `dept-${Date.now()}`,
      name: newDeptName,
      description: newDeptDesc || 'Hospital specialized clinical department',
      iconName: 'Activity',
      doctorCount: 1,
    };
    setDepartments([...departments, newDept]);
    setNewDeptName('');
    setNewDeptDesc('');
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <div id="manage-departments-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header
        title="Departments"
        showBack
        rightAction={
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl"
            title="Add Department"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {showAdd && (
          <form onSubmit={handleAddDepartment} className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-2.5 mb-2">
            <h4 className="text-xs font-bold text-emerald-900">Add Clinical Department</h4>
            <input
              type="text"
              placeholder="Department Name (e.g. Oncology, ENT)"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
              required
            />
            <input
              type="text"
              placeholder="Brief description..."
              value={newDeptDesc}
              onChange={(e) => setNewDeptDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
              >
                Add Unit
              </button>
            </div>
          </form>
        )}

        <span className="text-xs text-slate-500 font-medium">{departments.length} Operational Units</span>

        <div className="space-y-2.5">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-4 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{dept.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{dept.description}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold">{dept.doctorCount} Doctors</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
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
