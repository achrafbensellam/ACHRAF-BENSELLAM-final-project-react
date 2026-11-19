import { createContext, useEffect, useState } from "react";
export const MyContext = createContext();
export const MyProvider = ({children})=>{
    const [patient,setPatient] = useState([]);
 const doctors = [
  {
    id: 1,
    name: "Dr. Amira Benali",
    specialty: "Cardiology",
    department: "Heart & Vascular Center",
    experienceYears: 14,
    rating: 4.9,
    available: true,
    phone: "+212 600-112233",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Dr. Karim Tazi",
    specialty: "Neurology",
    department: "Neurosciences",
    experienceYears: 11,
    rating: 4.8,
    available: true,
    phone: "+212 600-223344",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Dr. Salma Idrissi",
    specialty: "Pediatrics",
    department: "Children's Health",
    experienceYears: 9,
    rating: 4.9,
    available: false,
    phone: "+212 600-334455",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "Dr. Youssef Alaoui",
    specialty: "Orthopedic Surgery",
    department: "Orthopedics & Sports Medicine",
    experienceYears: 16,
    rating: 4.7,
    available: true,
    phone: "+212 600-445566",
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 5,
    name: "Dr. Nadia Berrada",
    specialty: "Dermatology",
    department: "Skin & Laser Clinic",
    experienceYears: 8,
    rating: 4.8,
    available: true,
    phone: "+212 600-556677",
    image: "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    id: 6,
    name: "Dr. Omar Chraibi",
    specialty: "General Surgery",
    department: "Surgical Unit",
    experienceYears: 19,
    rating: 4.9,
    available: false,
    phone: "+212 600-667788",
    image: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    id: 7,
    name: "Dr. Leila Mansouri",
    specialty: "Ophthalmology",
    department: "Eye Care Center",
    experienceYears: 12,
    rating: 4.7,
    available: true,
    phone: "+212 600-778899",
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    id: 8,
    name: "Dr. Mehdi Fassi",
    specialty: "Internal Medicine",
    department: "General Medicine",
    experienceYears: 10,
    rating: 4.6,
    available: true,
    phone: "+212 600-889900",
    image: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    id: 9,
    name: "Dr. Houda Kabbaj",
    specialty: "Gynecology & Obstetrics",
    department: "Women's Health",
    experienceYears: 15,
    rating: 4.9,
    available: true,
    phone: "+212 600-990011",
    image: "https://randomuser.me/api/portraits/women/54.jpg"
  },
  {
    id: 10,
    name: "Dr. Tariq Bennani",
    specialty: "Radiology",
    department: "Diagnostic Imaging",
    experienceYears: 13,
    rating: 4.8,
    available: false,
    phone: "+212 600-101112",
    image: "https://randomuser.me/api/portraits/men/61.jpg"
  }
];
    
    return(
        <MyContext.Provider value={{patient}}>
            {children}
        </MyContext.Provider>
    )
}