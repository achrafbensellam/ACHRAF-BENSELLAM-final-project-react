import './sidebare.css';

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../utils/mycontext";

import {
    FiHome,
    FiCalendar,
    FiClock,
    FiUsers,
    FiLogOut
} from "react-icons/fi";


function DoctorSidebar() {
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
                <p>Doctor Portal</p>
            </div>

            <nav className="sidebar-navigation">

                <p className="sidebar-heading">Main Menu</p>

                <NavLink
                    to="/doctor/dashboard"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    <FiHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/doctor/appointments"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    <FiCalendar />
                    Appointments
                </NavLink>

                <NavLink
                    to="/doctor/schedule"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    <FiClock />
                    My Schedule
                </NavLink>

                <NavLink
                    to="/doctor/patients"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    <FiUsers />
                    My Patients
                </NavLink>

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

export default DoctorSidebar;