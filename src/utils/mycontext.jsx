import { createContext, useEffect, useState } from "react";
export const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [patient, setPatient] = useState(
    ()=>{ return JSON.parse(localStorage.getItem("patient")) || []}
  );
 
const initialDoctors = [
   {
    id: 1,
    name: "Dr. Amira Benali",
    email: "amira.benali@medconnect.com",
    password: "doctor123",
    specialty: "Cardiology",
    department: "Heart & Vascular Center",
    experienceYears: 14,
    rating: 4.9,
    available: true,
    phone: "+212 600-112233",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "doctor",
    city: "Fes",
    price: 350,
    languages: ["Arabic", "French", "English"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: { start: "09:00", end: "17:00" },
    slotDuration: 30,
    daysOff: ["2026-12-01"]
  },
  {
    id: 2,
    name: "Dr. Karim Tazi",
    email: "karim.tazi@medconnect.com",
    password: "doctor123",
    specialty: "Neurology",
    department: "Neurosciences",
    experienceYears: 11,
    rating: 4.8,
    available: true,
    phone: "+212 600-223344",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "doctor",
    city: "Casablanca",
    price: 400,
    languages: ["Arabic", "French"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    workingHours: { start: "10:00", end: "18:00" },
    slotDuration: 30,
    daysOff: []
  },
  {
    id: 3,
    name: "Dr. Salma Idrissi",
    email: "salma.idrissi@medconnect.com",
    password: "doctor123",
    specialty: "Pediatrics",
    department: "Children's Health",
    experienceYears: 9,
    rating: 4.9,
    available: false,
    phone: "+212 600-334455",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "doctor",
    city: "Rabat",
    price: 250,
    languages: ["Arabic", "French", "English"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: { start: "09:00", end: "16:00" },
    slotDuration: 30,
    daysOff: ["2026-11-25", "2026-11-26"]
  },
  {
    id: 4,
    name: "Dr. Youssef Alaoui",
    email: "youssef.alaoui@medconnect.com",
    password: "doctor123",
    specialty: "Orthopedic Surgery",
    department: "Orthopedics & Sports Medicine",
    experienceYears: 16,
    rating: 4.7,
    available: true,
    phone: "+212 600-445566",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    role: "doctor",
    city: "Marrakech",
    price: 450,
    languages: ["Arabic", "French", "English"],
    workingDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    workingHours: { start: "08:30", end: "16:30" },
    slotDuration: 30,
    daysOff: []
  },
  {
    id: 5,
    name: "Dr. Nadia Berrada",
    email: "nadia.berrada@medconnect.com",
    password: "doctor123",
    specialty: "Dermatology",
    department: "Skin & Laser Clinic",
    experienceYears: 8,
    rating: 4.8,
    available: true,
    phone: "+212 600-556677",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    role: "doctor",
    city: "Tangier",
    price: 300,
    languages: ["Arabic", "French", "Spanish"],
    workingDays: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    workingHours: { start: "09:00", end: "17:00" },
    slotDuration: 30,
    daysOff: []
  },
  {
    id: 6,
    name: "Dr. Omar Chraibi",
    email: "omar.chraibi@medconnect.com",
    password: "doctor123",
    specialty: "General Surgery",
    department: "Surgical Unit",
    experienceYears: 19,
    rating: 4.9,
    available: false,
    phone: "+212 600-667788",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    role: "doctor",
    city: "Fes",
    price: 500,
    languages: ["Arabic", "French"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: { start: "08:00", end: "15:00" },
    slotDuration: 30,
    daysOff: ["2026-11-24"]
  },
  {
    id: 7,
    name: "Dr. Leila Mansouri",
    email: "leila.mansouri@medconnect.com",
    password: "doctor123",
    specialty: "Ophthalmology",
    department: "Eye Care Center",
    experienceYears: 12,
    rating: 4.7,
    available: true,
    phone: "+212 600-778899",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    role: "doctor",
    city: "Agadir",
    price: 300,
    languages: ["Arabic", "French", "English"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    workingHours: { start: "09:00", end: "16:00" },
    slotDuration: 30,
    daysOff: []
  },
  {
    id: 8,
    name: "Dr. Mehdi Fassi",
    email: "mehdi.fassi@medconnect.com",
    password: "doctor123",
    specialty: "Internal Medicine",
    department: "General Medicine",
    experienceYears: 10,
    rating: 4.6,
    available: true,
    phone: "+212 600-889900",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    role: "doctor",
    city: "Meknes",
    price: 200,
    languages: ["Arabic", "French"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    workingHours: { start: "09:00", end: "18:00" },
    slotDuration: 30,
    daysOff: []
  },
  {
    id: 9,
    name: "Dr. Houda Kabbaj",
    email: "houda.kabbaj@medconnect.com",
    password: "doctor123",
    specialty: "Gynecology & Obstetrics",
    department: "Women's Health",
    experienceYears: 15,
    rating: 4.9,
    available: true,
    phone: "+212 600-990011",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
    role: "doctor",
    city: "Casablanca",
    price: 400,
    languages: ["Arabic", "French", "English"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: { start: "09:00", end: "17:00" },
    slotDuration: 30,
    daysOff: []
  },
  {
    id: 10,
    name: "Dr. Tariq Bennani",
    email: "tariq.bennani@medconnect.com",
    password: "doctor123",
    specialty: "Radiology",
    department: "Diagnostic Imaging",
    experienceYears: 13,
    rating: 4.8,
    available: false,
    phone: "+212 600-101112",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    role: "doctor",
    city: "Rabat",
    price: 350,
    languages: ["Arabic", "French", "English"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: { start: "08:00", end: "16:00" },
    slotDuration: 30,
    daysOff: []
  }
];
const [doctors, setDoctors] = useState(() => {
    const savedDoctors = localStorage.getItem("doctors");

    if (savedDoctors) {
        return JSON.parse(savedDoctors);
    } else {
        return initialDoctors;
    }
});
useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
}, [doctors]);
  // current user:
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('loggedUser')) || null
);
useEffect(() => {
    if (currentUser) {
        localStorage.setItem("loggedUser", JSON.stringify(currentUser));
    }
}, [currentUser]);

const [appointments, setAppointments] = useState(
    () => JSON.parse(localStorage.getItem("appointments")) || []
);

useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
}, [appointments]);

  return (
    <MyContext.Provider value={{ patient,setPatient,doctors, setDoctors,currentUser, setCurrentUser,appointments, setAppointments}}>
      {children}
    </MyContext.Provider>
  )
}