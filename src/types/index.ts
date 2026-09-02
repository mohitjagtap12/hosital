export type UserRole = 'patient' | 'doctor' | 'admin';

export type AppointmentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled' | 'Completed';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  iconName: string;
  description: string;
  doctorCount: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: string;
  departmentId: string;
  departmentName: string;
  phone: string;
  email: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  availableDays: string[];
  availableSlots: string[];
  about?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  departmentName: string;
  doctorSpecialization: string;
  doctorImage?: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
  notes?: string;
}

export interface MedicineItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentId: string;
  date: string;
  diagnosis: string;
  medicines: MedicineItem[];
  advice: string;
  createdAt: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentId?: string;
  reportName: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'prescription' | 'report' | 'system';
  isRead: boolean;
  createdAt: string;
}

export type RootScreen =
  // Auth
  | 'Splash'
  | 'Welcome'
  | 'Login'
  | 'Registration'
  | 'ForgotPassword'
  | 'RoleSelection'
  // Patient
  | 'PatientDashboard'
  | 'PatientProfile'
  | 'DoctorList'
  | 'DoctorDetails'
  | 'SearchDoctor'
  | 'DepartmentList'
  | 'AppointmentBooking'
  | 'AppointmentConfirmation'
  | 'MyAppointments'
  | 'AppointmentDetails'
  | 'Prescriptions'
  | 'PrescriptionDetails'
  | 'MedicalReports'
  | 'MedicalReportDetails'
  | 'AppointmentHistory'
  | 'Notifications'
  // Doctor
  | 'DoctorDashboard'
  | 'DoctorProfile'
  | 'TodayAppointments'
  | 'UpcomingAppointments'
  | 'PatientDetails'
  | 'Consultation'
  | 'AddDiagnosis'
  | 'AddPrescription'
  | 'UploadMedicalReport'
  | 'DoctorAppointmentHistory'
  // Admin
  | 'AdminDashboard'
  | 'ManageDoctors'
  | 'AddDoctor'
  | 'ManagePatients'
  | 'ManageDepartments'
  | 'ManageAppointments';
