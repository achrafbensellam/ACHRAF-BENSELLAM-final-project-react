import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import {
    FiHome,
    FiCalendar,
    FiHeart,
    FiUser,
    FiSettings,
    FiLogOut,
    FiSearch,
    FiBell,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiArrowRight,
    FiMapPin,
    FiPlus,
    FiActivity
} from "react-icons/fi";

import "./PatientDashboard.css";
import Sidebar from "../../layouts/sidebar";

function PatientDashboard() {
    const {currentUser,doctors,appointments,setCurrentUser} = useContext(MyContext);
    if (!currentUser) {
        return (
            <div className="pd-login-message">
                <p>Please login first.</p>
            </div>
        );
    }

    const myAppointments = appointments.filter(
        (appointment) => appointment.patientId === currentUser.id
    );

    const upcomingAppointments = myAppointments.filter(
        (appointment) =>
            ["pending", "confirmed"].includes(appointment.status) &&
            new Date(`${appointment.date}T${appointment.time || "00:00"}`) >= new Date()
    );

    const completedAppointments = myAppointments.filter(
        (appointment) => appointment.status === "completed"
    );

    const cancelledAppointments = myAppointments.filter(
        (appointment) => appointment.status === "cancelled"
    );

    const nextAppointment = [...upcomingAppointments].sort(
        (a, b) =>
            new Date(`${a.date}T${a.time || "00:00"}`) -
            new Date(`${b.date}T${b.time || "00:00"}`)
    )[0];

    const favoriteDoctors = doctors.filter(
        (doctor) => currentUser.favorites?.includes(doctor.id)
    );

    const getDoctor = (doctorId) =>
        doctors.find((doctor) => doctor.id === doctorId);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("loggedUser");
    };

    return (
        <div className="patient-page">
            {/* SIDEBAR */}
            {/* <aside className="pd-sidebar">
                <div className="pd-logo">
                    <h1>Med<span>Connect</span></h1>
                    <p>Your Health, Our Priority</p>
                </div>

                <nav className="pd-navigation">
                    <p className="pd-nav-heading">Main Menu</p>

                    <Link to="/patient/dashboard" className="pd-nav-link active">
                        <FiHome size={19} />
                        Dashboard
                    </Link>

                    <Link to="/patient/appointments" className="pd-nav-link">
                        <FiCalendar size={19} />
                        My Appointments
                    </Link>

                    <Link to="/doctors" className="pd-nav-link">
                        <FiSearch size={19} />
                        Find Doctors
                    </Link>

                    <Link to="/patient/favorites" className="pd-nav-link">
                        <FiHeart size={19} />
                        Favorite Doctors
                    </Link>

                    <div className="pd-account-nav">
                        <p className="pd-nav-heading">Account</p>

                        <Link to="/patient/profile" className="pd-nav-link">
                            <FiUser size={19} />
                            My Profile
                        </Link>

                        <Link to="/patient/settings" className="pd-nav-link">
                            <FiSettings size={19} />
                            Settings
                        </Link>
                    </div>
                </nav>

                <div className="pd-logout-area">
                    <button onClick={handleLogout} className="pd-logout-button">
                        <FiLogOut size={19} />
                        Logout
                    </button>
                </div>
            </aside> */}
            <Sidebar/>
            {/* MAIN CONTENT */}
            <main className="pd-main">
                <header className="pd-header">
                    <div>
                        <p className="pd-muted pd-welcome">Welcome back </p>
                        <h2>Hello, {currentUser.name}</h2>
                        <p className="pd-subtitle">
                            Here's what's happening with your health today.
                        </p>
                    </div>

                    <div className="pd-header-actions">
                        <button className="pd-notification-button" aria-label="Notifications">
                            <FiBell size={20} />
                        </button>

                        <Link to="/patient/profile" className="pd-user-link">
                            <div className="pd-avatar">
                                {currentUser.image ? (
                                    <img src={currentUser.image} alt="Profile" />
                                ) : (
                                    <FiUser className="pd-avatar-icon" size={22} />
                                )}
                            </div>

                            <div className="pd-user-info">
                                <p>{currentUser.name}</p>
                                <span>Patient</span>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* WELCOME BANNER */}
                <section className="pd-banner">
                    <div className="pd-banner-content">
                        <p className="pd-banner-eyebrow">Your health matters</p>
                        <h2>Take care of your health with MedConnect</h2>
                        <p className="pd-banner-description">
                            Find trusted doctors, book appointments and manage your
                            healthcare easily.
                        </p>

                        <Link to="/doctors" className="pd-primary-button">
                            Find a Doctor
                            <FiArrowRight />
                        </Link>
                    </div>

                    <FiActivity className="pd-banner-decoration" />
                </section>

                {/* STATISTICS */}
                <section className="pd-stats-grid">
                    <div className="pd-stat-card">
                        <div className="pd-stat-top">
                            <div className="pd-stat-icon blue"><FiCalendar size={22} /></div>
                            <span>Upcoming</span>
                        </div>
                        {/* //!! */}
                        <h3>{upcomingAppointments.length}</h3>
                        <p>Upcoming appointments</p>
                    </div>

                    <div className="pd-stat-card">
                        <div className="pd-stat-top">
                            <div className="pd-stat-icon green"><FiCheckCircle size={22} /></div>
                            <span>Completed</span>
                        </div>
                        {/* //!! */}
                        <h3>{completedAppointments.length}</h3>
                        <p>Completed appointments</p>
                    </div>

                    <div className="pd-stat-card">
                        <div className="pd-stat-top">
                            <div className="pd-stat-icon red"><FiXCircle size={22} /></div>
                            <span>Cancelled</span>
                        </div>
                        {/* //!! */}
                        <h3>{cancelledAppointments.length}</h3>
                        <p>Cancelled appointments</p>
                    </div>

                    <div className="pd-stat-card">
                        <div className="pd-stat-top">
                            <div className="pd-stat-icon pink"><FiHeart size={22} /></div>
                            <span>Favorites</span>
                        </div>
                        {/* //!! */}
                        {/* <h3>{favoriteDoctors.length}</h3> */}
                        <p>Favorite doctors</p>
                    </div>
                </section>

                {/* APPOINTMENT AND QUICK ACTIONS */}
                <section className="pd-content-grid">
                    <div className="pd-panel pd-next-panel">
                        <div className="pd-panel-heading">
                            <div>
                                <h3>Next Appointment</h3>
                                <p>Your nearest scheduled visit</p>
                            </div>
                            <Link to="/patient/appointments" className="pd-text-link">
                                View All
                            </Link>
                        </div>

                        {nextAppointment ? (
                            (() => {
                                const doctor = getDoctor(nextAppointment.doctorId);

                                return (
                                    <div className="pd-next-appointment">
                                        <div className="pd-doctor-image">
                                            {doctor?.image && (
                                                <img src={doctor.image} alt={doctor.name} />
                                            )}
                                        </div>

                                        <div className="pd-appointment-info">
                                            <h4>{doctor?.name || "Doctor"}</h4>
                                            <p className="pd-doctor-specialty">
                                                {doctor?.specialty || "Medical appointment"}
                                            </p>

                                            <div className="pd-appointment-meta">
                                                <span>
                                                    <FiCalendar />
                                                    {formatDate(nextAppointment.date)}
                                                </span>
                                                <span>
                                                    <FiClock />
                                                    {nextAppointment.time || "Time not specified"}
                                                </span>
                                            </div>
                                        </div>

                                        <span className={`pd-status ${
                                            nextAppointment.status === "confirmed"
                                                ? "confirmed"
                                                : "pending"
                                        }`}>
                                            {nextAppointment.status}
                                        </span>
                                    </div>
                                );
                            })()
                        ) : (
                            <div className="pd-empty-state">
                                <div className="pd-empty-icon">
                                    <FiCalendar size={25} />
                                </div>
                                <h4>No upcoming appointments</h4>
                                <p>You haven't booked an appointment yet.</p>
                                <Link to="/doctors" className="pd-primary-button">
                                    <FiPlus />
                                    Book an Appointment
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="pd-panel pd-quick-panel">
                        <h3>Quick Actions</h3>
                        <p className="pd-panel-description">What would you like to do?</p>

                        <div className="pd-quick-list">
                            <Link to="/doctors" className="pd-quick-link blue-quick">
                                <div className="pd-quick-icon blue"><FiSearch size={20} /></div>
                                <div>
                                    <p>Find a Doctor</p>
                                    <span>Explore specialists</span>
                                </div>
                            </Link>

                            <Link to="/patient/appointments" className="pd-quick-link green-quick">
                                <div className="pd-quick-icon green"><FiCalendar size={20} /></div>
                                <div>
                                    <p>My Appointments</p>
                                    <span>Manage your visits</span>
                                </div>
                            </Link>

                            <Link to="/patient/profile" className="pd-quick-link purple-quick">
                                <div className="pd-quick-icon purple"><FiUser size={20} /></div>
                                <div>
                                    <p>My Profile</p>
                                    <span>Update your information</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAVORITE DOCTORS */}
                <section className="pd-panel pd-favorites-panel">
                    <div className="pd-panel-heading">
                        <div>
                            <h3>Favorite Doctors</h3>
                            <p>Your saved medical specialists</p>
                        </div>
                        <Link to="/patient/favorites" className="pd-text-link">
                            View All
                        </Link>
                    </div>

                    {favoriteDoctors.length > 0 ? (
                        <div className="pd-favorites-grid">
                            {favoriteDoctors.slice(0, 3).map((doctor) => (
                                <div key={doctor.id} className="pd-favorite-card">
                                    <img src={doctor.image} alt={doctor.name} />
                                    <div>
                                        <h4>{doctor.name}</h4>
                                        <p className="pd-doctor-specialty">{doctor.specialty}</p>
                                        <p className="pd-doctor-city">
                                            <FiMapPin />
                                            {doctor.city}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="pd-no-favorites">
                            <FiHeart className="pd-no-favorites-icon" size={28} />
                            <p>No favorite doctors yet</p>
                            <span>Save doctors to find them easily later.</span>
                            <Link to="/doctors" className="pd-text-link">
                                Explore Doctors
                            </Link>
                        </div>
                    )}
                </section>

                <footer className="pd-footer">
                    © 2026 MedConnect. All rights reserved.
                </footer>
            </main>
        </div>
    );
}

export default PatientDashboard;

