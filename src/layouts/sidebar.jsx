
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../utils/mycontext";

import {
    FiHome,
    FiCalendar,
    FiHeart,
    FiSearch,
    FiLogOut
} from "react-icons/fi";

function Sidebar() {

    const { setCurrentUser } = useContext(MyContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("loggedUser");
        navigate("/");
    };

    // Navigation link style
    const linkStyle = ({ isActive }) => `
        flex items-center gap-[13px]
        px-4 py-[14px]
        rounded-[10px]
        text-[15px] font-medium
        no-underline
        transition-all duration-300

        max-sm:flex-1
        max-sm:min-w-0
        max-sm:flex-col
        max-sm:justify-center
        max-sm:gap-0
        max-sm:px-1
        max-sm:py-3

        ${isActive
            ? "bg-[#eaf7f6] text-[#159b91] font-semibold"
            : "text-[#526575] hover:bg-[#eaf7f6] hover:text-[#159b91]"
        }
    `;

    // Icon style
    const iconStyle = `
        w-5 h-5 shrink-0
        max-sm:w-[25px]
        max-sm:h-[25px]
    `;

    return (

        <aside className="
            fixed top-0 left-0
            w-[260px] h-screen
            bg-white
            border-r border-[#e8eef2]
            px-[18px] py-[25px]
            z-[1000]
            flex flex-col
            overflow-y-auto

            max-lg:w-[210px]

            max-sm:top-auto
            max-sm:bottom-0
            max-sm:left-0
            max-sm:w-full
            max-sm:h-auto
            max-sm:min-h-0
            max-sm:flex-row
            max-sm:items-center
            max-sm:justify-between
            max-sm:gap-1
            max-sm:px-2
            max-sm:py-2
            max-sm:pb-[calc(8px+env(safe-area-inset-bottom))]
            max-sm:border-r-0
            max-sm:border-t
            max-sm:overflow-visible
            max-sm:shadow-[0_-4px_15px_rgba(0,0,0,0.06)]
        ">

            {/* Logo */}
            <div className="max-sm:hidden">

                <h2 className="
                    text-[23px]
                    text-[#173b4d]
                    font-bold
                    text-center
                    mb-2
                ">
                    MedConnect
                </h2>

                <p className="
                    text-center
                    text-sm
                    text-[#82919b]
                    mb-[35px]
                ">
                    Your Health, Our Priority
                </p>

            </div>

            {/* Navigation */}
            <nav className="
                flex flex-col
                gap-[15px]
                flex-1

                max-sm:flex-row
                max-sm:items-center
                max-sm:justify-around
                max-sm:gap-1
                max-sm:min-w-0
                max-sm:w-full
            ">

                <p className="
                    text-xs
                    font-semibold
                    text-[#82919b]
                    uppercase
                    tracking-wider
                    mb-1
                    max-sm:hidden
                ">
                    Main Menu
                </p>

                {/* Dashboard */}
                <NavLink
                    to="/patient/dashboard"
                    className={linkStyle}
                    title="Dashboard"
                >
                    <FiHome className={iconStyle} />
                    <span className="max-sm:hidden">
                        Dashboard
                    </span>
                </NavLink>

                {/* Appointments */}
                <NavLink
                    to="/patient/appointments"
                    className={linkStyle}
                    title="My Appointments"
                >
                    <FiCalendar className={iconStyle} />
                    <span className="max-sm:hidden">
                        My Appointments
                    </span>
                </NavLink>

                {/* Find Doctors */}
                <NavLink
                    to="/doctors"
                    className={linkStyle}
                    title="Find Doctors"
                >
                    <FiSearch className={iconStyle} />
                    <span className="max-sm:hidden">
                        Find Doctors
                    </span>
                </NavLink>

                {/* Favorite Doctors */}
                <NavLink
                    to="/patient/favorites"
                    className={linkStyle}
                    title="Favorite Doctors"
                >
                    <FiHeart className={iconStyle} />
                    <span className="max-sm:hidden">
                        Favorite Doctors
                    </span>
                </NavLink>

            </nav>

            {/* Logout */}
            <div className="
                mt-auto
                pt-5
                border-t border-[#e8eef2]

                max-sm:mt-0
                max-sm:pt-0
                max-sm:border-0
                max-sm:shrink-0
            ">

                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="
                        w-full
                        flex items-center gap-3
                        px-4 py-[14px]
                        rounded-[10px]
                        bg-transparent
                        text-[#e05252]
                        text-[15px]
                        font-medium
                        cursor-pointer
                        transition-all
                        hover:bg-[#fff0f0]

                        max-sm:w-auto
                        max-sm:flex-col
                        max-sm:justify-center
                        max-sm:gap-0
                        max-sm:px-3
                        max-sm:py-3
                    "
                >
                    <FiLogOut className="
                        w-5 h-5 shrink-0
                        max-sm:w-[25px]
                        max-sm:h-[25px]
                    " />

                    <span className="max-sm:hidden">
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );
}

export default Sidebar;
