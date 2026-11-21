
import './doctorAppointment.css';

import { useContext, useState } from "react";
import { MyContext } from "../../utils/mycontext";
import DoctorSidebar from "../../layouts/doctorSidebar";

import {
    FiCalendar,
    FiClock,
    FiUser,
    FiCheck,
    FiX,
    FiCheckCircle
} from "react-icons/fi";

function DoctorAppointments() {

    const {
        currentUser,
        appointments,
        setAppointments,
        patient
    } = useContext(MyContext);

    const [activeTab, setActiveTab] = useState("All");

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [rejectReason, setRejectReason] = useState("");
    const [rejectError, setRejectError] = useState("");

    // Check doctor login
    if (!currentUser || currentUser.role !== "doctor") {
        return <h2>Please login as a doctor.</h2>;
    }

    // Get appointments of the current doctor
    const myAppointments = appointments.filter((app) => {
        return String(app.doctorId) === String(currentUser.id);
    });

    // Get patient information
    const getPatient = (patientId) => {
        return patient.find((item) => {
            return String(item.id) === String(patientId);
        });
    };

    // Filter appointments
    const filteredAppointments = myAppointments.filter((app) => {

        if (activeTab === "All") {
            return true;
        } else {
            return app.status === activeTab.toLowerCase();
        }

    });

    // Count appointments
    const pendingCount = myAppointments.filter(
        (app) => app.status === "pending"
    ).length;

    const confirmedCount = myAppointments.filter(
        (app) => app.status === "confirmed"
    ).length;

    const completedCount = myAppointments.filter(
        (app) => app.status === "completed"
    ).length;

    const cancelledCount = myAppointments.filter(
        (app) => app.status === "cancelled"
    ).length;

    // Update appointment status
    const updateStatus = (appointmentId, newStatus) => {

        const updatedAppointments = appointments.map((app) => {

            if (
                String(app.id) === String(appointmentId) &&
                String(app.doctorId) === String(currentUser.id)
            ) {
                return {
                    ...app,
                    status: newStatus
                };
            }

            return app;
        });

        setAppointments(updatedAppointments);
    };

    // Open Reject Modal
    const openRejectModal = (appointmentId) => {
        setSelectedAppointment(appointmentId);
        setRejectReason("");
        setRejectError("");
        setShowRejectModal(true);
    };

    // Close Reject Modal
    const closeRejectModal = () => {
        setShowRejectModal(false);
        setSelectedAppointment(null);
        setRejectReason("");
        setRejectError("");
    };

    // Reject Appointment
    const rejectAppointment = () => {

        if (rejectReason.trim().length < 30) {
            setRejectError("Please enter at least 30 characters.");
            return;
        }

        const updatedAppointments = appointments.map((app) => {

            if (
                String(app.id) === String(selectedAppointment) &&
                String(app.doctorId) === String(currentUser.id) &&
                app.status === "pending"
            ) {
                return {
                    ...app,
                    status: "rejected",
                    rejectReason: rejectReason.trim()
                };
            }

            return app;
        });

        setAppointments(updatedAppointments);
        closeRejectModal();
    };

    return (

        <div className="doctor-appointments-layout">

            <DoctorSidebar />

            <main className="doctor-appointments-page">

                {/* Page Header */}
                <div className="appointments-header">
                    <div>
                        <h1>My Appointments</h1>
                        <p>Manage your patient appointments</p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="appointments-stats">

                    <div className="appointment-stat">
                        <div className="stat-icon total-icon">
                            <FiCalendar />
                        </div>
                        <div>
                            <h3>{myAppointments.length}</h3>
                            <p>Total Appointments</p>
                        </div>
                    </div>

                    <div className="appointment-stat">
                        <div className="stat-icon pending-icon">
                            <FiClock />
                        </div>
                        <div>
                            <h3>{pendingCount}</h3>
                            <p>Pending Requests</p>
                        </div>
                    </div>

                    <div className="appointment-stat">
                        <div className="stat-icon confirmed-icon">
                            <FiCheck />
                        </div>
                        <div>
                            <h3>{confirmedCount}</h3>
                            <p>Confirmed</p>
                        </div>
                    </div>

                    <div className="appointment-stat">
                        <div className="stat-icon completed-icon">
                            <FiCheckCircle />
                        </div>
                        <div>
                            <h3>{completedCount}</h3>
                            <p>Completed</p>
                        </div>
                    </div>

                    <div className="appointment-stat">
                        <div className="stat-icon cancelled-icon">
                            <FiX />
                        </div>
                        <div>
                            <h3>{cancelledCount}</h3>
                            <p>Cancelled</p>
                        </div>
                    </div>

                </div>

                {/* Filter Tabs */}
                <div className="appointments-tabs">

                    {[
                        "All",
                        "Pending",
                        "Confirmed",
                        "Completed",
                        "Rejected",
                        "Cancelled"
                    ].map((tab) => (

                        <button
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>

                    ))}

                </div>

                {/* Appointments List */}
                <div className="doctor-appointments-list">

                    {/* Reject Modal */}
                    {showRejectModal && (

                        <div className="reject-modal-overlay">

                            <div className="reject-modal">

                                <div className="reject-modal-header">
                                    <h2>Reject Appointment</h2>

                                    <button onClick={closeRejectModal}>
                                        <FiX />
                                    </button>
                                </div>

                                <p>
                                    Please provide a reason for rejecting this appointment.
                                </p>

                                <textarea
                                    placeholder="Write the rejection reason..."
                                    value={rejectReason}
                                    onChange={(e) => {
                                        setRejectReason(e.target.value);
                                        setRejectError("");
                                    }}
                                />

                                <div className="reject-character-count">
                                    {rejectReason.trim().length}/30 characters
                                </div>

                                {rejectError && (
                                    <p className="reject-error">
                                        {rejectError}
                                    </p>
                                )}

                                <div className="reject-modal-actions">

                                    <button
                                        className="cancel-modal-btn"
                                        onClick={closeRejectModal}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="confirm-reject-btn"
                                        onClick={rejectAppointment}
                                        disabled={rejectReason.trim().length < 30}
                                    >
                                        Reject Appointment
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* Empty State */}
                    {filteredAppointments.length === 0 ? (

                        <div className="appointments-empty">
                            <FiCalendar />
                            <h3>No appointments found</h3>
                            <p>
                                You don't have any appointments in this category.
                            </p>
                        </div>

                    ) : (

                        filteredAppointments.map((app) => {

                            const patientInfo = getPatient(app.patientId);

                            return (

                                <div
                                    className="doctor-appointment-card"
                                    key={app.id}
                                >

                                    {/* Patient Information */}
                                    <div className="appointment-patient">

                                        <div className="patient-avatar">

                                            {patientInfo?.image ? (
                                                <img
                                                    src={patientInfo.image}
                                                    alt={patientInfo.name}
                                                />
                                            ) : (
                                                <FiUser />
                                            )}

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

                                    {/* Appointment Information */}
                                    <div className="appointment-information">

                                        <p>
                                            <FiCalendar />
                                            {app.date}
                                        </p>

                                        <p>
                                            <FiClock />
                                            {app.time}
                                        </p>

                                    </div>

                                    {/* Status and Reasons */}
                                    <div className="appointment-status">

                                        <span className={`status-badge ${app.status}`}>
                                            {app.status}
                                        </span>

                                        {app.rejectReason && (
                                            <p className="appointment-reason">
                                                <strong>Rejection Reason:</strong>
                                                {app.rejectReason}
                                            </p>
                                        )}

                                        {app.status === "cancelled" && app.cancelReason && (
                                            <p className="appointment-reason">
                                                <strong>Cancellation Reason:</strong>
                                                {app.cancelReason}
                                            </p>
                                        )}

                                    </div>

                                    {/* Actions */}
                                    <div className="appointment-actions">

                                        {app.status === "pending" && (
                                            <>
                                                <button
                                                    className="confirm-btn"
                                                    onClick={() => updateStatus(app.id, "confirmed")}
                                                >
                                                    <FiCheck />
                                                    Confirm
                                                </button>

                                                <button
                                                    className="reject-btn"
                                                    onClick={() => openRejectModal(app.id)}
                                                >
                                                    <FiX />
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {app.status === "confirmed" && (
                                            <button
                                                className="complete-btn"
                                                onClick={() => updateStatus(app.id, "completed")}
                                            >
                                                <FiCheckCircle />
                                                Complete
                                            </button>
                                        )}

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>

            </main>

        </div>

    );
}

export default DoctorAppointments;
