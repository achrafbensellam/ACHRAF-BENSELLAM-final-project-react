
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

                {/* Page Header */}
                <div className="mb-[30px]">

                    <h1 className="
                        text-[28px]
                        font-bold
                        mb-2

                        max-sm:text-[23px]
                    ">
                        My Patients
                    </h1>

                    <p className="text-sm text-[#82919b]">
                        Manage and view your patients
                    </p>

                </div>


                {/* Patients Statistics */}
                <div className="
                    grid grid-cols-2
                    gap-5
                    mb-[30px]

                    max-sm:gap-[10px]
                ">

                    {/* Total Patients */}
                    <div className="
                        flex items-center gap-[15px]
                        bg-white
                        p-[22px]
                        rounded-xl
                        shadow-[0_3px_15px_rgba(0,0,0,0.04)]

                        max-sm:p-[15px_10px]
                        max-sm:gap-[9px]
                    ">

                        <div className="
                            w-12 h-12 min-w-12
                            flex items-center justify-center
                            bg-[#e5f5f5]
                            text-[#269b9b]
                            rounded-[10px]
                            text-[22px]

                            max-sm:w-[38px]
                            max-sm:h-[38px]
                            max-sm:min-w-[38px]
                            max-sm:text-lg
                        ">
                            <FiUsers />
                        </div>

                        <div>
                            <h3 className="
                                text-[25px]
                                font-bold
                                mb-[5px]

                                max-sm:text-xl
                            ">
                                {myPatients.length}
                            </h3>

                            <p className="text-[13px] text-[#82919b] max-sm:text-[11px]">
                                Total Patients
                            </p>
                        </div>

                    </div>


                    {/* Total Appointments */}
                    <div className="
                        flex items-center gap-[15px]
                        bg-white
                        p-[22px]
                        rounded-xl
                        shadow-[0_3px_15px_rgba(0,0,0,0.04)]

                        max-sm:p-[15px_10px]
                        max-sm:gap-[9px]
                    ">

                        <div className="
                            w-12 h-12 min-w-12
                            flex items-center justify-center
                            bg-[#e5f5f5]
                            text-[#269b9b]
                            rounded-[10px]
                            text-[22px]

                            max-sm:w-[38px]
                            max-sm:h-[38px]
                            max-sm:min-w-[38px]
                            max-sm:text-lg
                        ">
                            <FiCalendar />
                        </div>

                        <div>
                            <h3 className="
                                text-[25px]
                                font-bold
                                mb-[5px]

                                max-sm:text-xl
                            ">
                                {myAppointments.length}
                            </h3>

                            <p className="text-[13px] text-[#82919b] max-sm:text-[11px]">
                                Total Appointments
                            </p>
                        </div>

                    </div>

                </div>


                {/* Patients Section */}
                <div className="
                    bg-white
                    p-[25px]
                    rounded-xl
                    shadow-[0_3px_15px_rgba(0,0,0,0.04)]

                    max-sm:p-[17px]
                ">

                    {/* Section Header */}
                    <div className="
                        flex justify-between items-center
                        mb-[25px]
                        gap-3
                    ">

                        <h2 className="
                            text-[19px]
                            font-bold

                            max-sm:text-base
                        ">
                            Patient List
                        </h2>

                        <span className="
                            text-[#269b9b]
                            bg-[#e5f5f5]
                            px-3 py-2
                            rounded-full
                            text-xs
                            whitespace-nowrap
                        ">
                            {myPatients.length} Patients
                        </span>

                    </div>


                    {/* Empty State */}
                    {myPatients.length === 0 ? (

                        <div className="
                            text-center
                            py-[60px] px-5
                            text-[#82919b]
                        ">

                            <FiUsers className="
                                text-[45px]
                                text-[#269b9b]
                                mx-auto mb-[15px]
                            " />

                            <h3 className="
                                text-[#193344]
                                font-bold
                                mb-2
                            ">
                                No Patients Yet
                            </h3>

                            <p className="text-[13px]">
                                You don't have any patients with appointments yet.
                            </p>

                        </div>

                    ) : (

                        /* Patients Grid */
                        <div className="
                            grid grid-cols-3
                            gap-5

                            max-[1200px]:grid-cols-2
                            max-sm:grid-cols-1
                        ">

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
                                        key={patientInfo.id}
                                        className="
                                            border border-[#edf0f2]
                                            rounded-xl
                                            p-5
                                            transition-all duration-300

                                            hover:-translate-y-1
                                            hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]
                                            hover:border-[#cde9e9]
                                        "
                                    >

                                        {/* Patient Header */}
                                        <div className="
                                            flex items-center gap-3
                                            mb-5
                                            min-w-0
                                        ">

                                            <div className="
                                                w-[52px] h-[52px]
                                                min-w-[52px]
                                                rounded-full
                                                overflow-hidden
                                                flex items-center justify-center
                                                bg-[#e5f5f5]
                                                text-[#269b9b]
                                                text-[22px]
                                            ">

                                                {patientInfo.image ? (

                                                    <img
                                                        src={patientInfo.image}
                                                        alt={patientInfo.name}
                                                        className="w-full h-full object-cover"
                                                    />

                                                ) : (

                                                    <FiUser />

                                                )}

                                            </div>

                                            <div className="min-w-0">

                                                <h3 className="text-[15px] font-bold mb-[5px] break-words">
                                                    {patientInfo.name}
                                                </h3>

                                                <span className="text-[#269b9b] text-xs">
                                                    Patient
                                                </span>

                                            </div>

                                        </div>


                                        {/* Patient Information */}
                                        <div className="
                                            flex flex-col gap-3
                                            pb-[18px]
                                            border-b border-[#edf0f2]
                                        ">

                                            <p className="
                                                flex items-center gap-[9px]
                                                text-xs text-[#687984]
                                                break-all
                                            ">

                                                <FiMail className="
                                                    text-[#269b9b]
                                                    min-w-[15px]
                                                " />

                                                {patientInfo.email || "No email available"}

                                            </p>


                                            <p className="
                                                flex items-center gap-[9px]
                                                text-xs text-[#687984]
                                                break-all
                                            ">

                                                <FiPhone className="
                                                    text-[#269b9b]
                                                    min-w-[15px]
                                                " />

                                                {patientInfo.phone || "No phone available"}

                                            </p>

                                        </div>


                                        {/* Appointment Information */}
                                        <div className="
                                            flex flex-col gap-[13px]
                                            py-[18px]
                                            border-b border-[#edf0f2]
                                        ">

                                            <div className="
                                                flex justify-between items-center
                                                gap-2
                                            ">

                                                <span className="text-xs text-[#82919b]">
                                                    Total Appointments
                                                </span>

                                                <strong className="text-xs text-[#193344]">
                                                    {patientAppointments.length}
                                                </strong>

                                            </div>


                                            <div className="
                                                flex justify-between items-center
                                                gap-2
                                            ">

                                                <span className="text-xs text-[#82919b]">
                                                    Last Appointment
                                                </span>

                                                <strong className="
                                                    text-xs text-[#193344]
                                                    text-right
                                                ">
                                                    {latestAppointment.date}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Latest Appointment Status */}
                                        <div className="
                                            flex justify-between items-center
                                            gap-[10px]
                                            pt-[15px]
                                        ">

                                            <span className="text-[11px] text-[#82919b]">
                                                Last Appointment Status
                                            </span>

                                            <span className={`
                                                px-[10px] py-[6px]
                                                rounded-full
                                                text-[10px]
                                                font-bold
                                                capitalize
                                                whitespace-nowrap

                                                ${latestAppointment.status === "pending"
                                                    ? "bg-[#fff5df] text-[#d99b26]"
                                                    : latestAppointment.status === "confirmed"
                                                        ? "bg-[#e5f8ef] text-[#20a36b]"
                                                        : latestAppointment.status === "completed"
                                                            ? "bg-[#e9f5f5] text-[#239c9c]"
                                                            : "bg-[#fff0f0] text-[#dc4c4c]"
                                                }
                                            `}>
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
