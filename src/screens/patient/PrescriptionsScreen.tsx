import React from 'react';
import { Pill } from 'lucide-react';
import { Header } from '../../components/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { PrescriptionCard } from '../../components/PrescriptionCard';
import { EmptyState } from '../../components/EmptyState';
import { INITIAL_PRESCRIPTIONS } from '../../constants/mockData';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const PrescriptionsScreen: React.FC = () => {
  const { navigate, setSelectedPrescription } = useAppNavigation();

  return (
    <div id="prescriptions-screen" className="flex flex-col min-h-screen bg-slate-50/50 pb-16 text-left">
      <Header title="My Prescriptions" showBack />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div className="p-3.5 bg-emerald-800 text-white rounded-2xl shadow-xs">
          <h3 className="text-xs font-bold">Digital Medication Log</h3>
          <p className="text-[11px] text-emerald-100 mt-0.5">
            Verified doctor prescriptions with dosages, scheduling, and dietary guidelines.
          </p>
        </div>

        {INITIAL_PRESCRIPTIONS.length === 0 ? (
          <EmptyState
            icon={Pill}
            title="No Prescriptions"
            description="Your doctor has not issued any electronic prescriptions yet."
          />
        ) : (
          INITIAL_PRESCRIPTIONS.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
              onSelect={(p) => {
                setSelectedPrescription(p);
                navigate('PrescriptionDetails', { prescription: p });
              }}
            />
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
