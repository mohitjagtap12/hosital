import React, { useState } from 'react';
import { User, Mail, Phone, Lock, UserPlus } from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { UserRole } from '../../types';

export const RegistrationScreen: React.FC = () => {
  const { navigate, login } = useAppNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
  };

  return (
    <div id="registration-screen" className="min-h-[640px] flex flex-col justify-between bg-white">
      <Header title="Create Account" showBack />

      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div className="text-left space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Join Medicare</h2>
          <p className="text-xs text-slate-500">
            Create an account to book consultations and store medical records.
          </p>
        </div>

        {/* Account Role Selector */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Registering As
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['patient', 'doctor', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                id={`register-role-${r}`}
                onClick={() => setRole(r)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize cursor-pointer transition-all ${
                  role === r
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5 pt-2">
          <CustomInput
            id="register-name-input"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <CustomInput
            id="register-email-input"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <CustomInput
            id="register-phone-input"
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 019-2834"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4" />}
            required
          />

          <CustomInput
            id="register-password-input"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="pt-2">
            <CustomButton
              id="register-submit-btn"
              type="submit"
              fullWidth
              size="lg"
              variant="primary"
              icon={<UserPlus className="w-4 h-4" />}
            >
              Complete Registration
            </CustomButton>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('Login')}
            className="font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
