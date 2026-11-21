import './patienAppointment.css'

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";

import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiXCircle,
    FiCheckCircle,
    FiAlertCircle,
    FiEye
} from "react-icons/fi";
import Sidebar from '../../layouts/sidebar';

function MyAppointments() {

    const {
        appointments,
        setAppointments,
        doctors,
        currentUser
    } = useContext(MyContext);

    const [activeTab, setActiveTab] = useState("All");

    const myAppointments = appointments.filter((appointment) => {
        return String(appointment.patientId) === String(currentUser?.id);
    });

    // Check if an appointment is upcoming
    const isUpcoming = (appointment) => {
        const appointmentDate = new Date(appointment.date + "T" + appointment.time);

        if ( appointmentDate >= new Date() && (appointment.status === "pending" || appointment.status === "confirmed")) {
            return true;
        } else {
            return false;
        }
    };

    // Filter appointments based on the selected tab
    const filteredAppointments = myAppointments.filter((appointment) => {

        if (activeTab === "All") {
            return true;
        }

        if (activeTab === "Upcoming") {
            return isUpcoming(appointment);
        }

        if (activeTab === "Completed") {
            return appointment.status === "completed";
        }

        if (activeTab === "Cancelled") {
            return appointment.status === "cancelled";
        }

        if (activeTab === "Rejected") {
            return appointment.status === "rejected";
        }

        return true;
    });

    // Cancel an appointment
    const cancelAppointment = (appointmentId) => {

        const updatedAppointments = appointments.map((appointment) => {

            if (appointment.id === appointmentId) {
                return {
                    ...appointment,
                    status: "cancelled"
                };
            }

            return appointment;
        });

        setAppointments(updatedAppointments);
    };

    // Format appointment date
    const formatDate = (date) => {
        return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    // User must be logged in
    if (!currentUser) {
        return (
            <div className="appointments-empty">
                <h2>Please log in first</h2>
                <Link to="/login">Go to Login</Link>
            </div>
        );
    }

    return (
        <main className="my-appointments-page">
            <Sidebar />
            <div className="appointments-container">

                <div className="appointments-header">
                    <div>
                        <span className="appointments-label">
                            PATIENT DASHBOARD
                        </span>

                        <h1>My Appointments</h1>

                        <p>
                            Manage and track all your medical appointments.
                        </p>
                    </div>

                    <Link to="/doctors" className="find-doctor-btn">
                        + Find a Doctor
                    </Link>
                </div>

                <div className="appointments-tabs">

                    {["All", "Upcoming", "Completed", "Cancelled", "Rejected"].map((tab) => (
                        <button
                            key={tab}
                            className={activeTab === tab ? "active-tab" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}

                </div>
                <div className="appointments-list">

                    {filteredAppointments.length === 0 ? (

                        <div className="appointments-empty">
                            <FiCalendar />

                            <h2>No Appointments Found</h2>

                            <p>
                                You don't have any appointments in this section.
                            </p>

                            <Link to="/doctors">
                                Find a Doctor
                            </Link>
                        </div>

                    ) : (

                        filteredAppointments.map((appointment) => {
                            const doctor = doctors.find((item) => {
                                return String(item.id) === String(appointment.doctorId);
                            });

                            if (!doctor) {
                                return null;
                            }

                            return (
                                <div className="appointment-card" key={appointment.id}>

                                    <div className="appointment-doctor">

                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                        />

                                        <div>
                                            <h2>{doctor.name}</h2>

                                            <p>{doctor.specialty}</p>

                                            <span>
                                                <FiMapPin />
                                                {doctor.city}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="appointment-information">

                                        <div>
                                            <FiCalendar />
                                            <span>
                                                {formatDate(appointment.date)}
                                            </span>
                                        </div>

                                        <div>
                                            <FiClock />
                                            <span>{appointment.time}</span>
                                        </div>

                                        <div className="appointment-price">
                                            {doctor.price} MAD
                                        </div>

                                    </div>
                                    <div className="appointment-actions">

                                        <span className={`appointment-status ${appointment.status}`}>
                                            {appointment.status}
                                        </span>

                                        <Link
                                            to={`/doctors/${doctor.id}`}
                                            className="view-doctor-btn"
                                        >
                                            <FiEye />
                                            View Doctor
                                        </Link>

                                        {isUpcoming(appointment) && (
                                            <button
                                                className="cancel-appointment-btn"
                                                onClick={() => cancelAppointment(appointment.id)}
                                            >
                                                <FiXCircle />
                                                Cancel
                                            </button>
                                        )}

                                    </div>

                                </div>
                            );
                        })

                    )}

                </div>

            </div>

        </main>
    );
}

export default MyAppointments;
