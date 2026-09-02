import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { UserRole } from '../../types';

export const LoginScreen: React.FC = () => {
  const { navigate, login, userRole } = useAppNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>(userRole || 'patient');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setError('');
    login(activeRole);
  };

  const handleQuickDemo = (role: UserRole) => {
    if (role === 'patient') setEmail('patient@medicare.com');
    if (role === 'doctor') setEmail('doctor.sarah@medicare.com');
    if (role === 'admin') setEmail('admin@medicare.com');
    setPassword('password123');
    setActiveRole(role);
  };

  return (
    <div id="login-screen" className="min-h-[640px] flex flex-col justify-between bg-white">
      <Header title="Sign In" showBack />

      <div className="p-6 space-y-5 flex-1">
        <div className="text-left space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500">
            Sign in to access your Medicare hospital portal.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center">
          {(['patient', 'doctor', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              id={`login-role-tab-${r}`}
              type="button"
              onClick={() => setActiveRole(r)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                activeRole === r
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Quick autofill pills */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="shrink-0 font-medium">Quick fill:</span>
          <button
            type="button"
            onClick={() => handleQuickDemo('patient')}
            className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 hover:bg-emerald-100"
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('doctor')}
            className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100 hover:bg-blue-100"
          >
            Doctor
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('admin')}
            className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md border border-purple-100 hover:bg-purple-100"
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <CustomInput
            id="login-email-input"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <CustomInput
            id="login-password-input"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" defaultChecked />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              id="login-forgot-password-link"
              onClick={() => navigate('ForgotPassword')}
              className="font-medium text-emerald-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 text-left">
              {error}
            </div>
          )}

          <CustomButton
            id="login-submit-btn"
            type="submit"
            fullWidth
            size="lg"
            variant="primary"
            icon={<LogIn className="w-4 h-4" />}
          >
            Sign In as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
          </CustomButton>
        </form>
      </div>

      <div className="p-6 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            id="login-register-link"
            type="button"
            onClick={() => navigate('Registration')}
            className="font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
};
