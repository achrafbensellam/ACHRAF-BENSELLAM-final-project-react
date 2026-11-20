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
// import Doctors from './pages/Patient/doctors';

function App() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={
        <LoginPage />
      } />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Patient Pages */}
      <Route
        path="/patient/dashboard"
        element={<PatientDashboard />}
      />

      {/* Error Page */}
      <Route path="*" element={<ErrorPage />} />
      {/* <Route path="/doctors" element={<Doctors />} /> */}
{/* <Route path="/doctors/:id" element={<DoctorDetails />} />
<Route path="/booking/:id" element={<BookingPage />} /> */}
    </Routes>
  );
}

export default App;