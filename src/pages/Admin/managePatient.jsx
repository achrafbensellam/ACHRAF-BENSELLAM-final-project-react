import './managePatient.css';
import { useContext, useState } from "react";
import { MyContext } from "../../utils/mycontext";
import AdminSidebar from "../../layouts/adminSidebar";

import {
    FiSearch,
    FiTrash2,
    FiEye,
    FiX
} from "react-icons/fi";

function ManagePatients() {

    const { currentUser, patient, setPatient } = useContext(MyContext);

    const [search, setSearch] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Check Admin
    if (!currentUser || currentUser.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    // Search Patients
    const filteredPatients = patient.filter((patientInfo) => {
        const name = patientInfo.name || "";
        const email = patientInfo.email || "";
        const city = patientInfo.city || "";

        return (
            name.toLowerCase().includes(search.toLowerCase()) ||
            email.toLowerCase().includes(search.toLowerCase()) ||
            city.toLowerCase().includes(search.toLowerCase())
        );
    });

    // Delete Patient
    const handleDelete = (patientId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (confirmDelete) {
            const updatedPatients = patient.filter((patientInfo) => {
                return String(patientInfo.id) !== String(patientId);
            });

            setPatient(updatedPatients);

            // Close details if the deleted patient is selected
            if (selectedPatient && String(selectedPatient.id) === String(patientId)) {
                setSelectedPatient(null);
            }
        }
    };

    // Show Patient Details
    const handleView = (patientInfo) => {
        setSelectedPatient(patientInfo);
    };

    return (
        <>
            <AdminSidebar />

            <div className="manage-patients">

                {/* Header */}
                <div className="patients-header">
                    <div>
                        <h1>Manage Patients</h1>
                        <p>View and manage all registered patients.</p>
                    </div>
                </div>

                {/* Search and Count */}
                <div className="patients-tools">

                    <div className="patients-search">
                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search by name, email or city..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <p>
                        Total Patients:
                        <strong>{patient.length}</strong>
                    </p>

                </div>

                {/* Patient Details */}
                {selectedPatient && (
                    <div className="patient-details">

                        <div className="patient-details-header">
                            <h2>Patient Details</h2>

                            <button
                                onClick={() => setSelectedPatient(null)}
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="patient-details-info">

                            <p>
                                <strong>Name:</strong>
                                {selectedPatient.name || "Not provided"}
                            </p>

                            <p>
                                <strong>Email:</strong>
                                {selectedPatient.email || "Not provided"}
                            </p>

                            <p>
                                <strong>Phone:</strong>
                                {selectedPatient.phone || "Not provided"}
                            </p>

                            <p>
                                <strong>City:</strong>
                                {selectedPatient.city || "Not provided"}
                            </p>

                            <p>
                                <strong>Gender:</strong>
                                {selectedPatient.gender || "Not provided"}
                            </p>

                            <p>
                                <strong>Age:</strong>
                                {selectedPatient.age || "Not provided"}
                            </p>

                        </div>

                    </div>
                )}

                {/* Patients List */}
                <div className="patients-list">

                    {filteredPatients.length === 0 ? (

                        <p className="no-patients">
                            No patients found.
                        </p>

                    ) : (

                        filteredPatients.map((patientInfo) => (

                            <div className="patient-card" key={patientInfo.id}>

                                <img
                                    src={
                                        patientInfo.image ||
                                        "https://via.placeholder.com/100"
                                    }
                                    alt={patientInfo.name || "Patient"}
                                />

                                <div className="patient-card-info">

                                    <h3>
                                        {patientInfo.name || "Unnamed Patient"}
                                    </h3>

                                    <p>{patientInfo.email}</p>

                                    <p>{patientInfo.phone || "No phone number"}</p>

                                    <p>{patientInfo.city || "City not provided"}</p>

                                </div>

                                <div className="patient-card-actions">

                                    <button
                                        className="view-patient-btn"
                                        onClick={() => handleView(patientInfo)}
                                    >
                                        <FiEye />
                                        View
                                    </button>

                                    <button
                                        className="delete-patient-btn"
                                        onClick={() => handleDelete(patientInfo.id)}
                                    >
                                        <FiTrash2 />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>
        </>
    );
}

export default ManagePatients;