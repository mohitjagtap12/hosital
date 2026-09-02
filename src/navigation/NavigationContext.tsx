import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RootScreen, UserRole, Doctor, Department, Appointment, Prescription, MedicalReport } from '../types';

interface NavigationContextType {
  currentScreen: RootScreen;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  screenParams: Record<string, any>;
  navigate: (screen: RootScreen, params?: Record<string, any>) => void;
  goBack: () => void;
  setRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  patientActiveTab: 'home' | 'doctors' | 'appointments' | 'records' | 'profile';
  setPatientActiveTab: (tab: 'home' | 'doctors' | 'appointments' | 'records' | 'profile') => void;
  doctorActiveTab: 'dashboard' | 'today' | 'upcoming' | 'profile';
  setDoctorActiveTab: (tab: 'dashboard' | 'today' | 'upcoming' | 'profile') => void;
  adminActiveTab: 'dashboard' | 'doctors' | 'patients' | 'departments' | 'appointments';
  setAdminActiveTab: (tab: 'dashboard' | 'doctors' | 'patients' | 'departments' | 'appointments') => void;
  selectedDoctor?: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  selectedDepartment?: Department | null;
  setSelectedDepartment: (dept: Department | null) => void;
  selectedAppointment?: Appointment | null;
  setSelectedAppointment: (apt: Appointment | null) => void;
  selectedPrescription?: Prescription | null;
  setSelectedPrescription: (prescription: Prescription | null) => void;
  selectedReport?: MedicalReport | null;
  setSelectedReport: (report: MedicalReport | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<RootScreen>('Splash');
  const [history, setHistory] = useState<RootScreen[]>(['Splash']);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});

  const [patientActiveTab, setPatientActiveTab] = useState<'home' | 'doctors' | 'appointments' | 'records' | 'profile'>('home');
  const [doctorActiveTab, setDoctorActiveTab] = useState<'dashboard' | 'today' | 'upcoming' | 'profile'>('dashboard');
  const [adminActiveTab, setAdminActiveTab] = useState<'dashboard' | 'doctors' | 'patients' | 'departments' | 'appointments'>('dashboard');

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);

  const navigate = (screen: RootScreen, params?: Record<string, any>) => {
    if (params) {
      setScreenParams(params);
      if (params.doctor) setSelectedDoctor(params.doctor);
      if (params.department) setSelectedDepartment(params.department);
      if (params.appointment) setSelectedAppointment(params.appointment);
      if (params.prescription) setSelectedPrescription(params.prescription);
      if (params.report) setSelectedReport(params.report);
    }
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const nextHistory = [...history];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      // Fallback based on role
      if (isAuthenticated) {
        if (userRole === 'patient') setCurrentScreen('PatientDashboard');
        else if (userRole === 'doctor') setCurrentScreen('DoctorDashboard');
        else if (userRole === 'admin') setCurrentScreen('AdminDashboard');
      } else {
        setCurrentScreen('Welcome');
      }
    }
  };

  const setRole = (role: UserRole) => {
    setUserRole(role);
  };

  const login = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    if (role === 'patient') {
      setCurrentScreen('PatientDashboard');
      setPatientActiveTab('home');
    } else if (role === 'doctor') {
      setCurrentScreen('DoctorDashboard');
      setDoctorActiveTab('dashboard');
    } else {
      setCurrentScreen('AdminDashboard');
      setAdminActiveTab('dashboard');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentScreen('Welcome');
    setHistory(['Welcome']);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        userRole,
        isAuthenticated,
        screenParams,
        navigate,
        goBack,
        setRole,
        login,
        logout,
        patientActiveTab,
        setPatientActiveTab,
        doctorActiveTab,
        setDoctorActiveTab,
        adminActiveTab,
        setAdminActiveTab,
        selectedDoctor,
        setSelectedDoctor,
        selectedDepartment,
        setSelectedDepartment,
        selectedAppointment,
        setSelectedAppointment,
        selectedPrescription,
        setSelectedPrescription,
        selectedReport,
        setSelectedReport,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within NavigationProvider');
  }
  return context;
};
