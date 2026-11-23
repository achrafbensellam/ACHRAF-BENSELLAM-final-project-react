
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import Sidebar from "../../layouts/sidebar";

import {
    FiHeart,
    FiMapPin,
    FiStar,
    FiTrash2,
    FiArrowRight,
    FiUser
} from "react-icons/fi";

function FavoriteDoctors() {

    const {
        currentUser,
        setCurrentUser,
        doctors
    } = useContext(MyContext);

    // Check patient login
    if (!currentUser || currentUser.role !== "patient") {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f8fa] p-5">

                <div className="bg-white p-8 rounded-2xl shadow-sm text-center w-full max-w-md">

                    <FiUser className="text-5xl text-[#168b8b] mx-auto mb-4" />

                    <h2 className="text-[#193344] text-xl font-bold mb-3">
                        Please login as a patient.
                    </h2>

                    <Link
                        to="/login"
                        className="inline-block bg-[#168b8b] hover:bg-[#116f70] text-white px-6 py-3 rounded-lg transition"
                    >
                        Go to Login
                    </Link>

                </div>

            </div>
        );
    }

    // Get favorite doctors
    const favoriteDoctors = doctors.filter((doctor) => {

        return currentUser.favorites?.some((id) => {
            return String(id) === String(doctor.id);
        });

    });

    // Remove doctor from favorites
    const removeFavorite = (doctorId) => {

        const newFavorites = (currentUser.favorites || []).filter((id) => {
            return String(id) !== String(doctorId);
        });

        const updatedUser = {
            ...currentUser,
            favorites: newFavorites
        };

        setCurrentUser(updatedUser);

        // Update patient data in localStorage
        const savedPatients = JSON.parse(
            localStorage.getItem("patient")
        ) || [];

        const updatedPatients = savedPatients.map((item) => {

            if (String(item.id) === String(currentUser.id)) {

                return {
                    ...item,
                    favorites: newFavorites
                };

            }

            return item;

        });

        localStorage.setItem(
            "patient",
            JSON.stringify(updatedPatients)
        );

    };

    return (

        <div className="
            min-h-screen
            ml-[260px]
            w-[calc(100%-260px)]
            box-border
            bg-[#f5f8fa]
            text-[#193344]
            font-sans
            px-10 py-10
            overflow-x-hidden

            max-[1100px]:ml-[210px]
            max-[1100px]:w-[calc(100%-210px)]
            max-[1100px]:px-5
            max-[1100px]:py-[30px]

            max-[640px]:ml-0
            max-[640px]:w-full
            max-[640px]:px-[15px]
            max-[640px]:pt-[25px]
            max-[640px]:pb-[120px]
        ">

            <Sidebar />

            <main className="max-w-[1400px] mx-auto min-w-0">

                {/* PAGE HEADER */}
                <div className="
                    flex justify-between items-center
                    gap-5 mb-[30px]

                    max-[640px]:items-start
                ">

                    <div className="min-w-0">

                        <span className="text-[#168b8b] text-xs font-bold tracking-[1.5px]">
                            YOUR PERSONAL COLLECTION
                        </span>

                        <h1 className="
                            text-[32px]
                            font-bold
                            my-[10px]
                            text-[#193344]

                            max-[640px]:text-[26px]
                        ">
                            Favorite Doctors
                        </h1>

                        <p className="text-[#82919b] leading-[1.6] text-sm sm:text-base">
                            Keep your favorite doctors close and book your next appointment easily.
                        </p>

                    </div>

                    <div className="
                        w-[65px] h-[65px]
                        shrink-0
                        flex items-center justify-center
                        bg-[#ffe9ed]
                        text-[#e45c78]
                        rounded-[18px]
                        text-[30px]

                        max-[640px]:w-[50px]
                        max-[640px]:h-[50px]
                        max-[640px]:text-[23px]
                    ">
                        <FiHeart />
                    </div>

                </div>

                {/* FAVORITE STATISTICS */}
                <div className="
                    flex items-center gap-[18px]
                    bg-white
                    p-[22px]
                    border border-[#e8eef1]
                    rounded-[14px]
                    mb-[35px]

                    max-[640px]:p-4
                ">

                    <div className="
                        w-[50px] h-[50px]
                        shrink-0
                        flex items-center justify-center
                        bg-[#ffe9ed]
                        text-[#e45c78]
                        rounded-xl
                        text-[22px]
                    ">
                        <FiHeart />
                    </div>

                    <div>

                        <h2 className="text-[25px] font-bold mb-[5px]">
                            {favoriteDoctors.length}
                        </h2>

                        <p className="text-[#82919b] text-[13px]">
                            Saved Doctors
                        </p>

                    </div>

                </div>

                {/* SECTION HEADER */}
                <div className="
                    flex justify-between items-center
                    gap-[15px]
                    mb-[22px]

                    max-[640px]:flex-col
                    max-[640px]:items-start
                ">

                    <div>

                        <h2 className="text-[21px] font-bold mb-[7px]">
                            My Saved Doctors
                        </h2>

                        <p className="text-[#82919b] text-sm">
                            Your selected medical specialists.
                        </p>

                    </div>

                    <Link
                        to="/doctors"
                        className="
                            flex items-center gap-2
                            text-[#168b8b]
                            text-sm
                            font-bold
                            hover:text-[#116f70]
                            transition
                            whitespace-nowrap
                        "
                    >
                        Find Doctors
                        <FiArrowRight />
                    </Link>

                </div>

                {/* DOCTORS GRID */}
                {favoriteDoctors.length > 0 ? (

                    <div className="
                        grid
                        grid-cols-3
                        gap-[22px]

                        max-[1100px]:grid-cols-2
                        max-[700px]:grid-cols-1
                    ">

                        {favoriteDoctors.map((doctor) => (

                            <div
                                key={doctor.id}
                                className="
                                    bg-white
                                    border border-[#e8eef1]
                                    rounded-[14px]
                                    overflow-hidden
                                    min-w-0
                                    transition
                                    hover:-translate-y-[5px]
                                    hover:shadow-[0_10px_25px_rgba(25,51,68,0.08)]
                                "
                            >

                                {/* DOCTOR IMAGE */}
                                <div className="
                                    h-[190px]
                                    relative
                                    bg-[#e8f1f3]
                                    overflow-hidden

                                    max-[700px]:h-[220px]
                                ">

                                    {doctor.image ? (

                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <div className="
                                            w-full h-full
                                            flex items-center justify-center
                                            text-[#168b8b]
                                            text-[65px]
                                        ">
                                            <FiUser />
                                        </div>

                                    )}

                                    {/* FAVORITE HEART */}
                                    <span className="
                                        absolute top-[13px] right-[13px]
                                        w-[35px] h-[35px]
                                        flex items-center justify-center
                                        bg-white
                                        text-[#e45c78]
                                        rounded-full
                                        text-[17px]
                                        shadow-sm
                                    ">
                                        <FiHeart />
                                    </span>

                                    {/* AVAILABILITY */}
                                    <span className={`
                                        absolute bottom-3 left-3
                                        px-[11px] py-[7px]
                                        rounded-full
                                        text-[11px]
                                        font-bold

                                        ${doctor.available
                                            ? "bg-[#e3f7eb] text-[#259653]"
                                            : "bg-[#ffe8e8] text-[#d94b4b]"
                                        }
                                    `}>
                                        {doctor.available ? "Available" : "Unavailable"}
                                    </span>

                                </div>

                                {/* DOCTOR INFORMATION */}
                                <div className="p-5">

                                    <h3 className="text-lg font-bold mb-[7px] break-words">
                                        {doctor.name}
                                    </h3>

                                    <p className="text-[#168b8b] text-sm font-bold mb-[18px]">
                                        {doctor.specialty}
                                    </p>

                                    {/* DETAILS */}
                                    <div className="
                                        flex justify-between flex-wrap
                                        gap-[10px]
                                        pb-[18px]
                                        border-b border-[#edf1f3]
                                    ">

                                        <span className="flex items-center gap-[6px] text-[#82919b] text-xs min-w-0">

                                            <FiMapPin className="text-[#168b8b] shrink-0" />

                                            <span className="break-words">
                                                {doctor.city || "Location not specified"}
                                            </span>

                                        </span>

                                        <span className="flex items-center gap-[6px] text-[#82919b] text-xs">

                                            <FiStar className="text-[#168b8b] shrink-0" />

                                            {doctor.rating || "No rating"}

                                        </span>

                                    </div>

                                    {/* CARD FOOTER */}
                                    <div className="flex items-center gap-[10px] mt-[17px]">

                                        <Link
                                            to={`/doctors/${doctor.id}`}
                                            className="
                                                flex-1 min-w-0
                                                flex items-center justify-center gap-2
                                                px-3 py-[11px]
                                                rounded-lg
                                                bg-[#168b8b]
                                                hover:bg-[#116f70]
                                                text-white
                                                text-[13px]
                                                font-bold
                                                transition
                                            "
                                        >
                                            View Profile
                                            <FiArrowRight className="shrink-0" />
                                        </Link>

                                        <button
                                            onClick={() => removeFavorite(doctor.id)}
                                            title="Remove from favorites"
                                            aria-label={`Remove ${doctor.name} from favorites`}
                                            className="
                                                w-10 h-10
                                                shrink-0
                                                flex items-center justify-center
                                                border border-[#ffdada]
                                                rounded-lg
                                                bg-[#fff3f3]
                                                hover:bg-[#ffe1e1]
                                                text-[#e45c5c]
                                                text-[17px]
                                                cursor-pointer
                                                transition
                                            "
                                        >
                                            <FiTrash2 />
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    /* EMPTY STATE */
                    <div className="
                        text-center
                        bg-white
                        px-[25px] py-[65px]
                        border border-[#e8eef1]
                        rounded-[14px]
                    ">

                        <div className="
                            w-[75px] h-[75px]
                            flex items-center justify-center
                            mx-auto mb-5
                            bg-[#ffe9ed]
                            text-[#e45c78]
                            rounded-full
                            text-[32px]
                        ">
                            <FiHeart />
                        </div>

                        <h2 className="text-[22px] font-bold mb-[10px]">
                            No Favorite Doctors Yet
                        </h2>

                        <p className="
                            max-w-[430px]
                            mx-auto mb-[22px]
                            text-[#82919b]
                            leading-[1.7]
                            text-sm
                        ">
                            You haven't saved any doctors.
                            Explore our doctors and add your favorites here.
                        </p>

                        <Link
                            to="/doctors"
                            className="
                                inline-flex items-center justify-center gap-2
                                px-[18px] py-3
                                bg-[#168b8b]
                                hover:bg-[#116f70]
                                text-white
                                rounded-lg
                                text-sm
                                font-bold
                                transition
                            "
                        >
                            Explore Doctors
                            <FiArrowRight />
                        </Link>

                    </div>

                )}

            </main>

        </div>

    );

}

export default FavoriteDoctors;

