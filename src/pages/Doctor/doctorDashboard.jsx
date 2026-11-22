
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import DoctorSidebar from "../../layouts/doctorSidebar";

import {
    FiCalendar,
    FiClock,
    FiCheckCircle,
    FiUsers,
    FiArrowRight,
    FiUser
} from "react-icons/fi";

function DoctorDashboard() {

    const { currentUser, appointments, patient } = useContext(MyContext);

    // Check doctor login
    if (!currentUser || currentUser.role !== "doctor") {
        return <h2>Please login as a doctor.</h2>;
    }

    // Get doctor's appointments
    const myAppointments = appointments.filter((app) => {
        return String(app.doctorId) === String(currentUser.id);
    });

    // Get today's date
    const now = new Date();

    const today =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    // Get today's appointments
    const todayAppointments = myAppointments.filter((app) => {
        return app.date === today;
    });

    // Count pending appointments
    const pendingAppointments = myAppointments.filter((app) => {
        return app.status === "pending";
    });

    // Count completed appointments
    const completedAppointments = myAppointments.filter((app) => {
        return app.status === "completed";
    });

    // Get patient information
    const getPatient = (patientId) => {
        return patient.find((item) => {
            return String(item.id) === String(patientId);
        });
    };

    // Get upcoming appointments for today
    const upcomingToday = todayAppointments
        .filter((app) => {
            return app.status === "pending" || app.status === "confirmed";
        })
        .sort((a, b) => {

            if (a.time < b.time) {
                return -1;
            } else if (a.time > b.time) {
                return 1;
            } else {
                return 0;
            }

        });

    return (

        <div className="min-h-screen bg-[#f5f8fa] text-[#193344] font-[Arial,sans-serif]">

            <DoctorSidebar />

            <main className="
                ml-[260px]
                w-[calc(100%-260px)]
                min-h-screen
                p-10
                box-border

                max-lg:ml-[210px]
                max-lg:w-[calc(100%-210px)]
                max-lg:px-5
                max-lg:py-[30px]

                max-sm:ml-0
                max-sm:w-full
                max-sm:px-[15px]
                max-sm:py-[25px]
                max-sm:pb-[120px]
            ">

                <div className="max-w-[1400px] mx-auto">

                    {/* Welcome Header */}
                    <div className="
                        flex justify-between items-center
                        gap-5 mb-[35px]

                        max-sm:flex-col
                        max-sm:items-start
                    ">

                        <div>

                            <p className="text-[#168b8b] font-bold mb-2">
                                Welcome back,
                            </p>

                            <h1 className="
                                text-[30px]
                                font-bold
                                mb-[10px]

                                max-sm:text-[25px]
                            ">
                                {currentUser.name}
                            </h1>

                            <p className="text-[#82919b] text-sm">
                                Here is an overview of your medical activities.
                            </p>

                        </div>

                        <div className="
                            flex items-center gap-[10px]
                            px-[17px] py-[13px]
                            bg-white rounded-[10px]
                            text-[#168b8b] text-sm
                            shadow-sm
                        ">
                            <FiCalendar className="w-5 h-5 shrink-0" />

                            {now.toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </div>

                    </div>


                    {/* Statistics */}
                    <div className="
                        grid grid-cols-4
                        gap-[18px]
                        mb-[35px]

                        max-lg:grid-cols-2
                        max-sm:gap-[10px]
                    ">

                        {/* Total Appointments */}
                        <div className="
                            bg-white p-[22px]
                            rounded-[14px]
                            border border-[#e8eef1]

                            max-sm:p-[15px]
                        ">

                            <div className="
                                w-[43px] h-[43px]
                                flex items-center justify-center
                                rounded-[10px]
                                bg-[#e8f1ff] text-[#3979d8]
                                text-[21px]
                                mb-[17px]

                                max-sm:w-[35px]
                                max-sm:h-[35px]
                            ">
                                <FiCalendar />
                            </div>

                            <p className="text-[#82919b] text-sm mb-[10px] max-sm:text-xs">
                                Total Appointments
                            </p>

                            <h2 className="text-[30px] font-bold max-sm:text-2xl">
                                {myAppointments.length}
                            </h2>

                        </div>


                        {/* Today's Appointments */}
                        <div className="
                            bg-white p-[22px]
                            rounded-[14px]
                            border border-[#e8eef1]

                            max-sm:p-[15px]
                        ">

                            <div className="
                                w-[43px] h-[43px]
                                flex items-center justify-center
                                rounded-[10px]
                                bg-[#fff2df] text-[#dc9633]
                                text-[21px]
                                mb-[17px]

                                max-sm:w-[35px]
                                max-sm:h-[35px]
                            ">
                                <FiClock />
                            </div>

                            <p className="text-[#82919b] text-sm mb-[10px] max-sm:text-xs">
                                Today's Appointments
                            </p>

                            <h2 className="text-[30px] font-bold max-sm:text-2xl">
                                {todayAppointments.length}
                            </h2>

                        </div>


                        {/* Pending Requests */}
                        <div className="
                            bg-white p-[22px]
                            rounded-[14px]
                            border border-[#e8eef1]

                            max-sm:p-[15px]
                        ">

                            <div className="
                                w-[43px] h-[43px]
                                flex items-center justify-center
                                rounded-[10px]
                                bg-[#f1eaff] text-[#8960d6]
                                text-[21px]
                                mb-[17px]

                                max-sm:w-[35px]
                                max-sm:h-[35px]
                            ">
                                <FiUsers />
                            </div>

                            <p className="text-[#82919b] text-sm mb-[10px] max-sm:text-xs">
                                Pending Requests
                            </p>

                            <h2 className="text-[30px] font-bold max-sm:text-2xl">
                                {pendingAppointments.length}
                            </h2>

                        </div>


                        {/* Completed Appointments */}
                        <div className="
                            bg-white p-[22px]
                            rounded-[14px]
                            border border-[#e8eef1]

                            max-sm:p-[15px]
                        ">

                            <div className="
                                w-[43px] h-[43px]
                                flex items-center justify-center
                                rounded-[10px]
                                bg-[#e3f7eb] text-[#299b61]
                                text-[21px]
                                mb-[17px]

                                max-sm:w-[35px]
                                max-sm:h-[35px]
                            ">
                                <FiCheckCircle />
                            </div>

                            <p className="text-[#82919b] text-sm mb-[10px] max-sm:text-xs">
                                Completed Appointments
                            </p>

                            <h2 className="text-[30px] font-bold max-sm:text-2xl">
                                {completedAppointments.length}
                            </h2>

                        </div>

                    </div>


                    {/* Today's Appointments */}
                    <div className="
                        bg-white p-[25px]
                        rounded-[14px]
                        border border-[#e8eef1]
                        mb-[25px]

                        max-sm:p-[17px]
                    ">

                        <div className="
                            flex justify-between items-center
                            gap-[15px]
                            mb-[22px]

                            max-sm:items-start
                        ">

                            <div>
                                <h2 className="text-xl font-bold mb-2">
                                    Today's Appointments
                                </h2>

                                <p className="text-[#82919b] text-sm">
                                    Your scheduled patient visits for today.
                                </p>
                            </div>

                            <Link
                                to="/doctor/appointments"
                                className="
                                    flex items-center gap-[7px]
                                    text-[#168b8b]
                                    no-underline
                                    font-bold text-sm
                                    shrink-0
                                    hover:gap-3
                                    transition-all
                                "
                            >
                                View All
                                <FiArrowRight />
                            </Link>

                        </div>


                        <div className="flex flex-col gap-3">

                            {upcomingToday.length > 0 ? (

                                upcomingToday.map((app) => {

                                    const patientInfo = getPatient(app.patientId);

                                    return (

                                        <div
                                            key={app.id}
                                            className="
                                                flex justify-between items-center
                                                gap-[15px]
                                                p-4
                                                border border-[#edf1f3]
                                                rounded-[10px]

                                                max-sm:flex-wrap
                                            "
                                        >

                                            {/* Appointment Time */}
                                            <div className="
                                                flex items-center gap-[7px]
                                                text-[#168b8b]
                                                font-bold
                                                min-w-[90px]
                                            ">
                                                <FiClock />
                                                {app.time}
                                            </div>


                                            {/* Patient Information */}
                                            <div className="
                                                flex items-center gap-3
                                                flex-1 min-w-0

                                                max-sm:min-w-[150px]
                                            ">

                                                <div className="
                                                    w-[42px] h-[42px]
                                                    min-w-[42px]
                                                    flex items-center justify-center
                                                    bg-[#e2f4f3]
                                                    text-[#168b8b]
                                                    rounded-full
                                                    text-[19px]
                                                ">
                                                    <FiUser />
                                                </div>

                                                <div className="min-w-0">

                                                    <h3 className="text-[15px] font-bold mb-[5px]">
                                                        {patientInfo?.name || "Unknown Patient"}
                                                    </h3>

                                                    <p className="text-[#82919b] text-xs break-all">
                                                        {patientInfo?.email || "No email available"}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Status */}
                                            <span className={`
                                                px-3 py-[7px]
                                                rounded-full
                                                text-xs font-bold
                                                capitalize
                                                shrink-0

                                                ${app.status === "pending"
                                                    ? "bg-[#fff2df] text-[#c88718]"
                                                    : "bg-[#e2f4f3] text-[#168b8b]"
                                                }
                                            `}>
                                                {app.status}
                                            </span>

                                        </div>

                                    );

                                })

                            ) : (

                                <div className="
                                    text-center
                                    py-[35px] px-[10px]
                                    text-[#82919b]
                                ">

                                    <FiCalendar className="
                                        text-[32px]
                                        text-[#168b8b]
                                        mx-auto mb-3
                                    " />

                                    <h3 className="text-[#193344] font-bold mb-2">
                                        No appointments for today
                                    </h3>

                                    <p className="text-sm">
                                        You don't have any scheduled visits today.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* Bottom Sections */}
                    <div className="
                        grid grid-cols-2
                        gap-5

                        max-lg:grid-cols-1
                    ">

                        {/* My Working Schedule */}
                        <div className="
                            bg-white p-[25px]
                            rounded-[14px]
                            border border-[#e8eef1]

                            max-sm:p-[17px]
                        ">

                            <h2 className="text-xl font-bold mb-2">
                                My Working Schedule
                            </h2>


                            {/* Working Days */}
                            <div className="
                                py-[15px]
                                border-b border-[#edf1f3]
                            ">

                                <div className="
                                    flex items-center gap-[9px]
                                    text-[#82919b]
                                    text-[13px]
                                    mb-2
                                ">
                                    <FiCalendar className="text-[#168b8b]" />
                                    <span>Working Days</span>
                                </div>

                                <p className="font-bold text-sm">
                                    {currentUser.workingDays?.join(", ") || "Not specified"}
                                </p>

                            </div>


                            {/* Working Hours */}
                            <div className="
                                py-[15px]
                                border-b border-[#edf1f3]
                            ">

                                <div className="
                                    flex items-center gap-[9px]
                                    text-[#82919b]
                                    text-[13px]
                                    mb-2
                                ">
                                    <FiClock className="text-[#168b8b]" />
                                    <span>Working Hours</span>
                                </div>

                                <p className="font-bold text-sm">
                                    {currentUser.workingHours
                                        ? `${currentUser.workingHours.start} - ${currentUser.workingHours.end}`
                                        : "Not specified"}
                                </p>

                            </div>


                            {/* Appointment Duration */}
                            <div className="
                                py-[15px]
                                border-b border-[#edf1f3]
                            ">

                                <div className="
                                    flex items-center gap-[9px]
                                    text-[#82919b]
                                    text-[13px]
                                    mb-2
                                ">
                                    <FiUsers className="text-[#168b8b]" />
                                    <span>Appointment Duration</span>
                                </div>

                                <p className="font-bold text-sm">
                                    {currentUser.slotDuration || 30} Minutes
                                </p>

                            </div>


                            <Link
                                to="/doctor/schedule"
                                className="
                                    flex items-center gap-2
                                    mt-[18px]
                                    text-[#168b8b]
                                    text-sm font-bold
                                    no-underline
                                    hover:gap-3
                                    transition-all
                                "
                            >
                                Manage My Schedule
                                <FiArrowRight />
                            </Link>

                        </div>


                        {/* Quick Actions */}
                        <div className="
                            bg-white p-[25px]
                            rounded-[14px]
                            border border-[#e8eef1]

                            max-sm:p-[17px]
                        ">

                            <h2 className="text-xl font-bold mb-5">
                                Quick Actions
                            </h2>


                            <Link
                                to="/doctor/appointments"
                                className="
                                    flex items-center gap-3
                                    py-4
                                    border-b border-[#edf1f3]
                                    text-[#193344]
                                    no-underline
                                    text-sm
                                    hover:text-[#168b8b]
                                    transition-colors
                                "
                            >
                                <FiCalendar className="text-[#168b8b] text-[19px]" />

                                <span>Manage Appointments</span>

                                <FiArrowRight className="ml-auto text-[#82919b]" />
                            </Link>


                            <Link
                                to="/doctor/patients"
                                className="
                                    flex items-center gap-3
                                    py-4
                                    border-b border-[#edf1f3]
                                    text-[#193344]
                                    no-underline
                                    text-sm
                                    hover:text-[#168b8b]
                                    transition-colors
                                "
                            >
                                <FiUsers className="text-[#168b8b] text-[19px]" />

                                <span>View My Patients</span>

                                <FiArrowRight className="ml-auto text-[#82919b]" />
                            </Link>


                            <Link
                                to="/doctor/profile"
                                className="
                                    flex items-center gap-3
                                    py-4
                                    border-b border-[#edf1f3]
                                    text-[#193344]
                                    no-underline
                                    text-sm
                                    hover:text-[#168b8b]
                                    transition-colors
                                "
                            >
                                <FiUser className="text-[#168b8b] text-[19px]" />

                                <span>My Profile</span>

                                <FiArrowRight className="ml-auto text-[#82919b]" />
                            </Link>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );
}

export default DoctorDashboard;
