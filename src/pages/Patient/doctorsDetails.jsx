import './doctorsDetails.css'
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";

import {
  FiArrowLeft,
  FiMapPin,
  FiStar,
  FiClock,
  FiCalendar,
  FiPhone,
  FiMail,
  FiGlobe,
  FiBriefcase,
  FiCheckCircle
} from "react-icons/fi";

function DoctorDetails() {

  const { id } = useParams();
  const { doctors } = useContext(MyContext);
  const doctor = doctors.find(
    (item) => String(item.id) === id
  );

  if (!doctor) {
    return (
      <div className="doctor-not-found">
        <h2>Doctor Not Found</h2>
        <p>The doctor you are looking for does not exist.</p>
        <Link to="/doctors">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <main className="doctor-details-page">

      <Link to="/doctors" className="back-doctors">
        <FiArrowLeft />
        Back to Doctors
      </Link>
      <section className="doctor-profile">

        <div className="profile-image">
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} />
          ) : (
            <div className="profile-image-placeholder">
              {doctor.name.charAt(4)}
            </div>
          )}
        </div>

        <div className="profile-information">

          <span className="profile-specialty">
            {doctor.specialty}
          </span>

          <h1>{doctor.name}</h1>

          <p className="profile-description">
            {doctor.description ||
              `Experienced ${doctor.specialty} specialist dedicated to providing quality healthcare and personalized treatment.`}
          </p>

          <div className="profile-status">
            <span className={doctor.available ? "status-open" : "status-closed"}>
              <FiCheckCircle />
              {doctor.available ? "Available" : "Unavailable"}
            </span>
          </div>

          <div className="profile-basic-info">

            <span>
              <FiMapPin />
              {doctor.city}
            </span>

            <span>
              <FiStar className="profile-star" />
              {doctor.rating || "New"} Rating
            </span>

            <span>
              <FiBriefcase />
              {doctor.experienceYears} Years Experience
            </span>

          </div>

          <div className="profile-price">
            <strong>{doctor.price} MAD</strong>
            <span> / Consultation</span>
          </div>

          {doctor.available ? (
            <Link
              to={`/booking/${doctor.id}`}
              className="profile-book-button"
            >
              <FiCalendar />
              Book Appointment
            </Link>
          ) : (
            <button className="profile-book-button disabled-book" disabled>
              Currently Unavailable
            </button>
          )}

        </div>

      </section>
      <section className="doctor-more-info">

        <div className="info-card">
          <div className="info-card-icon">
            <FiCalendar />
          </div>

          <h3>Working Days</h3>

          <div className="info-card-content">
            {doctor.workingDays?.length > 0 ? (
              doctor.workingDays.map((day) => (
                <span key={day}>{day}</span>
              ))
            ) : (
              <p>Not specified</p>
            )}
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <FiClock />
          </div>

          <h3>Working Hours</h3>

          <p>
            {doctor.workingHours?.start || "--:--"}
            {" - "}
            {doctor.workingHours?.end || "--:--"}
          </p>

          <small>
            Appointment duration: {doctor.slotDuration || "Not specified"} minutes
          </small>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <FiGlobe />
          </div>

          <h3>Languages</h3>

          <div className="info-card-content">
            {doctor.languages?.length > 0 ? (
              doctor.languages.map((language) => (
                <span key={language}>{language}</span>
              ))
            ) : (
              <p>Not specified</p>
            )}
          </div>
        </div>

      </section>

      <section className="doctor-contact">
        <h2>Contact Information</h2>

        <div className="contact-items">

          <div>
            <FiPhone />
            <span>{doctor.phone || "Not provided"}</span>
          </div>

          <div>
            <FiMail />
            <span>{doctor.email || "Not provided"}</span>
          </div>

        </div>

      </section>

    </main>
  );
}

export default DoctorDetails;
