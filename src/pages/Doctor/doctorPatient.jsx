import './doctorPatient.css';

import { useContext } from "react";
import { MyContext } from "../../utils/mycontext";
import DoctorSidebar from "../../layouts/doctorSidebar";

import {
    FiUsers,
    FiUser,
    FiMail,
    FiPhone,
    FiCalendar
} from "react-icons/fi";

function MyPatients() {

    const {
        currentUser,
        appointments,
        patient
    } = useContext(MyContext);

    // Check doctor login
    if (!currentUser || currentUser.role !== "doctor") {
        return <h2>Please login as a doctor.</h2>;
    }

    // Get appointments of the current doctor
    const myAppointments = appointments.filter((app) => {
        return String(app.doctorId) === String(currentUser.id);
    });

    // Get only patients who have appointments with this doctor
    const myPatients = patient.filter((patientInfo) => {

        return myAppointments.find((app) => {
            return String(app.patientId) === String(patientInfo.id);
        });

    });

    return (

        <div className="my-patients-layout">

            <DoctorSidebar />

            <main className="my-patients-page">

                {/* Page Header */}
                <div className="patients-header">
                    <div>
                        <h1>My Patients</h1>
                        <p>Manage and view your patients</p>
                    </div>
                </div>

                {/* Patients Statistics */}
                <div className="patients-stats">

                    <div className="patients-stat-card">

                        <div className="patients-stat-icon">
                            <FiUsers />
                        </div>

                        <div>
                            <h3>{myPatients.length}</h3>
                            <p>Total Patients</p>
                        </div>

                    </div>

                    <div className="patients-stat-card">

                        <div className="patients-stat-icon">
                            <FiCalendar />
                        </div>

                        <div>
                            <h3>{myAppointments.length}</h3>
                            <p>Total Appointments</p>
                        </div>

                    </div>

                </div>

                {/* Patients Section */}
                <div className="patients-section">

                    <div className="patients-section-header">
                        <h2>Patient List</h2>
                        <span>{myPatients.length} Patients</span>
                    </div>

                    {myPatients.length === 0 ? (

                        <div className="patients-empty">

                            <FiUsers />

                            <h3>No Patients Yet</h3>

                            <p>
                                You don't have any patients with appointments yet.
                            </p>

                        </div>

                    ) : (

                        <div className="patients-grid">

                            {myPatients.map((patientInfo) => {

                                // Get this patient's appointments
                                const patientAppointments = myAppointments.filter((app) => {
                                    return String(app.patientId) === String(patientInfo.id);
                                });

                                // Get latest appointment
                                const latestAppointment = [...patientAppointments].sort(
                                    (a, b) => {
                                        const dateA = new Date(a.date + "T" + a.time);
                                        const dateB = new Date(b.date + "T" + b.time);

                                        return dateB - dateA;
                                    }
                                )[0];

                                return (

                                    <div
                                        className="patient-card"
                                        key={patientInfo.id}
                                    >

                                        {/* Patient Header */}
                                        <div className="patient-card-header">

                                            <div className="my-patient-avatar">

                                                {patientInfo.image ? (
                                                    <img
                                                        src={patientInfo.image}
                                                        alt={patientInfo.name}
                                                    />
                                                ) : (
                                                    <FiUser />
                                                )}

                                            </div>

                                            <div>
                                                <h3>{patientInfo.name}</h3>
                                                <span>Patient</span>
                                            </div>

                                        </div>

                                        {/* Patient Information */}
                                        <div className="patient-card-info">

                                            <p>
                                                <FiMail />
                                                {patientInfo.email || "No email available"}
                                            </p>

                                            <p>
                                                <FiPhone />
                                                {patientInfo.phone || "No phone available"}
                                            </p>

                                        </div>

                                        {/* Appointment Information */}
                                        <div className="patient-card-appointments">

                                            <div>
                                                <span>Total Appointments</span>
                                                <strong>{patientAppointments.length}</strong>
                                            </div>

                                            <div>
                                                <span>Last Appointment</span>
                                                <strong>{latestAppointment.date}</strong>
                                            </div>

                                        </div>

                                        {/* Latest Appointment Status */}
                                        <div className="patient-card-footer">

                                            <span>Last Appointment Status</span>

                                            <span className={`patient-status ${latestAppointment.status}`}>
                                                {latestAppointment.status}
                                            </span>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>

            </main>

        </div>

    );
}

export default MyPatients;
