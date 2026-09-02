import React from 'react';
import { NavigationProvider, useAppNavigation } from './navigation/NavigationContext';

// Auth Screens
import { SplashScreen } from './screens/auth/SplashScreen';
import { WelcomeScreen } from './screens/auth/WelcomeScreen';
import { RoleSelectionScreen } from './screens/auth/RoleSelectionScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegistrationScreen } from './screens/auth/RegistrationScreen';
import { ForgotPasswordScreen } from './screens/auth/ForgotPasswordScreen';

// Patient Screens
import { PatientDashboardScreen } from './screens/patient/PatientDashboardScreen';
import { DoctorListScreen } from './screens/patient/DoctorListScreen';
import { DoctorDetailsScreen } from './screens/patient/DoctorDetailsScreen';
import { SearchDoctorScreen } from './screens/patient/SearchDoctorScreen';
import { DepartmentListScreen } from './screens/patient/DepartmentListScreen';
import { AppointmentBookingScreen } from './screens/patient/AppointmentBookingScreen';
import { AppointmentConfirmationScreen } from './screens/patient/AppointmentConfirmationScreen';
import { MyAppointmentsScreen } from './screens/patient/MyAppointmentsScreen';
import { AppointmentDetailsScreen } from './screens/patient/AppointmentDetailsScreen';
import { PrescriptionsScreen } from './screens/patient/PrescriptionsScreen';
import { PrescriptionDetailsScreen } from './screens/patient/PrescriptionDetailsScreen';
import { MedicalReportsScreen } from './screens/patient/MedicalReportsScreen';
import { MedicalReportDetailsScreen } from './screens/patient/MedicalReportDetailsScreen';
import { PatientProfileScreen } from './screens/patient/PatientProfileScreen';
import { AppointmentHistoryScreen } from './screens/patient/AppointmentHistoryScreen';
import { NotificationsScreen } from './screens/patient/NotificationsScreen';

// Doctor Screens
import { DoctorDashboardScreen } from './screens/doctor/DoctorDashboardScreen';
import { DoctorProfileScreen } from './screens/doctor/DoctorProfileScreen';
import { TodayAppointmentsScreen } from './screens/doctor/TodayAppointmentsScreen';
import { UpcomingAppointmentsScreen } from './screens/doctor/UpcomingAppointmentsScreen';
import { PatientDetailsScreen } from './screens/doctor/PatientDetailsScreen';
import { ConsultationScreen } from './screens/doctor/ConsultationScreen';
import { AddDiagnosisScreen } from './screens/doctor/AddDiagnosisScreen';
import { AddPrescriptionScreen } from './screens/doctor/AddPrescriptionScreen';
import { UploadMedicalReportScreen } from './screens/doctor/UploadMedicalReportScreen';
import { DoctorAppointmentHistoryScreen } from './screens/doctor/DoctorAppointmentHistoryScreen';

// Admin Screens
import { AdminDashboardScreen } from './screens/admin/AdminDashboardScreen';
import { ManageDoctorsScreen } from './screens/admin/ManageDoctorsScreen';
import { AddDoctorScreen } from './screens/admin/AddDoctorScreen';
import { ManagePatientsScreen } from './screens/admin/ManagePatientsScreen';
import { ManageDepartmentsScreen } from './screens/admin/ManageDepartmentsScreen';
import { ManageAppointmentsScreen } from './screens/admin/ManageAppointmentsScreen';

import { UserRole } from './types';
import { Stethoscope, User, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentScreen, userRole, login, navigate } = useAppNavigation();

  // Screen routing dictionary
  const renderScreen = () => {
    switch (currentScreen) {
      // Auth Flow
      case 'Splash':
        return <SplashScreen />;
      case 'Welcome':
        return <WelcomeScreen />;
      case 'RoleSelection':
        return <RoleSelectionScreen />;
      case 'Login':
        return <LoginScreen />;
      case 'Registration':
        return <RegistrationScreen />;
      case 'ForgotPassword':
        return <ForgotPasswordScreen />;

      // Patient Flow
      case 'PatientDashboard':
        return <PatientDashboardScreen />;
      case 'DoctorList':
        return <DoctorListScreen />;
      case 'DoctorDetails':
        return <DoctorDetailsScreen />;
      case 'SearchDoctor':
        return <SearchDoctorScreen />;
      case 'DepartmentList':
        return <DepartmentListScreen />;
      case 'AppointmentBooking':
        return <AppointmentBookingScreen />;
      case 'AppointmentConfirmation':
        return <AppointmentConfirmationScreen />;
      case 'MyAppointments':
        return <MyAppointmentsScreen />;
      case 'AppointmentDetails':
        return <AppointmentDetailsScreen />;
      case 'Prescriptions':
        return <PrescriptionsScreen />;
      case 'PrescriptionDetails':
        return <PrescriptionDetailsScreen />;
      case 'MedicalReports':
        return <MedicalReportsScreen />;
      case 'MedicalReportDetails':
        return <MedicalReportDetailsScreen />;
      case 'PatientProfile':
        return <PatientProfileScreen />;
      case 'AppointmentHistory':
        return <AppointmentHistoryScreen />;
      case 'Notifications':
        return <NotificationsScreen />;

      // Doctor Flow
      case 'DoctorDashboard':
        return <DoctorDashboardScreen />;
      case 'DoctorProfile':
        return <DoctorProfileScreen />;
      case 'TodayAppointments':
        return <TodayAppointmentsScreen />;
      case 'UpcomingAppointments':
        return <UpcomingAppointmentsScreen />;
      case 'PatientDetails':
        return <PatientDetailsScreen />;
      case 'Consultation':
        return <ConsultationScreen />;
      case 'AddDiagnosis':
        return <AddDiagnosisScreen />;
      case 'AddPrescription':
        return <AddPrescriptionScreen />;
      case 'UploadMedicalReport':
        return <UploadMedicalReportScreen />;
      case 'DoctorAppointmentHistory':
        return <DoctorAppointmentHistoryScreen />;

      // Admin Flow
      case 'AdminDashboard':
        return <AdminDashboardScreen />;
      case 'ManageDoctors':
        return <ManageDoctorsScreen />;
      case 'AddDoctor':
        return <AddDoctorScreen />;
      case 'ManagePatients':
        return <ManagePatientsScreen />;
      case 'ManageDepartments':
        return <ManageDepartmentsScreen />;
      case 'ManageAppointments':
        return <ManageAppointmentsScreen />;

      default:
        return <SplashScreen />;
    }
  };

  const handleRoleQuickSwitch = (role: UserRole) => {
    login(role);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start sm:py-6 font-sans">
      {/* Top Demo Bar / Quick Switcher for testing and reviewing roles */}
      <div className="w-full max-w-md px-4 py-2 bg-slate-800 text-slate-200 flex items-center justify-between text-xs border-b border-slate-700 sm:rounded-t-2xl sm:border shadow-sm">
        <span className="font-semibold text-emerald-400 flex items-center gap-1.5 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          Medicare v1.0
        </span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-slate-400 hidden xs:inline">Preview:</span>
          <button
            onClick={() => handleRoleQuickSwitch('patient')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              userRole === 'patient'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => handleRoleQuickSwitch('doctor')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              userRole === 'doctor'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => handleRoleQuickSwitch('admin')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              userRole === 'admin'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Main Mobile App Frame Container */}
      <div
        id="medicare-mobile-frame"
        className="w-full max-w-md min-h-screen sm:min-h-[844px] sm:max-h-[920px] bg-white flex flex-col shadow-2xl relative overflow-hidden sm:rounded-b-2xl"
      >
        {renderScreen()}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
