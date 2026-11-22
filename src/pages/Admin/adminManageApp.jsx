
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

    // Search and Filter
    const filteredAppointments = appointments.filter((appointment) => {

        const patientName = getPatient(appointment.patientId).toLowerCase();
        const doctorName = getDoctor(appointment.doctorId).toLowerCase();
        const searchValue = search.toLowerCase();

        const matchesSearch =
            patientName.includes(searchValue) ||
            doctorName.includes(searchValue);

        const matchesStatus =
            selectedStatus === "All" ||
            appointment.status === selectedStatus;

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

    // Status Style
    const getStatusStyle = (status) => {

        if (status === "pending") {
            return "bg-[#fff4d9] text-[#b78118]";
        }
        else if (status === "confirmed") {
            return "bg-[#e8f7f5] text-[#159b91]";
        }
        else if (status === "completed") {
            return "bg-[#e5f5e9] text-[#26834a]";
        }
        else if (status === "rejected") {
            return "bg-[#fff0f0] text-[#d94b4b]";
        }
        else if (status === "cancelled") {
            return "bg-[#edf0f2] text-[#71838c]";
        }
        else {
            return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <>
            <AdminSidebar />

            <div className="
                min-h-screen
                ml-[260px] w-[calc(100%-260px)]
                p-[35px]
                bg-[#f7fafb]
                box-border

                max-lg:ml-[210px]
                max-lg:w-[calc(100%-210px)]
                max-lg:p-[25px]

                max-sm:ml-0
                max-sm:w-full
                max-sm:p-5
                max-sm:pb-[120px]
            ">

                {/* Header */}
                <div className="mb-[30px]">

                    <h1 className="
                        text-[28px]
                        font-bold
                        text-[#173b4d]
                        mb-2
                        max-sm:text-[23px]
                    ">
                        Manage Appointments
                    </h1>

                    <p className="text-sm text-[#71838c]">
                        View and manage all patient appointments.
                    </p>

                </div>

                {/* Search and Filter */}
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-[15px]
                    mb-5

                    max-sm:flex-col
                    max-sm:items-stretch
                ">

                    {/* Search */}
                    <div className="
                        flex
                        items-center
                        gap-2.5
                        bg-white
                        border border-[#e1e9ec]
                        rounded-[10px]
                        px-[15px]
                        w-[400px]
                        max-w-full
                        box-border

                        max-sm:w-full
                    ">

                        <FiSearch className="text-[#81939b] shrink-0" />

                        <input
                            type="text"
                            placeholder="Search patient or doctor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                                w-full
                                py-[13px]
                                border-none
                                outline-none
                                text-sm
                                bg-transparent
                                text-[#173b4d]
                            "
                        />

                    </div>

                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="
                            py-[13px]
                            px-[15px]
                            border border-[#e1e9ec]
                            rounded-[10px]
                            bg-white
                            text-[#173b4d]
                            outline-none
                            cursor-pointer
                            max-sm:w-full
                        "
                    >
                        <option value="All">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                </div>

                {/* Appointments Count */}
                <div className="mb-5">

                    <p className="text-sm text-[#71838c]">
                        Total Appointments:

                        <strong className="
                            text-[#159b91]
                            ml-[7px]
                            text-[17px]
                        ">
                            {filteredAppointments.length}
                        </strong>
                    </p>

                </div>

                {/* Appointments List */}
                <div className="flex flex-col gap-[15px]">

                    {filteredAppointments.length === 0 ? (

                        <p className="
                            text-center
                            p-10
                            text-[#81939b]
                            bg-white
                            rounded-xl
                            border border-[#e8eff1]
                        ">
                            No appointments found.
                        </p>

                    ) : (

                        filteredAppointments.map((appointment) => (

                            <div
                                key={appointment.id}
                                className="
                                    flex
                                    justify-between
                                    items-center
                                    gap-5
                                    bg-white
                                    p-[22px]
                                    rounded-xl
                                    border border-[#e8eff1]
                                    shadow-[0_3px_12px_rgba(25,60,75,0.05)]
                                    transition-all duration-300

                                    hover:-translate-y-[3px]
                                    hover:shadow-[0_6px_18px_rgba(25,60,75,0.08)]

                                    max-lg:flex-wrap

                                    max-sm:flex-col
                                    max-sm:items-start
                                    max-sm:p-[18px]
                                "
                            >

                                {/* Appointment Information */}
                                <div>

                                    <h3 className="
                                        text-[17px]
                                        font-semibold
                                        text-[#173b4d]
                                        mb-3
                                    ">
                                        {getPatient(appointment.patientId)}
                                    </h3>

                                    <p className="text-[13px] text-[#71838c] my-[7px]">
                                        <strong className="text-[#173b4d] mr-[7px]">
                                            Doctor:
                                        </strong>

                                        {getDoctor(appointment.doctorId)}
                                    </p>

                                    <p className="text-[13px] text-[#71838c] my-[7px]">
                                        <strong className="text-[#173b4d] mr-[7px]">
                                            Date:
                                        </strong>

                                        {formatDate(appointment.date)}
                                    </p>

                                    <p className="text-[13px] text-[#71838c] my-[7px]">
                                        <strong className="text-[#173b4d] mr-[7px]">
                                            Time:
                                        </strong>

                                        {appointment.time || "Not provided"}
                                    </p>

                                </div>

                                {/* Actions */}
                                <div className="
                                    flex
                                    items-center
                                    gap-3

                                    max-sm:w-full
                                    max-sm:justify-between
                                ">

                                    {/* Status */}
                                    <span className={`
                                        px-[13px]
                                        py-[7px]
                                        rounded-full
                                        text-xs
                                        font-semibold
                                        capitalize
                                        whitespace-nowrap
                                        ${getStatusStyle(appointment.status)}
                                    `}>
                                        {appointment.status}
                                    </span>

                                    {/* Cancel Button */}
                                    {(appointment.status === "pending" ||
                                      appointment.status === "confirmed") && (

                                        <button
                                            onClick={() => handleCancel(appointment.id)}
                                            className="
                                                flex
                                                items-center
                                                gap-[7px]
                                                px-[13px]
                                                py-[9px]
                                                rounded-lg
                                                bg-[#fff0f0]
                                                text-[#e05252]
                                                text-[13px]
                                                font-semibold
                                                cursor-pointer
                                                border-none
                                                transition-all duration-300
                                                hover:bg-[#e05252]
                                                hover:text-white
                                            "
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
