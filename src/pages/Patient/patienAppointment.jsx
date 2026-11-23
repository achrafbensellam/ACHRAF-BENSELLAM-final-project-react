
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";

import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiXCircle,
    FiAlertCircle,
    FiEye
} from "react-icons/fi";

import Sidebar from "../../layouts/sidebar";

function MyAppointments() {

    const {
        appointments,
        setAppointments,
        doctors,
        currentUser
    } = useContext(MyContext);

    const [activeTab, setActiveTab] = useState("All");

    // Get current patient's appointments
    const myAppointments = appointments.filter((appointment) => {
        return String(appointment.patientId) === String(currentUser?.id);
    });

    // Check if appointment is upcoming
    const isUpcoming = (appointment) => {

        const appointmentDate = new Date(
            appointment.date + "T" + appointment.time
        );

        return (
            appointmentDate >= new Date() &&
            (appointment.status === "pending" ||
                appointment.status === "confirmed")
        );
    };

    // Filter appointments
    const filteredAppointments = myAppointments.filter((appointment) => {

        if (activeTab === "All") return true;

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

    // Cancel appointment
    const cancelAppointment = (appointmentId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmCancel) return;

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
    };

    // Format date
    const formatDate = (date) => {

        if (!date) return "Date not available";

        return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    // Status colors
    const getStatusStyle = (status) => {

        if (status === "pending") {
            return "bg-[#fff4dc] text-[#b47a15]";
        } else if (status === "confirmed") {
            return "bg-[#e1f5f1] text-[#159b91]";
        } else if (status === "completed") {
            return "bg-[#e5edff] text-[#4267b2]";
        } else if (status === "cancelled") {
            return "bg-[#ffe9e9] text-[#d64c4c]";
        } else if (status === "rejected") {
            return "bg-[#f2e8f9] text-[#9254a5]";
        }

        return "bg-gray-100 text-gray-600";
    };

    // Login protection
    if (!currentUser) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f4f8f9] p-4">

                <div className="w-full max-w-md bg-white rounded-2xl p-8 text-center shadow-sm">

                    <FiAlertCircle className="text-[#159b91] text-5xl mx-auto mb-4" />

                    <h2 className="text-[#173b4d] text-xl font-bold mb-3">
                        Please log in first
                    </h2>

                    <Link
                        to="/login"
                        className="inline-block bg-[#159b91] hover:bg-[#117d75] text-white px-6 py-3 rounded-lg transition"
                    >
                        Go to Login
                    </Link>

                </div>

            </div>
        );
    }

    return (

        <main className="
            min-h-screen
            ml-[260px]
            w-[calc(100%-260px)]
            box-border
            bg-[#f4f8f9]
            px-[4%]
            py-10
            font-sans
            overflow-x-hidden

            max-[1024px]:ml-[210px]
            max-[1024px]:w-[calc(100%-210px)]
            max-[1024px]:px-5
            max-[1024px]:py-[30px]

            max-[640px]:ml-0
            max-[640px]:w-full
            max-[640px]:px-3
            max-[640px]:pt-6
            max-[640px]:pb-[120px]
        ">

            <Sidebar />

            <div className="w-full max-w-[1200px] mx-auto min-w-0">

                {/* HEADER */}
                <div className="
                    flex justify-between items-center
                    gap-5 mb-[35px]

                    max-[640px]:flex-col
                    max-[640px]:items-stretch
                    max-[640px]:gap-4
                    max-[640px]:mb-6
                ">

                    <div className="min-w-0">

                        <span className="text-[#159b91] text-xs font-bold tracking-[2px]">
                            PATIENT DASHBOARD
                        </span>

                        <h1 className="
                            text-[#173b4d]
                            text-[32px]
                            font-bold
                            mt-2 mb-[10px]

                            max-[640px]:text-[26px]
                        ">
                            My Appointments
                        </h1>

                        <p className="text-[#82929a] text-[15px]">
                            Manage and track all your medical appointments.
                        </p>

                    </div>

                    <Link
                        to="/doctors"
                        className="
                            flex items-center justify-center
                            bg-[#159b91]
                            hover:bg-[#117d75]
                            text-white
                            px-5 py-[13px]
                            rounded-[9px]
                            font-bold
                            transition
                            whitespace-nowrap
                            shrink-0

                            max-[640px]:w-full
                            max-[640px]:box-border
                        "
                    >
                        + Find a Doctor
                    </Link>

                </div>

                {/* TABS */}
                <div className="
                    flex flex-wrap gap-3
                    mb-[25px]
                    pb-[15px]
                    border-b border-[#e1e9eb]

                    max-[640px]:flex-nowrap
                    max-[640px]:overflow-x-auto
                    max-[640px]:overflow-y-hidden
                    max-[640px]:gap-2
                    max-[640px]:pb-3
                ">

                    {["All", "Upcoming", "Completed", "Cancelled", "Rejected"].map((tab) => (

                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                px-5 py-[11px]
                                rounded-lg
                                text-sm
                                font-medium
                                whitespace-nowrap
                                shrink-0
                                border-none
                                cursor-pointer
                                transition

                                max-[640px]:px-[14px]
                                max-[640px]:py-[10px]
                                max-[640px]:text-xs

                                ${activeTab === tab
                                    ? "bg-[#159b91] text-white"
                                    : "bg-white text-[#71838c] hover:text-[#159b91] hover:bg-[#e9f6f4]"
                                }
                            `}
                        >
                            {tab}
                        </button>

                    ))}

                </div>

                {/* APPOINTMENTS LIST */}
                <div className="flex flex-col gap-[18px] min-w-0">

                    {filteredAppointments.length === 0 ? (

                        /* EMPTY STATE */
                        <div className="
                            bg-white
                            p-[55px_20px]
                            rounded-[15px]
                            text-center
                            text-[#82929a]
                            shadow-sm
                        ">

                            <FiCalendar className="text-[45px] text-[#159b91] mx-auto mb-[15px]" />

                            <h2 className="text-[#173b4d] mb-[10px] text-[21px] font-bold">
                                No Appointments Found
                            </h2>

                            <p className="text-sm mb-5">
                                You don't have any appointments in this section.
                            </p>

                            <Link
                                to="/doctors"
                                className="inline-block bg-[#159b91] hover:bg-[#117d75] text-white px-5 py-[11px] rounded-lg transition"
                            >
                                Find a Doctor
                            </Link>

                        </div>

                    ) : (

                        filteredAppointments.map((appointment) => {

                            const doctor = doctors.find((item) => {
                                return String(item.id) === String(appointment.doctorId);
                            });

                            if (!doctor) return null;

                            return (

                                <div
                                    key={appointment.id}
                                    className="
                                        w-full
                                        min-w-0
                                        box-border
                                        bg-white
                                        p-[22px]
                                        rounded-[15px]
                                        grid
                                        grid-cols-[minmax(0,1.2fr)_minmax(0,1.3fr)_minmax(0,0.9fr)]
                                        items-center
                                        gap-5
                                        border border-[#e8eff0]
                                        shadow-[0_4px_15px_rgba(0,0,0,0.03)]
                                        transition
                                        hover:-translate-y-[2px]
                                        hover:shadow-[0_8px_22px_rgba(0,0,0,0.07)]

                                        max-[1024px]:grid-cols-2

                                        max-[640px]:grid-cols-1
                                        max-[640px]:gap-4
                                        max-[640px]:p-4
                                    "
                                >

                                    {/* DOCTOR */}
                                    <div className="flex items-center gap-3 min-w-0">

                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="
                                                w-[65px] h-[65px]
                                                sm:w-[75px] sm:h-[75px]
                                                object-cover
                                                rounded-xl
                                                shrink-0
                                            "
                                        />

                                        <div className="min-w-0">

                                            <h2 className="text-base text-[#173b4d] font-bold mb-[7px] break-words">
                                                {doctor.name}
                                            </h2>

                                            <p className="text-[#159b91] text-[13px] mb-[7px] break-words">
                                                {doctor.specialty}
                                            </p>

                                            <span className="flex items-center gap-[5px] text-[#8a999f] text-xs min-w-0">
                                                <FiMapPin className="shrink-0" />
                                                <span className="break-words">
                                                    {doctor.city}
                                                </span>
                                            </span>

                                        </div>

                                    </div>

                                    {/* APPOINTMENT INFORMATION */}
                                    <div className="
                                        flex flex-col gap-3
                                        min-w-0

                                        max-[640px]:py-4
                                        max-[640px]:border-t
                                        max-[640px]:border-b
                                        max-[640px]:border-[#edf1f2]
                                    ">

                                        <div className="flex items-start gap-2 text-[#657982] text-[13px] min-w-0">

                                            <FiCalendar className="text-[#159b91] text-[17px] shrink-0 mt-[2px]" />

                                            <span className="break-words">
                                                {formatDate(appointment.date)}
                                            </span>

                                        </div>

                                        <div className="flex items-center gap-2 text-[#657982] text-[13px]">

                                            <FiClock className="text-[#159b91] text-[17px] shrink-0" />

                                            <span>{appointment.time}</span>

                                        </div>

                                        <div className="text-[#173b4d] font-bold text-[15px]">
                                            {doctor.price} MAD
                                        </div>

                                    </div>

                                    {/* ACTIONS */}
                                    <div className="
                                        flex flex-col items-start gap-[10px]
                                        min-w-0

                                        max-[1024px]:col-span-2
                                        max-[1024px]:flex-row
                                        max-[1024px]:flex-wrap
                                        max-[1024px]:items-center

                                        max-[640px]:col-span-1
                                        max-[640px]:flex-col
                                        max-[640px]:items-stretch
                                    ">

                                        {/* STATUS */}
                                        <span className={`
                                            inline-flex
                                            items-center
                                            w-fit
                                            px-3 py-[6px]
                                            rounded-full
                                            text-xs
                                            font-bold
                                            capitalize
                                            whitespace-nowrap
                                            ${getStatusStyle(appointment.status)}
                                        `}>
                                            {appointment.status}
                                        </span>

                                        {/* REJECT REASON */}
                                        {appointment.status === "rejected" && appointment.rejectReason && (

                                            <div className="
                                                w-full
                                                min-w-0
                                                box-border
                                                flex items-start gap-2
                                                p-3
                                                bg-[#fff1f1]
                                                border border-[#ffd5d5]
                                                rounded-lg
                                                text-[#d34b4b]

                                                max-[1024px]:flex-1
                                                max-[1024px]:min-w-[200px]
                                                max-[640px]:min-w-0
                                            ">

                                                <FiAlertCircle className="shrink-0 mt-[2px] text-lg" />

                                                <div className="min-w-0">

                                                    <strong className="block text-[13px] mb-[5px]">
                                                        Rejected Reason
                                                    </strong>

                                                    <p className="text-[13px] leading-[1.5] break-words">
                                                        {appointment.rejectReason}
                                                    </p>

                                                </div>

                                            </div>

                                        )}

                                        {/* VIEW DOCTOR */}
                                        <Link
                                            to={`/doctors/${doctor.id}`}
                                            className="
                                                w-fit
                                                flex items-center justify-center gap-[7px]
                                                px-3 py-2
                                                rounded-[7px]
                                                text-xs
                                                font-medium
                                                bg-[#eaf6f5]
                                                hover:bg-[#d8eeeb]
                                                text-[#159b91]
                                                transition
                                                whitespace-nowrap

                                                max-[640px]:w-full
                                                max-[640px]:box-border
                                            "
                                        >
                                            <FiEye />
                                            View Doctor
                                        </Link>

                                        {/* CANCEL */}
                                        {isUpcoming(appointment) && (

                                            <button
                                                onClick={() => cancelAppointment(appointment.id)}
                                                className="
                                                    w-fit
                                                    flex items-center justify-center gap-[7px]
                                                    px-3 py-2
                                                    rounded-[7px]
                                                    text-xs
                                                    font-medium
                                                    bg-[#ffe9e9]
                                                    hover:bg-[#f87373]
                                                    hover:text-white
                                                    text-[#d64c4c]
                                                    transition
                                                    cursor-pointer
                                                    whitespace-nowrap

                                                    max-[640px]:w-full
                                                    max-[640px]:box-border
                                                "
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
