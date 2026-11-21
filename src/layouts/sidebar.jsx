import './sidebare.css'

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../utils/mycontext";

import {
    FiHome,
    FiCalendar,
    FiUser,
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

    return (
        <aside className="patient-sidebar">

            <div className="sidebar-logo">
                <h2>MedConnect</h2>
                <p>Your Health, Our Priority</p>
            </div>

            <nav className="sidebar-navigation">

                <p className="sidebar-heading">Main Menu</p>

                <NavLink to="/patient/dashboard"
                className={({ isActive }) => isActive ? "active" : ""}>
                    <FiHome />
                    Dashboard
                </NavLink>

                <NavLink to="/patient/appointments"
                className={({ isActive }) => isActive ? "active" : ""}>
                    <FiCalendar />
                    My Appointments
                </NavLink>

                <NavLink to="/doctors"
                className={({ isActive }) => isActive ? "active" : ""}>
                    <FiSearch />
                    Find Doctors
                </NavLink>

                <NavLink to="/patient/favorites"
                className={({ isActive }) => isActive ? "active" : ""}>
                    <FiHeart />
                    Favorite Doctors
                </NavLink>

                {/* <p className="sidebar-heading">Account</p>

                <Link to="/patient/profile">
                    <FiUser />
                    My Profile
                </Link> */}

            </nav>

            <div className="sidebar-logout">
                <button onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;
