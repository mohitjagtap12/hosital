import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';

export const ForgotPasswordScreen: React.FC = () => {
  const { navigate } = useAppNavigation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <div id="forgot-password-screen" className="min-h-[640px] flex flex-col justify-between bg-white">
      <Header title="Reset Password" showBack />

      <div className="p-6 space-y-5 flex-1">
        {sent ? (
          <div className="my-auto py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Recovery Email Sent</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We've dispatched password reset instructions to <span className="font-semibold text-slate-700">{email}</span>. Please check your inbox.
            </p>
            <div className="pt-4">
              <CustomButton
                variant="outline"
                size="md"
                onClick={() => navigate('Login')}
              >
                Return to Login
              </CustomButton>
            </div>
          </div>
        ) : (
          <>
            <div className="text-left space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Forgot Password?</h2>
              <p className="text-xs text-slate-500">
                Enter your registered Medicare email address to receive recovery instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <CustomInput
                id="forgot-email-input"
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <CustomButton
                id="send-reset-link-btn"
                type="submit"
                fullWidth
                size="lg"
                variant="primary"
              >
                Send Reset Link
              </CustomButton>
            </form>
          </>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={() => navigate('Login')}
          className="text-xs font-semibold text-slate-600 hover:text-emerald-700 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </button>
      </div>
    </div>
  );
};
