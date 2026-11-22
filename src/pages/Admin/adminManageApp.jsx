import './adminManageApp.css'

import { useContext, useState } from "react";
import { MyContext } from "../../utils/mycontext";
import AdminSidebar from "../../layouts/adminSidebar";

import {
    FiSearch,
    FiXCircle
} from "react-icons/fi";

function ManageAppointments() {

    const {
        currentUser,
        appointments,
        setAppointments,
        patient,
        doctors
    } = useContext(MyContext);

    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Check Admin
    if (!currentUser || currentUser.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    // Get Patient Name
    const getPatient = (patientId) => {
        const foundPatient = patient.find((p) => {
            return String(p.id) === String(patientId);
        });

        if (foundPatient) {
            return foundPatient.name;
        }

        return "Unknown Patient";
    };

    // Get Doctor Name
    const getDoctor = (doctorId) => {
        const foundDoctor = doctors.find((d) => {
            return String(d.id) === String(doctorId);
        });

        if (foundDoctor) {
            return foundDoctor.name;
        }

        return "Unknown Doctor";
    };

    // Search and Filter Appointments
    const filteredAppointments = appointments.filter((appointment) => {

        const patientName = getPatient(appointment.patientId).toLowerCase();
        const doctorName = getDoctor(appointment.doctorId).toLowerCase();
        const searchValue = search.toLowerCase();

        const matchesSearch =patientName.includes(searchValue) || doctorName.includes(searchValue);

        const matchesStatus = selectedStatus === "All" || appointment.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Cancel Appointment
    const handleCancel = (appointmentId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (confirmCancel) {

            const updatedAppointments = appointments.map((appointment) => {

                if (String(appointment.id) === String(appointmentId)) {
                    return {
                        ...appointment,
                        status: "cancelled"
                    };
                }

                return appointment;
            });

            setAppointments(updatedAppointments);
        }
    };

    // Format Date
    const formatDate = (date) => {
        if (!date) return "No date";

        return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <>
            <AdminSidebar />

            <div className="manage-appointments">

                {/* Header */}
                <div className="appointments-header">
                    <h1>Manage Appointments</h1>
                    <p>View and manage all patient appointments.</p>
                </div>

                {/* Search and Filter */}
                <div className="appointments-tools">

                    <div className="appointment-search">
                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search patient or doctor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                </div>

                {/* Total Appointments */}
                <div className="appointments-count">
                    <p>
                        Total Appointments:
                        <strong>{filteredAppointments.length}</strong>
                    </p>
                </div>

                {/* Appointments List */}
                <div className="appointments-list">

                    {filteredAppointments.length === 0 ? (

                        <p className="no-appointments">
                            No appointments found.
                        </p>

                    ) : (

                        filteredAppointments.map((appointment) => (

                            <div
                                className="appointment-card"
                                key={appointment.id}
                            >

                                <div className="appointment-info">

                                    <h3>
                                        {getPatient(appointment.patientId)}
                                    </h3>

                                    <p>
                                        <strong>Doctor:</strong>
                                        {getDoctor(appointment.doctorId)}
                                    </p>

                                    <p>
                                        <strong>Date:</strong>
                                        {formatDate(appointment.date)}
                                    </p>

                                    <p>
                                        <strong>Time:</strong>
                                        {appointment.time || "Not provided"}
                                    </p>

                                </div>

                                <div className="appointment-actions">

                                    <span className={`appointment-status ${appointment.status}`}>
                                        {appointment.status}
                                    </span>

                                    {(appointment.status === "pending" ||
                                      appointment.status === "confirmed") && (

                                        <button
                                            className="cancel-appointment-btn"
                                            onClick={() => handleCancel(appointment.id)}
                                        >
                                            <FiXCircle />
                                            Cancel
                                        </button>

                                    )}

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>
        </>
    );
}

export default ManageAppointments;