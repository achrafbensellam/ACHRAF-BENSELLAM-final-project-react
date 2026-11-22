// /** ============================ start besmillah ================================*/
import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home/Home';
import PageHeader from './layouts/Header';
import PageFooter from './layouts/Footer';

import AboutPage from './pages/About/About';
import ErrorPage from './pages/Error/Error';

import SignInPage from './pages/SignUpLogIn/signIn';
import LoginPage from './pages/SignUpLogIn/login';

import PatientDashboard from './pages/Patient/patientDashboard';
import Doctors from './pages/Patient/doctors';
import DoctorDetails from './pages/Patient/doctorsDetails';
import Booking from './pages/Patient/booking';
import MyAppointments from './pages/Patient/patienAppointment';
import DoctorDashboa from './pages/Doctor/doctorDashboard';
import FavoriteDoctors from './pages/Patient/favouriteDoc';
import DoctorAppointments from './pages/Doctor/doctorAppointment';
import MyPatients from './pages/Doctor/doctorPatient';
import MySchedule from './pages/Doctor/doctorShedual';
import AdminDashboard from './pages/Admin/adminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LoginPage />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />}/>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/patient/appointments" element={<MyAppointments />}/>
      <Route path="/doctor/dashboard" element={<DoctorDashboa/>} />
      <Route path="/patient/favorites" element={<FavoriteDoctors />}/>
      <Route path="/doctor/appointments" element={<DoctorAppointments />}/>
      <Route path="/doctor/patients" element={<MyPatients />}/>
      <Route path="/doctor/schedule" element={<MySchedule />}/>
      <Route path="/admin/dashboard" element={<AdminDashboard />}/>
    </Routes>
  );
}

export default App;