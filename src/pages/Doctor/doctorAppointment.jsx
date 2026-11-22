
import { useContext, useState } from "react";
import { MyContext } from "../../utils/mycontext";
import DoctorSidebar from "../../layouts/doctorSidebar";

import {
    FiCalendar,
    FiClock,
    FiUser,
    FiCheck,
    FiX,
    FiCheckCircle
} from "react-icons/fi";

function DoctorAppointments() {

    const {
        currentUser,
        appointments,
        setAppointments,
        patient
    } = useContext(MyContext);

    const [activeTab, setActiveTab] = useState("All");

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [rejectReason, setRejectReason] = useState("");
    const [rejectError, setRejectError] = useState("");

    // Check doctor login
    if (!currentUser || currentUser.role !== "doctor") {
        return <h2>Please login as a doctor.</h2>;
    }

    // Get appointments of the current doctor
    const myAppointments = appointments.filter((app) => {
        return String(app.doctorId) === String(currentUser.id);
    });

    // Get patient information
    const getPatient = (patientId) => {
        return patient.find((item) => {
            return String(item.id) === String(patientId);
        });
    };

    // Filter appointments
    const filteredAppointments = myAppointments.filter((app) => {

        if (activeTab === "All") {
            return true;
        } else {
            return app.status === activeTab.toLowerCase();
        }

    });

    // Count appointments
    const pendingCount = myAppointments.filter(
        (app) => app.status === "pending"
    ).length;

    const confirmedCount = myAppointments.filter(
        (app) => app.status === "confirmed"
    ).length;

    const completedCount = myAppointments.filter(
        (app) => app.status === "completed"
    ).length;

    const cancelledCount = myAppointments.filter(
        (app) => app.status === "cancelled"
    ).length;

    // Update appointment status
    const updateStatus = (appointmentId, newStatus) => {

        const updatedAppointments = appointments.map((app) => {

            if (
                String(app.id) === String(appointmentId) &&
                String(app.doctorId) === String(currentUser.id)
            ) {
                return {
                    ...app,
                    status: newStatus
                };
            }

            return app;
        });

        setAppointments(updatedAppointments);
    };

    // Open Reject Modal
    const openRejectModal = (appointmentId) => {
        setSelectedAppointment(appointmentId);
        setRejectReason("");
        setRejectError("");
        setShowRejectModal(true);
    };

    // Close Reject Modal
    const closeRejectModal = () => {
        setShowRejectModal(false);
        setSelectedAppointment(null);
        setRejectReason("");
        setRejectError("");
    };

    // Reject Appointment
    const rejectAppointment = () => {

        if (rejectReason.trim().length < 30) {
            setRejectError("Please enter at least 30 characters.");
            return;
        }

        const updatedAppointments = appointments.map((app) => {

            if (
                String(app.id) === String(selectedAppointment) &&
                String(app.doctorId) === String(currentUser.id) &&
                app.status === "pending"
            ) {
                return {
                    ...app,
                    status: "rejected",
                    rejectReason: rejectReason.trim()
                };
            }

            return app;
        });

        setAppointments(updatedAppointments);
        closeRejectModal();
    };

    // Status colors
    const getStatusStyle = (status) => {

        if (status === "pending") {
            return "bg-[#fff5df] text-[#d99b26]";
        } else if (status === "confirmed") {
            return "bg-[#e5f8ef] text-[#20a36b]";
        } else if (status === "completed") {
            return "bg-[#e9f5f5] text-[#239c9c]";
        } else if (status === "rejected" || status === "cancelled") {
            return "bg-[#fff0f0] text-[#dc4c4c]";
        }

        return "bg-gray-100 text-gray-600";
    };

    return (

        <div className="min-h-screen bg-[#f5f8fa]">

            <DoctorSidebar />

            <main className="ml-[260px] w-[calc(100%-260px)] min-h-screen p-10 box-border font-[Arial] text-[#193344]
                max-lg:ml-[210px] max-lg:w-[calc(100%-210px)] max-lg:px-5 max-lg:py-[30px]
                max-sm:ml-0 max-sm:w-full max-sm:px-[15px] max-sm:pt-[25px] max-sm:pb-[120px]">

                {/* Page Header */}
                <div className="flex justify-between items-center mb-[30px]">

                    <div>
                        <h1 className="text-[28px] font-bold mb-2 max-sm:text-[23px]">
                            My Appointments
                        </h1>

                        <p className="text-sm text-[#82919b]">
                            Manage your patient appointments
                        </p>
                    </div>

                </div>

                {/* Statistics */}
                <div className="grid grid-cols-5 gap-[18px] mb-[30px]
                    max-xl:grid-cols-3
                    max-sm:grid-cols-2 max-sm:gap-[10px]">

                    {/* Total */}
                    <div className="flex items-center gap-[14px] bg-white p-5 rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                        max-sm:gap-[9px] max-sm:p-[15px_10px]">

                        <div className="w-[42px] h-[42px] min-w-[42px] rounded-[10px] flex justify-center items-center text-xl bg-[#e8f1ff] text-[#3679d9]
                            max-sm:w-[35px] max-sm:h-[35px] max-sm:min-w-[35px] max-sm:text-[17px]">
                            <FiCalendar />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-[5px] max-sm:text-xl">
                                {myAppointments.length}
                            </h3>
                            <p className="text-xs text-[#82919b] max-sm:text-[10px]">
                                Total Appointments
                            </p>
                        </div>

                    </div>

                    {/* Pending */}
                    <div className="flex items-center gap-[14px] bg-white p-5 rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                        max-sm:gap-[9px] max-sm:p-[15px_10px]">

                        <div className="w-[42px] h-[42px] min-w-[42px] rounded-[10px] flex justify-center items-center text-xl bg-[#fff5df] text-[#d99b26]
                            max-sm:w-[35px] max-sm:h-[35px] max-sm:min-w-[35px] max-sm:text-[17px]">
                            <FiClock />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-[5px] max-sm:text-xl">
                                {pendingCount}
                            </h3>
                            <p className="text-xs text-[#82919b] max-sm:text-[10px]">
                                Pending Requests
                            </p>
                        </div>

                    </div>

                    {/* Confirmed */}
                    <div className="flex items-center gap-[14px] bg-white p-5 rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                        max-sm:gap-[9px] max-sm:p-[15px_10px]">

                        <div className="w-[42px] h-[42px] min-w-[42px] rounded-[10px] flex justify-center items-center text-xl bg-[#e5f8ef] text-[#20a36b]
                            max-sm:w-[35px] max-sm:h-[35px] max-sm:min-w-[35px] max-sm:text-[17px]">
                            <FiCheck />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-[5px] max-sm:text-xl">
                                {confirmedCount}
                            </h3>
                            <p className="text-xs text-[#82919b] max-sm:text-[10px]">
                                Confirmed
                            </p>
                        </div>

                    </div>

                    {/* Completed */}
                    <div className="flex items-center gap-[14px] bg-white p-5 rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                        max-sm:gap-[9px] max-sm:p-[15px_10px]">

                        <div className="w-[42px] h-[42px] min-w-[42px] rounded-[10px] flex justify-center items-center text-xl bg-[#e9f5f5] text-[#239c9c]
                            max-sm:w-[35px] max-sm:h-[35px] max-sm:min-w-[35px] max-sm:text-[17px]">
                            <FiCheckCircle />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-[5px] max-sm:text-xl">
                                {completedCount}
                            </h3>
                            <p className="text-xs text-[#82919b] max-sm:text-[10px]">
                                Completed
                            </p>
                        </div>

                    </div>

                    {/* Cancelled */}
                    <div className="flex items-center gap-[14px] bg-white p-5 rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                        max-sm:gap-[9px] max-sm:p-[15px_10px]">

                        <div className="w-[42px] h-[42px] min-w-[42px] rounded-[10px] flex justify-center items-center text-xl bg-[#fff0f0] text-[#dc4c4c]
                            max-sm:w-[35px] max-sm:h-[35px] max-sm:min-w-[35px] max-sm:text-[17px]">
                            <FiX />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-[5px] max-sm:text-xl">
                                {cancelledCount}
                            </h3>
                            <p className="text-xs text-[#82919b] max-sm:text-[10px]">
                                Cancelled
                            </p>
                        </div>

                    </div>

                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-[10px] mb-[25px] max-sm:gap-[7px]">

                    {[
                        "All",
                        "Pending",
                        "Confirmed",
                        "Completed",
                        "Rejected",
                        "Cancelled"
                    ].map((tab) => (

                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-[18px] py-[11px] border rounded-lg text-[13px] transition-all duration-300 cursor-pointer
                                max-sm:px-3 max-sm:py-[9px] max-sm:text-[11px]
                                ${activeTab === tab
                                    ? "bg-[#269b9b] text-white border-[#269b9b]"
                                    : "bg-white text-[#687984] border-[#e2e8ed] hover:border-[#269b9b] hover:text-[#269b9b]"
                                }`}
                        >
                            {tab}
                        </button>

                    ))}

                </div>

                {/* Appointments List */}
                <div className="flex flex-col gap-[18px]">

                    {/* Reject Modal */}
                    {showRejectModal && (

                        <div className="fixed inset-0 z-[1000] bg-[rgba(15,35,45,0.55)] flex justify-center items-center p-5">

                            <div className="w-full max-w-[450px] bg-white p-[25px] rounded-[14px] shadow-[0_10px_40px_rgba(0,0,0,0.15)]
                                max-sm:p-5">

                                <div className="flex justify-between items-center mb-[15px]">

                                    <h2 className="text-xl font-bold text-[#193344] max-sm:text-[17px]">
                                        Reject Appointment
                                    </h2>

                                    <button
                                        onClick={closeRejectModal}
                                        className="w-[35px] h-[35px] border-0 bg-[#fff0f0] text-[#dc4c4c] rounded-lg text-lg cursor-pointer flex justify-center items-center"
                                    >
                                        <FiX />
                                    </button>

                                </div>

                                <p className="text-[13px] text-[#82919b] leading-relaxed mb-[15px]">
                                    Please provide a reason for rejecting this appointment.
                                </p>

                                <textarea
                                    placeholder="Write the rejection reason..."
                                    value={rejectReason}
                                    onChange={(e) => {
                                        setRejectReason(e.target.value);
                                        setRejectError("");
                                    }}
                                    className="w-full min-h-[120px] resize-y p-[13px] border border-[#e2e8ed] rounded-lg outline-none text-[13px] font-[Arial] box-border focus:border-[#269b9b]"
                                />

                                <div className="text-right mt-[7px] text-[11px] text-[#82919b]">
                                    {rejectReason.trim().length}/30 characters
                                </div>

                                {rejectError && (
                                    <p className="text-xs text-[#dc4c4c] mt-2">
                                        {rejectError}
                                    </p>
                                )}

                                <div className="flex justify-end gap-[10px] mt-5">

                                    <button
                                        onClick={closeRejectModal}
                                        className="px-4 py-[11px] bg-[#edf1f3] text-[#687984] rounded-[7px] text-xs cursor-pointer hover:bg-[#dfe6e9]"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={rejectAppointment}
                                        disabled={rejectReason.trim().length < 30}
                                        className="px-4 py-[11px] bg-[#dc4c4c] text-white rounded-[7px] text-xs cursor-pointer hover:bg-[#c83d3d] disabled:bg-[#e9a5a5] disabled:cursor-not-allowed"
                                    >
                                        Reject Appointment
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* Empty State */}
                    {filteredAppointments.length === 0 ? (

                        <div className="bg-white py-[60px] px-5 text-center rounded-xl text-[#82919b]">

                            <FiCalendar className="text-[40px] text-[#269b9b] mx-auto mb-[15px]" />

                            <h3 className="text-[#193344] font-bold mb-2">
                                No appointments found
                            </h3>

                            <p className="text-[13px]">
                                You don't have any appointments in this category.
                            </p>

                        </div>

                    ) : (

                        filteredAppointments.map((app) => {

                            const patientInfo = getPatient(app.patientId);

                            return (

                                <div
                                    key={app.id}
                                    className="grid grid-cols-[1.3fr_1fr_1.2fr_auto] items-center gap-5 bg-white p-[22px] rounded-xl border border-[#edf0f2] shadow-[0_3px_12px_rgba(0,0,0,0.03)]
                                        max-xl:grid-cols-2
                                        max-sm:grid-cols-1 max-sm:gap-[18px] max-sm:p-[18px]"
                                >

                                    {/* Patient Information */}
                                    <div className="flex items-center gap-3 min-w-0">

                                        <div className="w-12 h-12 min-w-12 rounded-full bg-[#e8f5f5] text-[#269b9b] flex justify-center items-center overflow-hidden text-[21px]">

                                            {patientInfo?.image ? (
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

                                            <h3 className="text-[15px] font-bold mb-[6px]">
                                                {patientInfo?.name || "Unknown Patient"}
                                            </h3>

                                            <p className="text-xs text-[#82919b] break-all">
                                                {patientInfo?.email || "No email available"}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Appointment Information */}
                                    <div className="flex flex-col gap-[10px] max-sm:flex-row max-sm:flex-wrap max-sm:gap-[15px]">

                                        <p className="flex items-center gap-2 text-[13px] text-[#687984]">
                                            <FiCalendar className="text-[#269b9b] shrink-0" />
                                            {app.date}
                                        </p>

                                        <p className="flex items-center gap-2 text-[13px] text-[#687984]">
                                            <FiClock className="text-[#269b9b] shrink-0" />
                                            {app.time}
                                        </p>

                                    </div>

                                    {/* Status and Reasons */}
                                    <div className="flex flex-col items-start gap-[9px]">

                                        <span className={`px-3 py-[7px] rounded-full text-[11px] font-bold capitalize ${getStatusStyle(app.status)}`}>
                                            {app.status}
                                        </span>

                                        {app.rejectReason && (
                                            <p className="max-w-[220px] text-xs leading-relaxed text-[#687984] break-words max-sm:max-w-full">
                                                <strong className="block text-[#d45b5b] mb-1">
                                                    Rejection Reason:
                                                </strong>
                                                {app.rejectReason}
                                            </p>
                                        )}

                                        {app.status === "cancelled" && app.cancelReason && (
                                            <p className="max-w-[220px] text-xs leading-relaxed text-[#687984] break-words max-sm:max-w-full">
                                                <strong className="block text-[#d45b5b] mb-1">
                                                    Cancellation Reason:
                                                </strong>
                                                {app.cancelReason}
                                            </p>
                                        )}

                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2 max-sm:w-full">

                                        {app.status === "pending" && (
                                            <>

                                                <button
                                                    onClick={() => updateStatus(app.id, "confirmed")}
                                                    className="flex items-center justify-center gap-[6px] px-3 py-[9px] bg-[#e5f8ef] text-[#20a36b] rounded-[7px] text-xs cursor-pointer transition-all hover:bg-[#20a36b] hover:text-white max-sm:flex-1"
                                                >
                                                    <FiCheck />
                                                    Confirm
                                                </button>

                                                <button
                                                    onClick={() => openRejectModal(app.id)}
                                                    className="flex items-center justify-center gap-[6px] px-3 py-[9px] bg-[#fff0f0] text-[#dc4c4c] rounded-[7px] text-xs cursor-pointer transition-all hover:bg-[#dc4c4c] hover:text-white max-sm:flex-1"
                                                >
                                                    <FiX />
                                                    Reject
                                                </button>

                                            </>
                                        )}

                                        {app.status === "confirmed" && (

                                            <button
                                                onClick={() => updateStatus(app.id, "completed")}
                                                className="flex items-center justify-center gap-[6px] px-3 py-[9px] bg-[#e8f1ff] text-[#3679d9] rounded-[7px] text-xs cursor-pointer transition-all hover:bg-[#3679d9] hover:text-white max-sm:w-full"
                                            >
                                                <FiCheckCircle />
                                                Complete
                                            </button>

                                        )}

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>

            </main>

        </div>

    );
}

export default DoctorAppointments;
