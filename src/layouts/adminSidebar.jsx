
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../utils/mycontext";

import {
    FiHome,
    FiUsers,
    FiUser,
    FiCalendar,
    FiLogOut
} from "react-icons/fi";

function AdminSidebar() {

    const { currentUser, setCurrentUser } = useContext(MyContext);
    const navigate = useNavigate();

    // Logout
    const handleLogout = () => {
        setCurrentUser(null);
        navigate("/");
    };

    // Navigation Link Style
    const linkStyle = ({ isActive }) => `
        flex items-center gap-[13px]
        rounded-lg px-3 py-[13px]
        text-sm no-underline
        transition-all duration-300
        hover:bg-[#173f80] hover:text-white
        ${isActive
            ? "bg-blue-600 text-white"
            : "text-blue-100"
        }
        max-sm:flex-1 max-sm:flex-col
        max-sm:justify-center max-sm:gap-0
        max-sm:px-1 max-sm:py-[10px]
    `;

    return (

        <aside className="
            fixed left-0 top-0 z-[1000]
            flex h-screen w-[260px]
            flex-col
            bg-[#4a84ef] px-[18px] py-[25px]
            text-white

            max-lg:w-[210px]
            max-lg:px-3 max-lg:py-5

            max-sm:bottom-0 max-sm:left-0
            max-sm:top-auto max-sm:h-[75px]
            max-sm:w-full
            max-sm:flex-row
            max-sm:items-center
            max-sm:p-2
        ">

            {/* LOGO */}
            <div className="
                mb-[35px] text-center
                max-sm:hidden
            ">

                <h2 className="text-[23px] font-bold">
                    MedConnect
                </h2>

                <p className="mt-[5px] text-xs text-blue-200">
                    Admin Panel
                </p>

            </div>

            {/* ADMIN INFO */}
            <div className="
                mb-[30px] flex items-center gap-3
                border-y border-white/15
                px-[10px] py-[15px]
                max-sm:hidden
            ">

                <div className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full bg-blue-600
                    text-xl text-white
                ">
                    <FiUser />
                </div>

                <div className="min-w-0">

                    <h3 className="mb-[5px] truncate text-sm font-semibold">
                        {currentUser?.name}
                    </h3>

                    <p className="text-xs text-blue-200">
                        Administrator
                    </p>

                </div>

            </div>

            {/* NAVIGATION */}
            <nav className="
                flex flex-col gap-[10px]
                max-sm:w-full
                max-sm:flex-row
                max-sm:items-center
                max-sm:justify-around
                max-sm:gap-[3px]
            ">

                <NavLink
                    to="/admin/dashboard"
                    className={linkStyle}
                    title="Dashboard"
                >
                    <FiHome className="shrink-0 text-[19px]" />
                    <span className="max-sm:hidden">
                        Dashboard
                    </span>
                </NavLink>

                <NavLink
                    to="/admin/doctors"
                    className={linkStyle}
                    title="Manage Doctors"
                >
                    <FiUsers className="shrink-0 text-[19px]" />
                    <span className="max-sm:hidden">
                        Manage Doctors
                    </span>
                </NavLink>

                <NavLink
                    to="/admin/patients"
                    className={linkStyle}
                    title="Manage Patients"
                >
                    <FiUser className="shrink-0 text-[19px]" />
                    <span className="max-sm:hidden">
                        Manage Patients
                    </span>
                </NavLink>

                <NavLink
                    to="/admin/appointments"
                    className={linkStyle}
                    title="Manage Appointments"
                >
                    <FiCalendar className="shrink-0 text-[19px]" />
                    <span className="max-sm:hidden">
                        Manage Appointments
                    </span>
                </NavLink>

            </nav>

            {/* LOGOUT */}
            <div className="
                mt-auto
                max-sm:mt-0
            ">

                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="
                        flex w-full items-center gap-[13px]
                        rounded-lg border-none
                        bg-red-100 px-3 py-[13px]
                        text-sm text-red-600
                        transition-all duration-300
                        hover:bg-red-200 hover:text-red-700

                        max-sm:w-auto
                        max-sm:justify-center
                        max-sm:p-[10px]
                    "
                >

                    <FiLogOut className="shrink-0 text-[19px]" />

                    <span className="max-sm:hidden">
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );
}

export default AdminSidebar;
