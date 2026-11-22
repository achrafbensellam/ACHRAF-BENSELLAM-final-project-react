
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

            // Close details if deleted patient is selected
            if (
                selectedPatient &&
                String(selectedPatient.id) === String(patientId)
            ) {
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

            <div className="
                min-h-screen
                ml-[260px]
                w-[calc(100%-260px)]
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

                        max-sm:text-[24px]
                    ">
                        Manage Patients
                    </h1>

                    <p className="text-sm text-[#71838c]">
                        View and manage all registered patients.
                    </p>

                </div>

                {/* Search and Count */}
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-5
                    mb-[25px]

                    max-sm:flex-col
                    max-sm:items-stretch
                ">

                    {/* Search */}
                    <div className="
                        flex
                        items-center
                        gap-[10px]
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
                            placeholder="Search by name, email or city..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                                w-full
                                py-[13px]
                                border-none
                                outline-none
                                text-sm
                                text-[#193344]
                                bg-transparent
                            "
                        />

                    </div>

                    {/* Total Patients */}
                    <p className="
                        text-sm
                        text-[#71838c]
                        whitespace-nowrap
                    ">
                        Total Patients:

                        <strong className="
                            text-[#159b91]
                            ml-[7px]
                            text-[17px]
                        ">
                            {patient.length}
                        </strong>
                    </p>

                </div>

                {/* Patient Details */}
                {selectedPatient && (

                    <div className="
                        bg-white
                        border border-[#e1e9ec]
                        rounded-xl
                        p-[22px]
                        mb-[25px]
                        shadow-[0_3px_12px_rgba(25,60,75,0.05)]

                        max-sm:p-[18px]
                    ">

                        {/* Details Header */}
                        <div className="
                            flex
                            justify-between
                            items-center
                            mb-5
                        ">

                            <h2 className="
                                text-[19px]
                                font-bold
                                text-[#173b4d]
                            ">
                                Patient Details
                            </h2>

                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="
                                    border-none
                                    bg-[#fff0f0]
                                    text-[#e05252]
                                    p-2
                                    rounded-[7px]
                                    cursor-pointer
                                    text-[17px]
                                    transition-all
                                    hover:bg-[#e05252]
                                    hover:text-white
                                "
                            >
                                <FiX />
                            </button>

                        </div>

                        {/* Details Information */}
                        <div className="
                            grid
                            grid-cols-2
                            gap-[15px]

                            max-sm:grid-cols-1
                        ">

                            <p className="text-sm text-[#71838c] break-words">
                                <strong className="text-[#173b4d] mr-[7px]">
                                    Name:
                                </strong>

                                {selectedPatient.name || "Not provided"}
                            </p>

                            <p className="text-sm text-[#71838c] break-words">
                                <strong className="text-[#173b4d] mr-[7px]">
                                    Email:
                                </strong>

                                {selectedPatient.email || "Not provided"}
                            </p>

                            <p className="text-sm text-[#71838c] break-words">
                                <strong className="text-[#173b4d] mr-[7px]">
                                    Phone:
                                </strong>

                                {selectedPatient.phone || "Not provided"}
                            </p>

                            <p className="text-sm text-[#71838c]">
                                <strong className="text-[#173b4d] mr-[7px]">
                                    City:
                                </strong>

                                {selectedPatient.city || "Not provided"}
                            </p>

                            <p className="text-sm text-[#71838c]">
                                <strong className="text-[#173b4d] mr-[7px]">
                                    Gender:
                                </strong>

                                {selectedPatient.gender || "Not provided"}
                            </p>

                            <p className="text-sm text-[#71838c]">
                                <strong className="text-[#173b4d] mr-[7px]">
                                    Age:
                                </strong>

                                {selectedPatient.age || "Not provided"}
                            </p>

                        </div>

                    </div>
                )}

                {/* Patients List */}
                <div className="flex flex-col gap-[15px]">

                    {filteredPatients.length === 0 ? (

                        <p className="
                            text-center
                            p-10
                            text-[#81939b]
                            bg-white
                            rounded-xl
                            border border-[#e8eff1]
                        ">
                            No patients found.
                        </p>

                    ) : (

                        filteredPatients.map((patientInfo) => (

                            <div
                                key={patientInfo.id}
                                className="
                                    flex
                                    items-center
                                    gap-5
                                    bg-white
                                    p-5
                                    rounded-xl
                                    border border-[#e8eff1]
                                    shadow-[0_3px_12px_rgba(25,60,75,0.05)]
                                    transition-all duration-300

                                    hover:-translate-y-[3px]
                                    hover:shadow-[0_6px_18px_rgba(25,60,75,0.08)]

                                    max-lg:flex-wrap

                                    max-sm:flex-col
                                    max-sm:items-start
                                "
                            >

                                {/* Patient Image */}
                                <img
                                    src={
                                        patientInfo.image ||
                                        "https://via.placeholder.com/100"
                                    }
                                    alt={patientInfo.name || "Patient"}
                                    className="
                                        w-[75px]
                                        h-[75px]
                                        rounded-full
                                        object-cover
                                        bg-[#e8f7f5]
                                        shrink-0
                                    "
                                />

                                {/* Patient Information */}
                                <div className="flex-1 min-w-0">

                                    <h3 className="
                                        text-[17px]
                                        font-bold
                                        text-[#173b4d]
                                        mb-2
                                    ">
                                        {patientInfo.name || "Unnamed Patient"}
                                    </h3>

                                    <p className="
                                        text-[13px]
                                        text-[#71838c]
                                        my-[5px]
                                        break-words
                                    ">
                                        {patientInfo.email || "No email address"}
                                    </p>

                                    <p className="
                                        text-[13px]
                                        text-[#71838c]
                                        my-[5px]
                                    ">
                                        {patientInfo.phone || "No phone number"}
                                    </p>

                                    <p className="
                                        text-[13px]
                                        text-[#71838c]
                                        my-[5px]
                                    ">
                                        {patientInfo.city || "City not provided"}
                                    </p>

                                </div>

                                {/* Card Actions */}
                                <div className="
                                    flex
                                    gap-[10px]

                                    max-sm:w-full
                                ">

                                    {/* View Button */}
                                    <button
                                        onClick={() => handleView(patientInfo)}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-[7px]
                                            px-[14px]
                                            py-[10px]
                                            border-none
                                            rounded-lg
                                            bg-[#e8f7f5]
                                            text-[#159b91]
                                            cursor-pointer
                                            text-[13px]
                                            font-semibold
                                            transition-all
                                            hover:bg-[#159b91]
                                            hover:text-white

                                            max-sm:flex-1
                                        "
                                    >
                                        <FiEye />
                                        View
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(patientInfo.id)}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-[7px]
                                            px-[14px]
                                            py-[10px]
                                            border-none
                                            rounded-lg
                                            bg-[#fff0f0]
                                            text-[#e05252]
                                            cursor-pointer
                                            text-[13px]
                                            font-semibold
                                            transition-all
                                            hover:bg-[#e05252]
                                            hover:text-white

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

export default ManagePatients;
