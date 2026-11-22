import './adminDashboard.css';

import "./adminDashboard.css";
import { useContext } from "react";
import { MyContext } from "../../utils/mycontext";

import {
    FiUsers,
    FiUser,
    FiCalendar,
    FiClock
} from "react-icons/fi";
import AdminSidebar from '../../layouts/adminSidebar';

function AdminDashboard() {

    const {
        currentUser,
        doctors,
        patient,
        appointments
    } = useContext(MyContext);

    // Check Admin
    if (!currentUser || currentUser.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    // Statistics
    const totalDoctors = doctors.length;
    const totalPatients = patient.length;
    const totalAppointments = appointments.length;

    const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending").length;

    // Get Patient Name
    const getPatientName = (patientId) => {
        const foundPatient = patient.find(
            (item) => String(item.id) === String(patientId)
        );

        if (foundPatient) {
            return foundPatient.name;
        } else {
            return "Unknown Patient";
        }
    };

    // Get Doctor Name
    const getDoctorName = (doctorId) => {
        const foundDoctor = doctors.find(
            (item) => String(item.id) === String(doctorId)
        );

        if (foundDoctor) {
            return foundDoctor.name;
        } else {
            return "Unknown Doctor";
        }
    };

    // Last 5 Appointments
    const recentAppointments = appointments.slice(-5).reverse();

    return (
        <>
        <AdminSidebar/>
        <div className="admin-dashboard">

            {/* Header */}
            <div className="admin-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome back, {currentUser.name}!</p>
                </div>
            </div>

            {/* Statistics */}
            <div className="admin-stats">

                <div className="admin-stat-card">
                    <div className="admin-stat-icon blue">
                        <FiUsers />
                    </div>
                    <div>
                        <p>Total Doctors</p>
                        <h2>{totalDoctors}</h2>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon green">
                        <FiUser />
                    </div>
                    <div>
                        <p>Total Patients</p>
                        <h2>{totalPatients}</h2>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon purple">
                        <FiCalendar />
                    </div>
                    <div>
                        <p>Total Appointments</p>
                        <h2>{totalAppointments}</h2>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon orange">
                        <FiClock />
                    </div>
                    <div>
                        <p>Pending Appointments</p>
                        <h2>{pendingAppointments}</h2>
                    </div>
                </div>

            </div>

            {/* Recent Appointments */}
            <div className="admin-recent">

                <div className="admin-section-header">
                    <h2>Recent Appointments</h2>
                    <span>{appointments.length} Appointments</span>
                </div>

                {recentAppointments.length === 0 ? (

                    <p className="admin-empty">
                        No appointments found.
                    </p>

                ) : (

                    <div className="admin-table-container">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentAppointments.map((appointment) => (

                                    <tr key={appointment.id}>

                                        <td>
                                            {getPatientName(appointment.patientId)}
                                        </td>

                                        <td>
                                            {getDoctorName(appointment.doctorId)}
                                        </td>

                                        <td>{appointment.date}</td>

                                        <td>{appointment.time}</td>

                                        <td>
                                            <span className={`admin-status ${appointment.status}`}>
                                                {appointment.status}
                                            </span>
                                        </td>

                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
        </>
    );

}

export default AdminDashboard;
