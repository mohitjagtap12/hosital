import { Department, Doctor, Appointment, Prescription, MedicalReport, AppNotification } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-1',
    name: 'Cardiology',
    iconName: 'Heart',
    description: 'Specialized heart care, cardiovascular diagnostics, and treatments',
    doctorCount: 8,
  },
  {
    id: 'dept-2',
    name: 'Orthopedics',
    iconName: 'Activity',
    description: 'Bone, joint, spine, and musculoskeletal injury therapies',
    doctorCount: 6,
  },
  {
    id: 'dept-3',
    name: 'Dermatology',
    iconName: 'Sparkles',
    description: 'Skin diagnostics, cosmetic procedures, and allergy relief',
    doctorCount: 5,
  },
  {
    id: 'dept-4',
    name: 'Neurology',
    iconName: 'Brain',
    description: 'Brain, spinal cord, nerve disorders, and cognitive healthcare',
    doctorCount: 4,
  },
  {
    id: 'dept-5',
    name: 'Pediatrics',
    iconName: 'Baby',
    description: 'Infant, child, and adolescent comprehensive pediatric wellness',
    doctorCount: 7,
  },
  {
    id: 'dept-6',
    name: 'General Medicine',
    iconName: 'Stethoscope',
    description: 'Primary care, physical health evaluations, and general diagnostics',
    doctorCount: 11,
  },
  {
    id: 'dept-7',
    name: 'Dental',
    iconName: 'Smile',
    description: 'Oral surgery, orthodontics, preventive hygiene, and cosmetic dental',
    doctorCount: 4,
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    specialization: 'Senior Cardiologist',
    qualification: 'MD, FACC, Harvard Medical School',
    experience: '14 years exp.',
    departmentId: 'dept-1',
    departmentName: 'Cardiology',
    phone: '+1 (555) 234-5678',
    email: 'sarah.jenkins@medicare.health',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 142,
    consultationFee: 75,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'],
    about: 'Dr. Sarah Jenkins is a board-certified cardiologist with extensive clinical expertise in interventional cardiology and preventive cardiovascular health.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    specialization: 'Orthopedic Surgeon',
    qualification: 'MS (Ortho), MBBS, Johns Hopkins',
    experience: '11 years exp.',
    departmentId: 'dept-2',
    departmentName: 'Orthopedics',
    phone: '+1 (555) 876-5432',
    email: 'marcus.vance@medicare.health',
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviewCount: 98,
    consultationFee: 65,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: ['10:00 AM', '11:00 AM', '01:30 PM', '03:00 PM'],
    about: 'Specializes in sports injuries, arthroscopic surgeries, and reconstructive joint therapy.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova',
    specialization: 'Consultant Dermatologist',
    qualification: 'MD, Board Certified Dermatologist',
    experience: '9 years exp.',
    departmentId: 'dept-3',
    departmentName: 'Dermatology',
    phone: '+1 (555) 345-6789',
    email: 'elena.rostova@medicare.health',
    profileImage: 'https://images.unsplash.com/photo-1594824813627-724f923b7e73?auto=format&fit=crop&q=80&w=400',
    rating: 4.95,
    reviewCount: 180,
    consultationFee: 60,
    availableDays: ['Tue', 'Thu', 'Fri', 'Sat'],
    availableSlots: ['09:30 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    about: 'Passionate about advanced dermatology care, chronic eczema management, and aesthetic clinical skin health.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Aaron Patel',
    specialization: 'Neurologist & Neurotherapist',
    qualification: 'MD, DM Neurology, Stanford University',
    experience: '16 years exp.',
    departmentId: 'dept-4',
    departmentName: 'Neurology',
    phone: '+1 (555) 456-7890',
    email: 'aaron.patel@medicare.health',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    rating: 4.85,
    reviewCount: 115,
    consultationFee: 85,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    about: 'Focused on headache disorders, neuro-rehabilitation, stroke management, and nerve conduction studies.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientId: 'pat-1',
    doctorId: 'doc-1',
    patientName: 'Alex Johnson',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialization: 'Senior Cardiologist',
    departmentName: 'Cardiology',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    date: 'Tomorrow, Sep 03',
    time: '10:00 AM',
    reason: 'Routine ECG checkup & blood pressure review',
    status: 'Approved',
    createdAt: '2026-09-01T10:00:00Z',
    notes: 'Please fast for 4 hours before your cardiac lipid profile test.'
  },
  {
    id: 'apt-102',
    patientId: 'pat-1',
    doctorId: 'doc-3',
    patientName: 'Alex Johnson',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialization: 'Consultant Dermatologist',
    departmentName: 'Dermatology',
    doctorImage: 'https://images.unsplash.com/photo-1594824813627-724f923b7e73?auto=format&fit=crop&q=80&w=400',
    date: 'Sep 08, 2026',
    time: '02:30 PM',
    reason: 'Skin rash follow-up and allergy consultation',
    status: 'Pending',
    createdAt: '2026-09-02T08:30:00Z',
  },
  {
    id: 'apt-103',
    patientId: 'pat-1',
    doctorId: 'doc-2',
    patientName: 'Alex Johnson',
    doctorName: 'Dr. Marcus Vance',
    doctorSpecialization: 'Orthopedic Surgeon',
    departmentName: 'Orthopedics',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    date: 'Aug 20, 2026',
    time: '11:00 AM',
    reason: 'Knee joint pain after running',
    status: 'Completed',
    createdAt: '2026-08-15T12:00:00Z',
    notes: 'Prescribed physical therapy and knee brace.'
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'pr-1',
    patientId: 'pat-1',
    patientName: 'Alex Johnson',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    appointmentId: 'apt-103',
    date: 'Aug 20, 2026',
    diagnosis: 'Mild Hypertension & Exercise-Induced Strain',
    medicines: [
      {
        name: 'Paracetamol',
        dosage: '500 mg',
        frequency: '2 times/day',
        duration: '3 days',
        instructions: 'Take medicine after food.',
      },
      {
        name: 'Amlodipine',
        dosage: '5 mg',
        frequency: 'Once daily (morning)',
        duration: '30 days',
        instructions: 'Take with a glass of water before breakfast.',
      },
      {
        name: 'Multivitamin Complex',
        dosage: '1 capsule',
        frequency: 'Once daily',
        duration: '15 days',
        instructions: 'Take after lunch.',
      }
    ],
    advice: 'Drink at least 2.5 liters of water daily. Avoid heavy salt intake and strenuous workouts for 48 hours.',
    createdAt: '2026-08-20T11:45:00Z',
  }
];

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-1',
    patientId: 'pat-1',
    patientName: 'Alex Johnson',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    appointmentId: 'apt-103',
    reportName: 'Electrocardiogram (ECG) Report',
    description: '12-lead standard resting ECG rhythm analysis. Normal sinus rhythm with normal axis.',
    fileUrl: '#',
    fileType: 'PDF Document',
    fileSize: '1.4 MB',
    createdAt: '2026-08-20T12:30:00Z',
  },
  {
    id: 'rep-2',
    patientId: 'pat-1',
    patientName: 'Alex Johnson',
    doctorId: 'doc-2',
    doctorName: 'Dr. Marcus Vance',
    appointmentId: 'apt-103',
    reportName: 'Knee Joint X-Ray Digital Scan',
    description: 'AP and Lateral views of right knee showing intact joint space and no osseous fracture.',
    fileUrl: '#',
    fileType: 'DICOM / Image',
    fileSize: '3.8 MB',
    createdAt: '2026-08-21T09:15:00Z',
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'pat-1',
    title: 'Appointment Approved',
    message: 'Your appointment with Dr. Sarah Jenkins on Sep 03 at 10:00 AM has been approved.',
    type: 'appointment',
    isRead: false,
    createdAt: '2 hours ago',
  },
  {
    id: 'notif-2',
    userId: 'pat-1',
    title: 'Prescription Uploaded',
    message: 'Dr. Sarah Jenkins uploaded your latest medical prescription.',
    type: 'prescription',
    isRead: true,
    createdAt: 'Yesterday',
  },
  {
    id: 'notif-3',
    userId: 'pat-1',
    title: 'Welcome to Medicare',
    message: 'Connect with top medical specialists and book appointments seamlessly.',
    type: 'system',
    isRead: true,
    createdAt: '3 days ago',
  }
];
