
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import Sidebar from "../../layouts/sidebar";

import {
    FiCalendar,
    FiHeart,
    FiUser,
    FiBell,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiArrowRight,
    FiMapPin,
    FiPlus,
    FiActivity,
    FiSearch
} from "react-icons/fi";

function PatientDashboard() {

    const {
        currentUser,
        doctors,
        appointments
    } = useContext(MyContext);

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 text-lg">
                Please login first.
            </div>
        );
    }

    // Get current patient's appointments
    const myAppointments = appointments.filter(
        (appointment) =>
            String(appointment.patientId) === String(currentUser.id)
    );

    // Upcoming appointments
    const upcomingAppointments = myAppointments.filter(
        (appointment) =>
            ["pending", "confirmed"].includes(appointment.status) &&
            new Date(`${appointment.date}T${appointment.time || "00:00"}`) >= new Date()
    );

    // Completed appointments
    const completedAppointments = myAppointments.filter(
        (appointment) => appointment.status === "completed"
    );

    // Cancelled appointments
    const cancelledAppointments = myAppointments.filter(
        (appointment) => appointment.status === "cancelled"
    );

    // Get next appointment
    const nextAppointment = [...upcomingAppointments].sort(
        (a, b) =>
            new Date(`${a.date}T${a.time || "00:00"}`) -
            new Date(`${b.date}T${b.time || "00:00"}`)
    )[0];

    // Get favorite doctors
    const favoriteDoctors = doctors.filter(
        (doctor) => currentUser.favorites?.includes(doctor.id)
    );

    // Get doctor information
    const getDoctor = (doctorId) =>
        doctors.find(
            (doctor) => String(doctor.id) === String(doctorId)
        );

    const nextDoctor = nextAppointment
        ? getDoctor(nextAppointment.doctorId)
        : null;

    // Format appointment date
    const formatDate = (date) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <main className="
                ml-[260px] w-[calc(100%-260px)] min-h-screen
                p-[30px] box-border
                max-[900px]:ml-0 max-[900px]:w-full
                max-[650px]:p-5
                max-[390px]:px-[15px]
            ">

                {/* HEADER */}
                <header className="
                    flex items-center justify-between gap-5 mb-8
                    max-[650px]:flex-col
                    max-[650px]:items-start
                    max-[650px]:mb-6
                ">

                    <div>
                        <p className="text-sm text-slate-400 mb-1">
                            Welcome back
                        </p>

                        <h2 className="
                            text-[29px] font-bold tracking-tight text-slate-800
                            max-[650px]:text-[25px]
                        ">
                            Hello, {currentUser.name}
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
                            Here's what's happening with your health today.
                        </p>
                    </div>

                    <div className="
                        flex items-center gap-4
                        max-[650px]:w-full
                        max-[650px]:justify-between
                    ">

                        <button
                            type="button"
                            aria-label="Notifications"
                            className="
                                w-[46px] h-[46px] grid place-items-center
                                border border-slate-200 rounded-xl
                                bg-white text-slate-500
                                hover:text-blue-600 hover:border-blue-200
                                transition
                            "
                        >
                            <FiBell size={20} />
                        </button>

                        <Link
                            to="/patient/profile"
                            className="flex items-center gap-3"
                        >

                            <div className="
                                w-11 h-11 flex items-center justify-center
                                overflow-hidden rounded-full bg-blue-100
                            ">
                                {currentUser.image ? (
                                    <img
                                        src={currentUser.image}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FiUser size={22} className="text-blue-600" />
                                )}
                            </div>

                            <div className="max-[390px]:hidden">
                                <p className="text-[13px] font-bold text-slate-800">
                                    {currentUser.name}
                                </p>

                                <span className="block text-[11px] text-slate-400 mt-1">
                                    Patient
                                </span>
                            </div>

                        </Link>
                    </div>
                </header>

                {/* WELCOME BANNER */}
                <section className="
                    relative overflow-hidden mb-[30px]
                    p-8 rounded-[18px]
                    bg-gradient-to-r from-blue-700 to-blue-500
                    text-white
                    max-[650px]:p-6
                    max-[390px]:p-5
                ">

                    <div className="relative z-10 max-w-[540px]">

                        <p className="text-[13px] text-blue-100 mb-2">
                            Your health matters
                        </p>

                        <h2 className="
                            text-[30px] leading-tight font-bold mb-3
                            max-[650px]:text-[25px]
                            max-[390px]:text-[22px]
                        ">
                            Take care of your health with MedConnect
                        </h2>

                        <p className="
                            max-w-[480px] text-[13px] leading-7
                            text-blue-100 mb-6
                        ">
                            Find trusted doctors, book appointments and manage your
                            healthcare easily.
                        </p>

                        <Link
                            to="/doctors"
                            className="
                                inline-flex items-center justify-center gap-2
                                px-5 py-3 rounded-xl
                                bg-white text-blue-700
                                text-[13px] font-bold
                                hover:bg-blue-50 hover:-translate-y-0.5
                                transition
                            "
                        >
                            Find a Doctor
                            <FiArrowRight />
                        </Link>

                    </div>

                    <FiActivity className="
                        absolute -right-6 -bottom-9
                        w-[250px] h-[250px]
                        text-white/10
                        max-[650px]:w-[190px]
                        max-[650px]:h-[190px]
                        max-[650px]:-right-16
                    " />

                </section>

                {/* STATISTICS */}
                <section className="
                    grid grid-cols-4 gap-[18px] mb-8
                    max-[1100px]:grid-cols-2
                    max-[390px]:grid-cols-1
                    max-[390px]:gap-3
                ">

                    {/* Upcoming */}
                    <div className="
                        p-5 rounded-[17px] bg-white
                        border border-slate-100
                        shadow-sm
                        max-[650px]:p-4
                    ">

                        <div className="flex items-center justify-between">
                            <div className="
                                w-11 h-11 grid place-items-center
                                rounded-xl bg-blue-50 text-blue-600
                            ">
                                <FiCalendar size={22} />
                            </div>

                            <span className="text-[11px] text-slate-400">
                                Upcoming
                            </span>
                        </div>

                        <h3 className="text-[30px] font-bold mt-4 mb-1">
                            {upcomingAppointments.length}
                        </h3>

                        <p className="text-xs text-slate-500">
                            Upcoming appointments
                        </p>
                    </div>

                    {/* Completed */}
                    <div className="
                        p-5 rounded-[17px] bg-white
                        border border-slate-100 shadow-sm
                        max-[650px]:p-4
                    ">

                        <div className="flex items-center justify-between">
                            <div className="
                                w-11 h-11 grid place-items-center
                                rounded-xl bg-green-50 text-green-600
                            ">
                                <FiCheckCircle size={22} />
                            </div>

                            <span className="text-[11px] text-slate-400">
                                Completed
                            </span>
                        </div>

                        <h3 className="text-[30px] font-bold mt-4 mb-1">
                            {completedAppointments.length}
                        </h3>

                        <p className="text-xs text-slate-500">
                            Completed appointments
                        </p>
                    </div>

                    {/* Cancelled */}
                    <div className="
                        p-5 rounded-[17px] bg-white
                        border border-slate-100 shadow-sm
                        max-[650px]:p-4
                    ">

                        <div className="flex items-center justify-between">
                            <div className="
                                w-11 h-11 grid place-items-center
                                rounded-xl bg-red-50 text-red-500
                            ">
                                <FiXCircle size={22} />
                            </div>

                            <span className="text-[11px] text-slate-400">
                                Cancelled
                            </span>
                        </div>

                        <h3 className="text-[30px] font-bold mt-4 mb-1">
                            {cancelledAppointments.length}
                        </h3>

                        <p className="text-xs text-slate-500">
                            Cancelled appointments
                        </p>
                    </div>

                    {/* Favorites */}
                    <div className="
                        p-5 rounded-[17px] bg-white
                        border border-slate-100 shadow-sm
                        max-[650px]:p-4
                    ">

                        <div className="flex items-center justify-between">
                            <div className="
                                w-11 h-11 grid place-items-center
                                rounded-xl bg-pink-50 text-pink-500
                            ">
                                <FiHeart size={22} />
                            </div>

                            <span className="text-[11px] text-slate-400">
                                Favorites
                            </span>
                        </div>

                        <h3 className="text-[30px] font-bold mt-4 mb-1">
                            {favoriteDoctors.length}
                        </h3>

                        <p className="text-xs text-slate-500">
                            Favorite doctors
                        </p>
                    </div>

                </section>

                {/* APPOINTMENT AND QUICK ACTIONS */}
                <section className="
                    grid grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]
                    gap-[22px] mb-[30px]
                    max-[1100px]:grid-cols-1
                ">

                    {/* NEXT APPOINTMENT */}
                    <div className="
                        p-6 rounded-[17px] bg-white
                        border border-slate-100 shadow-sm
                        max-[650px]:p-[18px]
                    ">

                        <div className="
                            flex items-center justify-between gap-4 mb-6
                        ">

                            <div>
                                <h3 className="text-[17px] font-bold">
                                    Next Appointment
                                </h3>

                                <p className="text-xs text-slate-400 mt-1">
                                    Your nearest scheduled visit
                                </p>
                            </div>

                            <Link
                                to="/patient/appointments"
                                className="text-xs font-bold text-blue-600 whitespace-nowrap hover:underline"
                            >
                                View All
                            </Link>

                        </div>

                        {nextAppointment ? (

                            <div className="
                                flex items-center gap-4 p-5
                                rounded-[15px] bg-blue-50
                                max-[650px]:flex-wrap
                                max-[650px]:p-4
                            ">

                                <div className="
                                    w-16 h-16 shrink-0 overflow-hidden
                                    rounded-[14px] bg-white
                                ">
                                    {nextDoctor?.image && (
                                        <img
                                            src={nextDoctor.image}
                                            alt={nextDoctor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">

                                    <h4 className="text-sm font-bold text-slate-800">
                                        {nextDoctor?.name || "Doctor"}
                                    </h4>

                                    <p className="text-xs text-blue-600 mt-1">
                                        {nextDoctor?.specialty || "Medical appointment"}
                                    </p>

                                    <div className="
                                        flex flex-wrap gap-4 mt-3
                                        max-[390px]:flex-col
                                        max-[390px]:gap-2
                                    ">

                                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                                            <FiCalendar />
                                            {formatDate(nextAppointment.date)}
                                        </span>

                                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                                            <FiClock />
                                            {nextAppointment.time || "Time not specified"}
                                        </span>

                                    </div>
                                </div>

                                <span className={`
                                    px-3 py-2 rounded-full text-[10px] font-bold capitalize
                                    max-[650px]:ml-20
                                    ${nextAppointment.status === "confirmed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                    }
                                `}>
                                    {nextAppointment.status}
                                </span>

                            </div>

                        ) : (

                            <div className="
                                p-9 rounded-[15px] bg-slate-50 text-center
                                max-[650px]:p-6
                            ">

                                <div className="
                                    w-14 h-14 grid place-items-center
                                    mx-auto mb-4 rounded-full
                                    bg-blue-100 text-blue-600
                                ">
                                    <FiCalendar size={25} />
                                </div>

                                <h4 className="text-sm font-bold text-slate-700">
                                    No upcoming appointments
                                </h4>

                                <p className="text-xs text-slate-400 mt-2 mb-5">
                                    You haven't booked an appointment yet.
                                </p>

                                <Link
                                    to="/doctors"
                                    className="
                                        inline-flex items-center justify-center gap-2
                                        px-5 py-3 rounded-xl
                                        bg-blue-600 text-white
                                        text-xs font-bold
                                        hover:bg-blue-700 transition
                                    "
                                >
                                    <FiPlus />
                                    Book an Appointment
                                </Link>

                            </div>
                        )}

                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="
                        p-6 rounded-[17px] bg-white
                        border border-slate-100 shadow-sm
                        max-[650px]:p-[18px]
                    ">

                        <h3 className="text-[17px] font-bold">
                            Quick Actions
                        </h3>

                        <p className="text-xs text-slate-400 mt-1 mb-5">
                            What would you like to do?
                        </p>

                        <div className="flex flex-col gap-3">

                            <Link
                                to="/doctors"
                                className="
                                    flex items-center gap-3 p-3 rounded-xl
                                    bg-blue-50 hover:bg-blue-100
                                    transition hover:translate-x-1
                                "
                            >
                                <div className="
                                    w-[42px] h-[42px] shrink-0
                                    grid place-items-center rounded-xl
                                    bg-white text-blue-600
                                ">
                                    <FiSearch size={20} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-slate-800">
                                        Find a Doctor
                                    </p>

                                    <span className="block text-[10px] text-slate-400 mt-1">
                                        Explore specialists
                                    </span>
                                </div>
                            </Link>

                            <Link
                                to="/patient/appointments"
                                className="
                                    flex items-center gap-3 p-3 rounded-xl
                                    bg-green-50 hover:bg-green-100
                                    transition hover:translate-x-1
                                "
                            >
                                <div className="
                                    w-[42px] h-[42px] shrink-0
                                    grid place-items-center rounded-xl
                                    bg-white text-green-600
                                ">
                                    <FiCalendar size={20} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-slate-800">
                                        My Appointments
                                    </p>

                                    <span className="block text-[10px] text-slate-400 mt-1">
                                        Manage your visits
                                    </span>
                                </div>
                            </Link>

                            {/* <Link
                                to="/patient/profile"
                                className="
                                    flex items-center gap-3 p-3 rounded-xl
                                    bg-purple-50 hover:bg-purple-100
                                    transition hover:translate-x-1
                                "
                            >
                                <div className="
                                    w-[42px] h-[42px] shrink-0
                                    grid place-items-center rounded-xl
                                    bg-white text-purple-600
                                ">
                                    <FiUser size={20} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-slate-800">
                                        My Profile
                                    </p>

                                    <span className="block text-[10px] text-slate-400 mt-1">
                                        Update your information
                                    </span>
                                </div>
                            </Link> */}

                        </div>
                    </div>

                </section>

                {/* FAVORITE DOCTORS */}
                <section className="
                    p-6 rounded-[17px] bg-white
                    border border-slate-100 shadow-sm
                    mb-[25px]
                    max-[650px]:p-[18px]
                ">

                    <div className="
                        flex items-center justify-between gap-4 mb-6
                    ">

                        <div>
                            <h3 className="text-[17px] font-bold">
                                Favorite Doctors
                            </h3>

                            <p className="text-xs text-slate-400 mt-1">
                                Your saved medical specialists
                            </p>
                        </div>

                        <Link
                            to="/patient/favorites"
                            className="text-xs font-bold text-blue-600 whitespace-nowrap hover:underline"
                        >
                            View All
                        </Link>

                    </div>

                    {favoriteDoctors.length > 0 ? (

                        <div className="
                            grid grid-cols-3 gap-4
                            max-[1100px]:grid-cols-2
                            max-[650px]:grid-cols-1
                        ">

                            {favoriteDoctors.slice(0, 3).map((doctor) => (

                                <div
                                    key={doctor.id}
                                    className="
                                        flex items-center gap-3 min-w-0 p-3
                                        border border-slate-100 rounded-[13px]
                                        hover:-translate-y-0.5 hover:shadow-md
                                        transition
                                    "
                                >

                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="
                                            w-[55px] h-[55px] shrink-0
                                            rounded-xl object-cover bg-slate-100
                                        "
                                    />

                                    <div className="min-w-0">

                                        <h4 className="
                                            text-sm font-bold text-slate-800
                                            truncate
                                        ">
                                            {doctor.name}
                                        </h4>

                                        <p className="text-xs text-blue-600 mt-1">
                                            {doctor.specialty}
                                        </p>

                                        <p className="
                                            flex items-center gap-1
                                            text-[11px] text-slate-500 mt-2
                                        ">
                                            <FiMapPin />
                                            {doctor.city}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="
                            p-7 rounded-[13px] bg-slate-50 text-center
                        ">

                            <FiHeart
                                size={28}
                                className="mx-auto text-pink-400"
                            />

                            <p className="text-[13px] font-semibold text-slate-600 mt-3">
                                No favorite doctors yet
                            </p>

                            <span className="block text-xs text-slate-400 mt-2 mb-3">
                                Save doctors to find them easily later.
                            </span>

                            <Link
                                to="/doctors"
                                className="text-xs font-bold text-blue-600 hover:underline"
                            >
                                Explore Doctors
                            </Link>

                        </div>

                    )}

                </section>

                {/* FOOTER */}
                <footer className="
                    mt-[30px] text-center
                    text-[11px] text-slate-400
                ">
                    © 2026 MedConnect. All rights reserved.
                </footer>

            </main>
        </div>
    );
}

export default PatientDashboard;
