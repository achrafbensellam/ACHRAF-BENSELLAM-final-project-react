
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
        return <h2 className="p-5 text-xl font-bold text-red-600">Access Denied</h2>;
    }

    // Statistics
    const totalDoctors = doctors.length;
    const totalPatients = patient.length;
    const totalAppointments = appointments.length;

    const pendingAppointments = appointments.filter(
        (appointment) => appointment.status === "pending"
    ).length;

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

    // Status Colors
    const getStatusStyle = (status) => {

        if (status === "pending") {
            return "bg-orange-50 text-orange-600";
        } else if (status === "confirmed") {
            return "bg-blue-50 text-blue-600";
        } else if (status === "completed") {
            return "bg-green-100 text-green-600";
        } else if (status === "cancelled" || status === "rejected") {
            return "bg-red-100 text-red-600";
        } else {
            return "bg-gray-100 text-gray-600";
        }

    };

    return (
        <>
            <AdminSidebar />

            <div className="
                min-h-screen w-[calc(100%-260px)]
                ml-[260px] bg-slate-50 p-[35px]
                max-lg:ml-[210px]
                max-lg:w-[calc(100%-210px)]
                max-lg:px-5 max-lg:py-[25px]
                max-sm:ml-0 max-sm:w-full
                max-sm:px-[15px] max-sm:pb-[120px]
            ">

                {/* HEADER */}
                <div className="mb-[30px]">

                    <h1 className="
                        mb-2 text-[28px] font-bold
                        text-slate-800
                        max-sm:text-[23px]
                    ">
                        Admin Dashboard
                    </h1>

                    <p className="text-sm text-slate-500">
                        Welcome back, {currentUser.name}!
                    </p>

                </div>

                {/* STATISTICS */}
                <div className="
                    mb-[35px] grid
                    grid-cols-4 gap-5
                    max-[1100px]:grid-cols-2
                    max-sm:grid-cols-1
                ">

                    {/* TOTAL DOCTORS */}
                    <div className="
                        flex items-center gap-[15px]
                        rounded-xl bg-white p-[22px]
                        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0
                            items-center justify-center
                            rounded-[10px]
                            bg-blue-100 text-[23px] text-blue-600
                        ">
                            <FiUsers />
                        </div>

                        <div>
                            <p className="mb-[7px] text-[13px] text-slate-500">
                                Total Doctors
                            </p>

                            <h2 className="text-[25px] font-bold text-slate-800">
                                {totalDoctors}
                            </h2>
                        </div>

                    </div>

                    {/* TOTAL PATIENTS */}
                    <div className="
                        flex items-center gap-[15px]
                        rounded-xl bg-white p-[22px]
                        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0
                            items-center justify-center
                            rounded-[10px]
                            bg-green-100 text-[23px] text-green-600
                        ">
                            <FiUser />
                        </div>

                        <div>
                            <p className="mb-[7px] text-[13px] text-slate-500">
                                Total Patients
                            </p>

                            <h2 className="text-[25px] font-bold text-slate-800">
                                {totalPatients}
                            </h2>
                        </div>

                    </div>

                    {/* TOTAL APPOINTMENTS */}
                    <div className="
                        flex items-center gap-[15px]
                        rounded-xl bg-white p-[22px]
                        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0
                            items-center justify-center
                            rounded-[10px]
                            bg-purple-100 text-[23px] text-purple-600
                        ">
                            <FiCalendar />
                        </div>

                        <div>
                            <p className="mb-[7px] text-[13px] text-slate-500">
                                Total Appointments
                            </p>

                            <h2 className="text-[25px] font-bold text-slate-800">
                                {totalAppointments}
                            </h2>
                        </div>

                    </div>

                    {/* PENDING APPOINTMENTS */}
                    <div className="
                        flex items-center gap-[15px]
                        rounded-xl bg-white p-[22px]
                        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                    ">

                        <div className="
                            flex h-12 w-12 shrink-0
                            items-center justify-center
                            rounded-[10px]
                            bg-orange-100 text-[23px] text-orange-600
                        ">
                            <FiClock />
                        </div>

                        <div>
                            <p className="mb-[7px] text-[13px] text-slate-500">
                                Pending Appointments
                            </p>

                            <h2 className="text-[25px] font-bold text-slate-800">
                                {pendingAppointments}
                            </h2>
                        </div>

                    </div>

                </div>

                {/* RECENT APPOINTMENTS */}
                <div className="
                    rounded-xl bg-white p-[25px]
                    shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                    max-sm:p-[15px]
                ">

                    {/* SECTION HEADER */}
                    <div className="
                        mb-[25px] flex items-center
                        justify-between gap-2
                        max-sm:flex-wrap
                    ">

                        <h2 className="
                            text-xl font-bold text-slate-800
                            max-sm:text-[17px]
                        ">
                            Recent Appointments
                        </h2>

                        <span className="text-[13px] text-slate-500">
                            {appointments.length} Appointments
                        </span>

                    </div>

                    {/* EMPTY MESSAGE */}
                    {recentAppointments.length === 0 ? (

                        <p className="
                            p-[30px] text-center
                            text-slate-500
                        ">
                            No appointments found.
                        </p>

                    ) : (

                        /* TABLE */
                        <div className="w-full overflow-x-auto">

                            <table className="w-full min-w-[600px] border-collapse">

                                <thead className="bg-slate-50">

                                    <tr>
                                        <th className="
                                            border-b border-slate-200
                                            p-[15px] text-left
                                            text-[13px] font-semibold
                                            text-slate-500
                                        ">
                                            Patient
                                        </th>

                                        <th className="
                                            border-b border-slate-200
                                            p-[15px] text-left
                                            text-[13px] font-semibold
                                            text-slate-500
                                        ">
                                            Doctor
                                        </th>

                                        <th className="
                                            border-b border-slate-200
                                            p-[15px] text-left
                                            text-[13px] font-semibold
                                            text-slate-500
                                        ">
                                            Date
                                        </th>

                                        <th className="
                                            border-b border-slate-200
                                            p-[15px] text-left
                                            text-[13px] font-semibold
                                            text-slate-500
                                        ">
                                            Time
                                        </th>

                                        <th className="
                                            border-b border-slate-200
                                            p-[15px] text-left
                                            text-[13px] font-semibold
                                            text-slate-500
                                        ">
                                            Status
                                        </th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {recentAppointments.map((appointment) => (

                                        <tr
                                            key={appointment.id}
                                            className="transition-colors hover:bg-slate-50"
                                        >

                                            <td className="
                                                border-b border-slate-200
                                                p-[15px] text-[13px]
                                                text-slate-700
                                            ">
                                                {getPatientName(appointment.patientId)}
                                            </td>

                                            <td className="
                                                border-b border-slate-200
                                                p-[15px] text-[13px]
                                                text-slate-700
                                            ">
                                                {getDoctorName(appointment.doctorId)}
                                            </td>

                                            <td className="
                                                border-b border-slate-200
                                                p-[15px] text-[13px]
                                                text-slate-700
                                            ">
                                                {appointment.date}
                                            </td>

                                            <td className="
                                                border-b border-slate-200
                                                p-[15px] text-[13px]
                                                text-slate-700
                                            ">
                                                {appointment.time}
                                            </td>

                                            <td className="
                                                border-b border-slate-200
                                                p-[15px]
                                            ">

                                                <span className={`
                                                    inline-block rounded-full
                                                    px-[10px] py-[6px]
                                                    text-xs capitalize
                                                    ${getStatusStyle(appointment.status)}
                                                `}>
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
