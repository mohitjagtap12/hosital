import React, { useState } from 'react';
import { UserPlus, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { DEPARTMENTS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const AddDoctorScreen: React.FC = () => {
  const { goBack } = useAppNavigation();

  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('8 years exp.');
  const [departmentId, setDepartmentId] = useState(DEPARTMENTS[0].id);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fee, setFee] = useState('60');
  const [created, setCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div id="add-doctor-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-24 text-left">
      <Header title="Add New Doctor" showBack />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
          <CustomInput
            label="Doctor Full Name"
            placeholder="Dr. Emily Watson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <CustomInput
            label="Specialization"
            placeholder="Interventional Cardiologist"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1">
              Department
            </label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <CustomInput
            label="Qualifications / Degrees"
            placeholder="MD, MBBS, Harvard Medical"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <CustomInput
              label="Experience"
              placeholder="10 years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <CustomInput
              label="Consultation Fee ($)"
              type="number"
              placeholder="75"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </div>

          <CustomInput
            label="Email Address"
            type="email"
            placeholder="emily.watson@medicare.health"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <CustomInput
            label="Direct Phone"
            type="tel"
            placeholder="+1 (555) 432-8765"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 z-30">
        <CustomButton
          id="create-doctor-submit-btn"
          fullWidth
          size="lg"
          variant="primary"
          icon={<CheckCircle2 className="w-4 h-4" />}
          onClick={handleSubmit}
        >
          {created ? 'Doctor Faculty Enrolled!' : 'Save Doctor Profile'}
        </CustomButton>
      </div>
    </div>
  );
};
