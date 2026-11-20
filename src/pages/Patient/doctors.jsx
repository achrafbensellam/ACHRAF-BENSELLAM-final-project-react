
import './doctors.css';

import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import {
  FiSearch,
  FiMapPin,
  FiStar,
  FiHeart,
  FiCalendar,
  FiClock,FiArrowLeft
} from "react-icons/fi";


function Doctors() {
  const { doctors, currentUser, setCurrentUser } = useContext(MyContext);

  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const navigate = useNavigate()
  const specialties = ["All"];

doctors.forEach((doctor) => {
  if (!specialties.includes(doctor.specialty)) {
    specialties.push(doctor.specialty);
  }
});

 
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
        doctor.city.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "All" ||
        doctor.specialty === selectedSpecialty;

      const matchesAvailability =
        !availableOnly || doctor.available === true;

      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [doctors, search, selectedSpecialty, availableOnly]);
console.log(filteredDoctors);

  const toggleFavorite = (doctorId) => {
    if (!currentUser) return;

    const favorites = currentUser.favorites || [];

    const updatedFavorites = favorites.includes(doctorId)? favorites.filter((id) => id !== doctorId): [...favorites, doctorId];

    setCurrentUser({
      ...currentUser,
      favorites: updatedFavorites
    });
  };

  return (
    <main className="doctors-page">
         <button
                className="back-doctors"
                onClick={() => navigate('/patient/dashboard')}
              >
                <FiArrowLeft />
                Go Back
              </button>
      <section className="doctors-heading">
        <span className="doctors-small-title">MEDCONNECT</span>

        <h1>Find Your Doctor</h1>

        <p>
          Find experienced doctors and book your appointment
          with confidence.
        </p>
      </section>
      <section className="doctors-filters">

        <div className="doctors-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search by doctor, specialty or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty === "All" ? "All Specialties" : specialty}
            </option>
          ))}
        </select>

        <label className="available-filter">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          Available only
        </label>

      </section>

      <section className="doctors-results">

        <div className="doctors-results-header">
          <h2>Our Doctors</h2>

          <span>
            {filteredDoctors.length} doctors found
          </span>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="doctors-grid">

            {filteredDoctors.map((doctor) => {

              const isFavorite =
                currentUser?.favorites?.includes(doctor.id);

              return (
                <div className="doctor-card" key={doctor.id}>

                  <div className="doctor-image-container">

                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="doctor-image"
                      />
                    ) : (
                      <div className="doctor-image-placeholder">
                        {doctor.name.charAt(4)}
                      </div>
                    )}

                    <span
                      className={`doctor-status ${
                        doctor.available ? "is-available" : "is-unavailable"
                      }`}
                    >
                      {doctor.available ? "Available" : "Unavailable"}
                    </span>

                    <button
                      className={`favorite-button ${
                        isFavorite ? "favorite-active" : ""
                      }`}
                      onClick={() => toggleFavorite(doctor.id)}
                      disabled={!currentUser}
                      title={
                        currentUser
                          ? "Add to favorites"
                          : "Login to save favorites"
                      }
                    >
                      <FiHeart />
                    </button>

                  </div>

                  <div className="doctor-info">

                    <span className="doctor-specialty">
                      {doctor.specialty}
                    </span>

                    <h3>{doctor.name}</h3>

                    <div className="doctor-location">
                      <FiMapPin />
                      <span>{doctor.city}</span>
                    </div>

                    <div className="doctor-details">

                      <span>
                        <FiStar className="star-icon" />
                        {doctor.rating || "New"}
                      </span>

                      <span>
                        <FiClock />
                        {doctor.experienceYears} Years
                      </span>

                    </div>

                    <div className="doctor-price">
                      <strong>{doctor.price} MAD</strong>
                      <span>/ consultation</span>
                    </div>

                    <div className="doctor-card-buttons">

                      <Link
                        to={`/doctors/${doctor.id}`}
                        className="doctor-details-btn"
                      >
                        View Profile
                      </Link>

                      <Link
                        to={`/booking/${doctor.id}`}
                        className="doctor-book-btn"
                        onClick={(e) => {
                          if (!doctor.available) e.preventDefault();
                        }}
                        aria-disabled={!doctor.available}
                      >
                        <FiCalendar />
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="doctors-empty">
            <FiSearch />
            <h3>No doctors found</h3>
            <p>Try another name or specialty.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedSpecialty("All");
                setAvailableOnly(false);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>

    </main>
  );
}

export default Doctors;