import './favouriteDoc.css';
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
        return <h2>Please login as a patient.</h2>;
    }

    // Get favorite doctors
    const favoriteDoctors = doctors.filter((doctor) => {
        return currentUser.favorites?.includes(doctor.id);
    });

    // Remove doctor from favorites
    const removeFavorite = (doctorId) => {

        const newFavorites = currentUser.favorites.filter((id) => {
            return String(id) !== String(doctorId);
        });

        const updatedUser = {
            ...currentUser,
            favorites: newFavorites
        };

        setCurrentUser(updatedUser);

        // Update patient data
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

        <div className="favorite-doctors-page">

            <Sidebar />

            <main className="favorite-main">

                {/* Page Header */}
                <div className="favorite-header">

                    <div>
                        <span className="favorite-subtitle">
                            YOUR PERSONAL COLLECTION
                        </span>

                        <h1>Favorite Doctors</h1>

                        <p>
                            Keep your favorite doctors close and book your next appointment easily.
                        </p>
                    </div>

                    <div className="favorite-header-icon">
                        <FiHeart />
                    </div>

                </div>

                {/* Favorite Statistics */}
                <div className="favorite-summary">

                    <div className="favorite-summary-icon">
                        <FiHeart />
                    </div>

                    <div>
                        <h2>{favoriteDoctors.length}</h2>
                        <p>Saved Doctors</p>
                    </div>

                </div>


                {/* Doctors List */}
                <div className="favorite-section-header">

                    <div>
                        <h2>My Saved Doctors</h2>
                        <p>Your selected medical specialists.</p>
                    </div>

                    <Link to="/doctors">
                        Find Doctors <FiArrowRight />
                    </Link>

                </div>


                {favoriteDoctors.length > 0 ? (

                    <div className="favorite-doctors-grid">

                        {favoriteDoctors.map((doctor) => (

                            <div className="favorite-doctor-card" key={doctor.id}>

                                {/* Doctor Image */}
                                <div className="favorite-doctor-image">

                                    {doctor.image ? (
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                        />
                                    ) : (
                                        <div className="favorite-doctor-placeholder">
                                            <FiUser />
                                        </div>
                                    )}

                                    <span className="favorite-heart">
                                        <FiHeart />
                                    </span>

                                    <span className={
                                        doctor.available
                                            ? "doctor-availability available"
                                            : "doctor-availability unavailable"
                                    }>
                                        {doctor.available ? "Available" : "Unavailable"}
                                    </span>

                                </div>


                                {/* Doctor Information */}
                                <div className="favorite-doctor-info">

                                    <h3>{doctor.name}</h3>

                                    <p className="favorite-specialty">
                                        {doctor.specialty}
                                    </p>

                                    <div className="favorite-doctor-details">

                                        <span>
                                            <FiMapPin />
                                            {doctor.city || "Location not specified"}
                                        </span>

                                        <span>
                                            <FiStar />
                                            {doctor.rating || "No rating"}
                                        </span>

                                    </div>

                                    <div className="favorite-doctor-footer">

                                        <Link
                                            to={`/doctors/${doctor.id}`}
                                            className="favorite-view-button"
                                        >
                                            View Profile
                                            <FiArrowRight />
                                        </Link>

                                        <button
                                            className="favorite-remove-button"
                                            onClick={() => removeFavorite(doctor.id)}
                                            title="Remove from favorites"
                                        >
                                            <FiTrash2 />
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    /* Empty State */
                    <div className="favorite-empty">

                        <div className="favorite-empty-icon">
                            <FiHeart />
                        </div>

                        <h2>No Favorite Doctors Yet</h2>

                        <p>
                            You haven't saved any doctors.
                            Explore our doctors and add your favorites here.
                        </p>

                        <Link to="/doctors">
                            Explore Doctors <FiArrowRight />
                        </Link>

                    </div>

                )}

            </main>

        </div>

    );

}

export default FavoriteDoctors;
