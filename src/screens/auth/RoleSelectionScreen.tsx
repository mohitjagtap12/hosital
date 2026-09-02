import React, { useState } from 'react';
import { User, Stethoscope, Shield, ArrowRight, Check } from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { UserRole } from '../../types';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';

export const RoleSelectionScreen: React.FC = () => {
  const { navigate, setRole, login } = useAppNavigation();
  const [selected, setSelected] = useState<UserRole>('patient');

  const roles: {
    id: UserRole;
    title: string;
    subtitle: string;
    icon: any;
    color: string;
  }[] = [
    {
      id: 'patient',
      title: 'Patient',
      subtitle: 'Book appointments, view prescriptions & access medical reports',
      icon: User,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'doctor',
      title: 'Doctor',
      subtitle: "Manage daily schedules, write prescriptions & patient consultations",
      icon: Stethoscope,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'admin',
      title: 'Hospital Admin',
      subtitle: 'Manage doctors, departments, patients & overall hospital metrics',
      icon: Shield,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  const handleContinue = () => {
    setRole(selected);
    navigate('Login', { role: selected });
  };

  const handleDirectDemo = (role: UserRole) => {
    login(role);
  };

  return (
    <div id="role-selection-screen" className="min-h-[640px] flex flex-col justify-between bg-slate-50/50">
      <Header title="Select Your Role" showBack />

      <div className="p-6 space-y-4 flex-1">
        <div className="text-left space-y-1 mb-2">
          <h2 className="text-xl font-bold text-slate-900">Who is using Medicare?</h2>
          <p className="text-xs text-slate-500">
            Choose your account role to experience tailored hospital management workflows.
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selected === role.id;
            return (
              <div
                key={role.id}
                id={`role-option-${role.id}`}
                onClick={() => setSelected(role.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  isSelected
                    ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${role.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{role.title}</h3>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {role.subtitle}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Preview role:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDirectDemo(role.id);
                        }}
                        className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                      >
                        Enter as {role.title} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100 space-y-3">
        <CustomButton
          id="role-continue-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={handleContinue}
        >
          Continue to Login
        </CustomButton>
      </div>
    </div>
  );
};
