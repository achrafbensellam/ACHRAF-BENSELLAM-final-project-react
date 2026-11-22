import './adminSidebar.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../utils/mycontext";

import {
    FiHome,
    FiUsers,
    FiUser,
    FiCalendar,
    FiSettings,
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

    return (
        <aside className="admin-sidebar">

            {/* Logo */}
            <div className="admin-sidebar-logo">
                <h2>MedConnect</h2>
                <p>Admin Panel</p>
            </div>

            {/* Admin Info */}
            <div className="admin-sidebar-user">
                <div className="admin-user-image">
                    <FiUser />
                </div>

                <div>
                    <h3>{currentUser?.name}</h3>
                    <p>Administrator</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="admin-sidebar-nav">

                <NavLink to="/admin/dashboard">
                    <FiHome />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/doctors">
                    <FiUsers />
                    <span>Manage Doctors</span>
                </NavLink>

                <NavLink to="/admin/patients">
                    <FiUser />
                    <span>Manage Patients</span>
                </NavLink>

                <NavLink to="/admin/appointments">
                    <FiCalendar />
                    <span>Manage Appointments</span>
                </NavLink>

                <NavLink to="/admin/specialties">
                    <FiSettings />
                    <span>Manage Specialties</span>
                </NavLink>

            </nav>

            {/* Logout */}
            <div className="admin-sidebar-logout">

                <button onClick={handleLogout}>
                    <FiLogOut />
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    );
}

export default AdminSidebar;
