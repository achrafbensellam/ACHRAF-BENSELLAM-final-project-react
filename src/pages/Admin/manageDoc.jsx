
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

        // Check Image URL
        if (formData.image.trim() !== "") {

            try {

                const imageUrl = new URL(formData.image);

                if (
                    imageUrl.protocol !== "https:" &&
                    imageUrl.protocol !== "http:"
                ) {
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

    // Input Style
    const inputStyle = `
        w-full
        p-3
        border border-[#e4ebed]
        rounded-lg
        outline-none
        box-border
        text-sm
        bg-[#f9fbfc]
        text-[#193344]
        transition-all
        focus:border-[#159b91]
        focus:bg-white
    `;

    // Label Style
    const labelStyle = `
        block
        mb-2
        text-[13px]
        font-semibold
        text-[#536c78]
    `;

    return (
        <>
            <AdminSidebar />

            <div className="
                min-h-screen
                ml-[260px]
                w-[calc(100%-260px)]
                px-[4%]
                py-10
                bg-[#f7fafb]
                text-[#193344]
                box-border
                font-[Arial,sans-serif]

                max-lg:ml-[210px]
                max-lg:w-[calc(100%-210px)]
                max-lg:px-5
                max-lg:py-[30px]

                max-sm:ml-0
                max-sm:w-full
                max-sm:px-[15px]
                max-sm:pt-[30px]
                max-sm:pb-[120px]
            ">

                {/* Header */}
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-[15px]
                    mb-[35px]

                    max-sm:flex-col
                    max-sm:items-start
                ">

                    <div>

                        <h1 className="
                            text-[32px]
                            font-bold
                            text-[#173b4d]
                            mb-[10px]

                            max-sm:text-[25px]
                        ">
                            Manage Doctors
                        </h1>

                        <p className="text-sm text-[#71838c]">
                            Manage all doctors in MedConnect.
                        </p>

                    </div>

                    {/* Add Doctor Button */}
                    <button
                        onClick={openAddForm}
                        className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-[13px]
                            bg-[#159b91]
                            text-white
                            rounded-[9px]
                            border-none
                            cursor-pointer
                            text-sm
                            font-semibold
                            transition-all
                            hover:bg-[#117e77]
                        "
                    >
                        <FiPlus />
                        Add Doctor
                    </button>

                </div>

                {/* Search and Count */}
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-[15px]
                    mb-[30px]
                    p-[18px]
                    bg-white
                    rounded-xl
                    shadow-[0_5px_20px_rgba(25,60,75,0.05)]

                    max-sm:flex-col
                    max-sm:items-start
                ">

                    <input
                        type="text"
                        placeholder="Search by name, specialty or city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-[65%]
                            p-[13px_15px]
                            border border-[#e4ebed]
                            rounded-[9px]
                            outline-none
                            text-sm
                            bg-[#f4f8f9]
                            text-[#193344]
                            focus:border-[#159b91]

                            max-sm:w-full
                            max-sm:box-border
                        "
                    />

                    <p className="text-sm text-[#71838c] whitespace-nowrap">
                        Total Doctors:

                        <strong className="text-[#159b91] ml-1">
                            {doctors.length}
                        </strong>
                    </p>

                </div>

                {/* Message */}
                {message && (

                    <p className="
                        p-[13px]
                        mb-5
                        bg-[#f7e8e8]
                        text-[#7e1111]
                        border border-[#c8ece7]
                        rounded-[9px]
                        text-sm
                    ">
                        {message}
                    </p>

                )}

                {/* Add / Edit Form */}
                {showForm && (

                    <div className="
                        bg-white
                        p-[25px]
                        rounded-[14px]
                        mb-[30px]
                        border border-[#eaf0f1]
                        shadow-[0_5px_25px_rgba(25,60,75,0.06)]

                        max-sm:p-[18px]
                    ">

                        {/* Form Header */}
                        <div className="
                            flex
                            justify-between
                            items-center
                            mb-[25px]
                        ">

                            <h2 className="
                                text-[21px]
                                font-bold
                                text-[#173b4d]
                            ">
                                {editingId !== null ? "Edit Doctor" : "Add New Doctor"}
                            </h2>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setMessage("");
                                }}
                                className="
                                    bg-[#ffe4e4]
                                    text-[#b94a4a]
                                    border-none
                                    rounded-[7px]
                                    p-[9px]
                                    cursor-pointer
                                    text-lg
                                    hover:bg-[#ffd1d1]
                                "
                            >
                                <FiX />
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            {/* Form Inputs */}
                            <div className="
                                grid
                                grid-cols-2
                                gap-5

                                max-sm:grid-cols-1
                            ">

                                <div>
                                    <label className={labelStyle}>
                                        Doctor Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Dr. Ahmed"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="doctor@example.com"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Specialty
                                    </label>

                                    <input
                                        type="text"
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        placeholder="Cardiology"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Department
                                    </label>

                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="Heart Center"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Experience (Years)
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        name="experienceYears"
                                        value={formData.experienceYears}
                                        onChange={handleChange}
                                        placeholder="5"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+212 600000000"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Fes"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Consultation Price (MAD)
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="300"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Image URL
                                    </label>

                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/doctor.jpg"
                                        className={inputStyle}
                                    />
                                </div>

                            </div>

                            {/* Form Buttons */}
                            <div className="
                                flex
                                gap-3
                                mt-[25px]

                                max-sm:flex-col
                            ">

                                <button
                                    type="submit"
                                    className="
                                        px-5
                                        py-3
                                        bg-[#159b91]
                                        text-white
                                        rounded-lg
                                        border-none
                                        cursor-pointer
                                        text-sm
                                        font-semibold
                                        transition-all
                                        hover:bg-[#117e77]
                                    "
                                >
                                    {editingId !== null ? "Update Doctor" : "Add Doctor"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setMessage("");
                                    }}
                                    className="
                                        px-5
                                        py-3
                                        bg-[#eaf0f1]
                                        text-[#536c78]
                                        rounded-lg
                                        border-none
                                        cursor-pointer
                                        text-sm
                                        font-semibold
                                        transition-all
                                        hover:bg-[#dce7e9]
                                    "
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}

                {/* Doctors List */}
                <div className="
                    grid
                    grid-cols-1
                    min-[1201px]:grid-cols-2
                    gap-[22px]
                ">

                    {filteredDoctors.length === 0 ? (

                        <p className="
                            col-span-full
                            bg-white
                            p-[45px]
                            text-center
                            text-[#81939b]
                            rounded-xl
                            border border-[#eaf0f1]
                        ">
                            No doctors found.
                        </p>

                    ) : (

                        filteredDoctors.map((doctor) => (

                            <div
                                key={doctor.id}
                                className="
                                    bg-white
                                    border border-[#eaf0f1]
                                    rounded-[14px]
                                    p-5
                                    flex
                                    items-start
                                    gap-[15px]
                                    shadow-[0_5px_20px_rgba(25,60,75,0.05)]
                                    transition-all duration-300
                                    hover:-translate-y-1
                                    hover:shadow-[0_10px_25px_rgba(25,60,75,0.09)]

                                    max-sm:flex-wrap
                                "
                            >

                                {/* Doctor Image */}
                                <img
                                    src={doctor.image || "https://via.placeholder.com/100"}
                                    alt={doctor.name}
                                    className="
                                        w-[75px]
                                        h-[75px]
                                        rounded-full
                                        object-cover
                                        bg-[#e7f3f3]
                                        border-[3px]
                                        border-[#e8f7f5]
                                        shrink-0
                                    "
                                />

                                {/* Doctor Information */}
                                <div className="flex-1 min-w-0">

                                    <h3 className="
                                        text-base
                                        font-bold
                                        text-[#173b4d]
                                        mb-2
                                    ">
                                        {doctor.name}
                                    </h3>

                                    <p className="
                                        inline-block
                                        px-[10px]
                                        py-[6px]
                                        rounded-md
                                        bg-[#e8f7f5]
                                        text-[#159b91]
                                        text-xs
                                        font-semibold
                                        mb-2
                                    ">
                                        {doctor.specialty}
                                    </p>

                                    <p className="
                                        text-xs
                                        text-[#81939b]
                                        mb-[7px]
                                        break-words
                                    ">
                                        {doctor.department}
                                    </p>

                                    <p className="
                                        text-xs
                                        text-[#81939b]
                                        mb-[7px]
                                        break-words
                                    ">
                                        {doctor.email}
                                    </p>

                                    <p className="
                                        text-xs
                                        text-[#81939b]
                                        mb-[7px]
                                    ">
                                        {doctor.city}
                                    </p>

                                    <p className="
                                        text-[15px]
                                        font-bold
                                        text-[#159b91]
                                        mt-[10px]
                                    ">
                                        {doctor.price} MAD
                                    </p>

                                    {/* Availability */}
                                    <span className={`
                                        inline-block
                                        px-[10px]
                                        py-[6px]
                                        rounded-full
                                        text-[11px]
                                        font-semibold
                                        mt-[5px]

                                        ${doctor.available
                                            ? "bg-[#d9f8eb] text-[#087e61]"
                                            : "bg-[#ffe4e4] text-[#b94a4a]"
                                        }
                                    `}>
                                        {doctor.available ? "Available" : "Unavailable"}
                                    </span>

                                </div>

                                {/* Card Actions */}
                                <div className="
                                    flex
                                    flex-col
                                    gap-2

                                    max-sm:w-full
                                    max-sm:flex-row
                                ">

                                    {/* Edit */}
                                    <button
                                        onClick={() => handleEdit(doctor)}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-[6px]
                                            px-[11px]
                                            py-[9px]
                                            bg-[#e8f7f5]
                                            text-[#159b91]
                                            rounded-[7px]
                                            border-none
                                            cursor-pointer
                                            text-xs
                                            font-semibold
                                            transition-all
                                            hover:bg-[#cceee9]

                                            max-sm:flex-1
                                        "
                                    >
                                        <FiEdit />
                                        Edit
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(doctor.id)}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-[6px]
                                            px-[11px]
                                            py-[9px]
                                            bg-[#ffe4e4]
                                            text-[#b94a4a]
                                            rounded-[7px]
                                            border-none
                                            cursor-pointer
                                            text-xs
                                            font-semibold
                                            transition-all
                                            hover:bg-[#ffd1d1]

                                            max-sm:flex-1
                                        "
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
