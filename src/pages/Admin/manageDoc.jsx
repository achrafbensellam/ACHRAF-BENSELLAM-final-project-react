import './manageDoc.css';

import { useContext, useState } from "react";
import { MyContext } from "../../utils/mycontext";
import AdminSidebar from "../../layouts/adminSidebar";

import {
    FiPlus,
    FiEdit,
    FiTrash2,
    FiX
} from "react-icons/fi";

function ManageDoctors() {

    const { currentUser, doctors, setDoctors } = useContext(MyContext);

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        specialty: "",
        department: "",
        experienceYears: "",
        phone: "",
        city: "",
        price: "",
        image: ""
    });

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    // Check Admin
    if (!currentUser || currentUser.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    // Change input values
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Open Add Form
    const openAddForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            specialty: "",
            department: "",
            experienceYears: "",
            phone: "",
            city: "",
            price: "",
            image: ""
        });

        setEditingId(null);
        setMessage("");
        setShowForm(true);
    };

    // Add or Edit Doctor
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check empty inputs
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.specialty.trim() ||
            !formData.department.trim() ||
            !formData.phone.trim() ||
            !formData.city.trim() ||
            !formData.price ||
            !formData.experienceYears
        ) {
            setMessage("Please fill in all required fields.");
            return;
        }
        // Check Doctor Name
        if (!/^[\p{L}\s.'-]{2,60}$/u.test(formData.name.trim())) {
            setMessage("Please enter a valid doctor name.");
            return;
        }

        // Check Password
        if (formData.password.length < 8) {
            setMessage("Password must be at least 8 characters.");
            return;
        }

        // Check Experience
        const experience = Number(formData.experienceYears);

        if (!Number.isInteger(experience) || experience < 0 || experience > 60) {
            setMessage("Experience must be between 0 and 60 years.");
            return;
        }

        // Check Price
        const price = Number(formData.price);

        if (!Number.isFinite(price) || price <= 0) {
            setMessage("Price must be greater than 0.");
            return;
        }

        // Check Phone
        const phone = formData.phone.replace(/[\s-]/g, "");

        if (!/^(?:\+212|0)[5-7]\d{8}$/.test(phone)) {
            setMessage("Please enter a valid Moroccan phone number.");
            return;
        }

        // Check City
        if (!/^[\p{L}\s'-]+$/u.test(formData.city.trim())) {
            setMessage("City must contain letters only.");
            return;
        }

        // Check Image URL (optional)
        if (formData.image.trim() !== "") {
            try {
                const imageUrl = new URL(formData.image);

                if (imageUrl.protocol !== "https:" && imageUrl.protocol !== "http:") {
                    setMessage("Please enter a valid image URL.");
                    return;
                }
            } catch {
                setMessage("Please enter a valid image URL.");
                return;
            }
        }
        // Check duplicate email
        const emailExists = doctors.find((doctor) => {
            return (
                doctor.email.toLowerCase() === formData.email.trim().toLowerCase() &&
                String(doctor.id) !== String(editingId)
            );
        });

        if (emailExists) {
            setMessage("This email already exists.");
            return;
        }

        if (editingId !== null) {

            // Update Doctor
            const updatedDoctors = doctors.map((doctor) => {
                if (String(doctor.id) === String(editingId)) {
                    return {
                        ...doctor,
                        ...formData,
                        email: formData.email.trim().toLowerCase(),
                        experienceYears: Number(formData.experienceYears),
                        price: Number(formData.price)
                    };
                }

                return doctor;
            });

            setDoctors(updatedDoctors);
            setMessage("Doctor updated successfully!");

        } else {

            // Add New Doctor
            const newDoctor = {
                id: Date.now(),
                ...formData,
                email: formData.email.trim().toLowerCase(),
                experienceYears: Number(formData.experienceYears),
                price: Number(formData.price),
                rating: 0,
                available: true,
                role: "doctor",
                languages: ["Arabic", "French"],
                workingDays: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                workingHours: {
                    start: "09:00",
                    end: "17:00"
                },
                slotDuration: 30,
                daysOff: []
            };

            setDoctors([...doctors, newDoctor]);
            setMessage("Doctor added successfully!");
        }

        // Close form
        setShowForm(false);
        setEditingId(null);
    };

    // Edit Doctor
    const handleEdit = (doctor) => {
        setFormData({
            name: doctor.name || "",
            email: doctor.email || "",
            password: doctor.password || "",
            specialty: doctor.specialty || "",
            department: doctor.department || "",
            experienceYears: doctor.experienceYears || "",
            phone: doctor.phone || "",
            city: doctor.city || "",
            price: doctor.price || "",
            image: doctor.image || ""
        });

        setEditingId(doctor.id);
        setMessage("");
        setShowForm(true);
    };

    // Delete Doctor
    const handleDelete = (doctorId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (confirmDelete) {
            const updatedDoctors = doctors.filter(
                (doctor) => String(doctor.id) !== String(doctorId)
            );

            setDoctors(updatedDoctors);
        }
    };

    // Search Doctors
    const filteredDoctors = doctors.filter((doctor) => {
        return (
            doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
            doctor.city.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <>
            <AdminSidebar />

            <div className="manage-doctors">

                {/* Header */}
                <div className="doctors-header">
                    <div>
                        <h1>Manage Doctors</h1>
                        <p>Manage all doctors in MedConnect.</p>
                    </div>

                    <button
                        className="add-doctor-btn"
                        onClick={openAddForm}
                    >
                        <FiPlus />
                        Add Doctor
                    </button>
                </div>

                {/* Search and Count */}
                <div className="doctors-tools">
                    <input
                        type="text"
                        placeholder="Search by name, specialty or city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <p>Total Doctors: <strong>{doctors.length}</strong></p>
                </div>

                {/* Message */}
                {message && (
                    <p className="doctor-message">{message}</p>
                )}

                {/* Add / Edit Form */}
                {showForm && (
                    <div className="doctor-form-container">

                        <div className="doctor-form-header">
                            <h2>
                                {editingId !== null ? "Edit Doctor" : "Add New Doctor"}
                            </h2>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setMessage("");
                                }}
                            >
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="doctor-form-grid">

                                <div>
                                    <label>Doctor Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Dr. Ahmed"
                                    />
                                </div>

                                <div>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="doctor@example.com"
                                    />
                                </div>

                                <div>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                </div>

                                <div>
                                    <label>Specialty</label>
                                    <input
                                        type="text"
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        placeholder="Cardiology"
                                    />
                                </div>

                                <div>
                                    <label>Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="Heart Center"
                                    />
                                </div>

                                <div>
                                    <label>Experience (Years)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        name="experienceYears"
                                        value={formData.experienceYears}
                                        onChange={handleChange}
                                        placeholder="5"
                                    />
                                </div>

                                <div>
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+212 600000000"
                                    />
                                </div>

                                <div>
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Fes"
                                    />
                                </div>

                                <div>
                                    <label>Consultation Price (MAD)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="300"
                                    />
                                </div>

                                <div>
                                    <label>Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/doctor.jpg"
                                    />
                                </div>

                            </div>

                            <div className="doctor-form-buttons">

                                <button type="submit" className="save-doctor-btn">
                                    {editingId !== null ? "Update Doctor" : "Add Doctor"}
                                </button>

                                <button
                                    type="button"
                                    className="cancel-doctor-btn"
                                    onClick={() => {
                                        setShowForm(false);
                                        setMessage("");
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>
                    </div>
                )}

                {/* Doctors List */}
                <div className="doctors-list">

                    {filteredDoctors.length === 0 ? (

                        <p className="no-doctors">No doctors found.</p>

                    ) : (

                        filteredDoctors.map((doctor) => (

                            <div className="doctor-card" key={doctor.id}>

                                <img
                                    src={doctor.image || "https://via.placeholder.com/100"}
                                    alt={doctor.name}
                                />

                                <div className="doctor-card-info">

                                    <h3>{doctor.name}</h3>

                                    <p className="doctor-specialty">
                                        {doctor.specialty}
                                    </p>

                                    <p>{doctor.department}</p>
                                    <p>{doctor.email}</p>
                                    <p>{doctor.city}</p>

                                    <p className="doctor-price">
                                        {doctor.price} MAD
                                    </p>

                                    <span className={doctor.available ? "doctor-available" : "doctor-unavailable"}>
                                        {doctor.available ? "Available" : "Unavailable"}
                                    </span>

                                </div>

                                <div className="doctor-card-actions">

                                    <button
                                        className="edit-doctor-btn"
                                        onClick={() => handleEdit(doctor)}
                                    >
                                        <FiEdit />
                                        Edit
                                    </button>

                                    <button
                                        className="delete-doctor-btn"
                                        onClick={() => handleDelete(doctor.id)}
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

export default ManageDoctors;
