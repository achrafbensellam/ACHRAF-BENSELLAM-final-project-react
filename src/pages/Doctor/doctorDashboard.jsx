
import './doctorDashboard.css';

import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import DoctorSidebar from "../../layouts/doctorSidebar";

import {
    FiCalendar,
    FiClock,
    FiCheckCircle,
    FiUsers,
    FiArrowRight,
    FiUser
} from "react-icons/fi";

function DoctorDashboard() {

    const { currentUser, appointments,patient } = useContext(MyContext);

    // Check doctor login
    if (!currentUser || currentUser.role !== "doctor") {
        return <h2>Please login as a doctor.</h2>;
    }

    // Get doctor's appointments
    const myAppointments = appointments.filter((app) => {
        return String(app.doctorId) === String(currentUser.id);
    });

    // Get today's date
    const now = new Date();

    const today =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    // Get today's appointments
    const todayAppointments = myAppointments.filter((app) => {
        return app.date === today;
    });

    // Count pending appointments
    const pendingAppointments = myAppointments.filter((app) => {
        return app.status === "pending";
    });

    // Count completed appointments
    const completedAppointments = myAppointments.filter((app) => {
        return app.status === "completed";
    });

    // Get patient information
    const getPatient = (patientId) => {
        return patient.find((patient) => {
            return String(patient.id) === String(patientId);});
    };

    // Get next appointments for today
    const upcomingToday = todayAppointments.filter((app) => {
            return (app.status === "pending" || app.status === "confirmed")}).sort((a, b) => {

    if (a.time < b.time) {
        return -1;
    }
    else if (a.time > b.time) {
        return 1;
    }
    else {
        return 0;
    }

});

    return (

        <div className="doctor-dashboard">

            <DoctorSidebar />

            <main className="doctor-dashboard-main">

                {/* Welcome Header */}
                <div className="doctor-dashboard-header">

                    <div>
                        <p className="doctor-dashboard-greeting">
                            Welcome back,
                        </p>

                        <h1> {currentUser.name}</h1>

                        <p>
                            Here is an overview of your medical activities.
                        </p>
                    </div>

                    <div className="doctor-dashboard-date">
                        <FiCalendar />
                        {now.toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </div>

                </div>


                {/* Statistics */}
                <div className="doctor-dashboard-stats">

                    <div className="doctor-stat-card">
                        <div className="doctor-stat-icon blue">
                            <FiCalendar />
                        </div>

                        <p>Total Appointments</p>
                        <h2>{myAppointments.length}</h2>
                    </div>


                    <div className="doctor-stat-card">
                        <div className="doctor-stat-icon orange">
                            <FiClock />
                        </div>

                        <p>Today's Appointments</p>
                        <h2>{todayAppointments.length}</h2>
                    </div>


                    <div className="doctor-stat-card">
                        <div className="doctor-stat-icon purple">
                            <FiUsers />
                        </div>

                        <p>Pending Requests</p>
                        <h2>{pendingAppointments.length}</h2>
                    </div>


                    <div className="doctor-stat-card">
                        <div className="doctor-stat-icon green">
                            <FiCheckCircle />
                        </div>

                        <p>Completed Appointments</p>
                        <h2>{completedAppointments.length}</h2>
                    </div>

                </div>


                {/* Today's Appointments */}
                <div className="doctor-dashboard-section">

                    <div className="doctor-section-header">

                        <div>
                            <h2>Today's Appointments</h2>
                            <p>Your scheduled patient visits for today.</p>
                        </div>

                        <Link to="/doctor/appointments">
                            View All <FiArrowRight />
                        </Link>

                    </div>


                    <div className="doctor-today-list">

                        {upcomingToday.length > 0 ? (

                            upcomingToday.map((app) => {

                                const patientInfo = getPatient(app.patientId);

                                return (

                                    <div className="doctor-today-card" key={app.id}>

                                        <div className="doctor-today-time">
                                            <FiClock />
                                            {app.time}
                                        </div>

                                        <div className="doctor-today-patient">

                                            <div className="doctor-patient-avatar">
                                                <FiUser />
                                            </div>

                                            <div>
                                                <h3>
                                                    {patientInfo?.name || "Unknown Patient"}
                                                </h3>

                                                <p>
                                                    {patientInfo?.email || "No email available"}
                                                </p>
                                            </div>

                                        </div>

                                        <span className={`doctor-status ${app.status}`}>
                                            {app.status}
                                        </span>

                                    </div>

                                );

                            })

                        ) : (

                            <div className="doctor-no-appointments">
                                <FiCalendar />
                                <h3>No appointments for today</h3>
                                <p>You don't have any scheduled visits today.</p>
                            </div>

                        )}

                    </div>

                </div>


                {/* Bottom Sections */}
                <div className="doctor-dashboard-bottom">

                    {/* Schedule */}
                    <div className="doctor-dashboard-section doctor-schedule">

                        <h2>My Working Schedule</h2>

                        <div className="schedule-info">

                            <div>
                                <FiCalendar />
                                <span>Working Days</span>
                            </div>

                            <p>
                                {currentUser.workingDays?.join(", ") || "Not specified"}
                            </p>

                        </div>


                        <div className="schedule-info">

                            <div>
                                <FiClock />
                                <span>Working Hours</span>
                            </div>

                            <p>
                                {currentUser.workingHours
                                    ? `${currentUser.workingHours.start} - ${currentUser.workingHours.end}`
                                    : "Not specified"}
                            </p>

                        </div>


                        <div className="schedule-info">

                            <div>
                                <FiUsers />
                                <span>Appointment Duration</span>
                            </div>

                            <p>
                                {currentUser.slotDuration || 30} Minutes
                            </p>

                        </div>

                        <Link to="/doctor/schedule" className="doctor-schedule-link">
                            Manage My Schedule <FiArrowRight />
                        </Link>

                    </div>


                    {/* Quick Actions */}
                    <div className="doctor-dashboard-section doctor-quick-actions">

                        <h2>Quick Actions</h2>

                        <Link to="/doctor/appointments">
                            <FiCalendar />
                            <span>Manage Appointments</span>
                            <FiArrowRight />
                        </Link>

                        <Link to="/doctor/patients">
                            <FiUsers />
                            <span>View My Patients</span>
                            <FiArrowRight />
                        </Link>

                        <Link to="/doctor/profile">
                            <FiUser />
                            <span>My Profile</span>
                            <FiArrowRight />
                        </Link>

                    </div>

                </div>

            </main>

        </div>

    );
}

export default DoctorDashboard;
