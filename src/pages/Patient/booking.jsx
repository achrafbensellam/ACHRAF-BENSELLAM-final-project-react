import './booking.css'
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import Sidebar from '../../layouts/sidebar';
function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        doctors,
        currentUser,
        appointments,
        setAppointments
    } = useContext(MyContext);

    const doctor = doctors.find(
        (item) => String(item.id) === id
    );
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [message, setMessage] = useState("");

    const availableTimes = [];

    if (doctor && doctor.workingHours) {
        let start = Number(doctor.workingHours.start.split(":")[0]);
        let end = Number(doctor.workingHours.end.split(":")[0]);
        let duration = doctor.slotDuration || 30;

        let currentMinutes = start * 60;

        while (currentMinutes + duration <= end * 60) {
            let hours = Math.floor(currentMinutes / 60);
            let minutes = currentMinutes % 60;

            let time =
                String(hours).padStart(2, "0") +
                ":" +
                String(minutes).padStart(2, "0");

            availableTimes.push(time);

            currentMinutes += duration;
        }
    }

    const isBooked = (time) => {
        return appointments.find((appointment) => {
            return (
                String(appointment.doctorId) === String(doctor.id) &&
                appointment.date === selectedDate &&
                appointment.time === time &&
                (appointment.status === "pending" ||
                    appointment.status === "confirmed")
            );
        });
    };

    const handleBooking = () => {
        setMessage("");

        if (!currentUser) {
            navigate("/login");
            return;
        }

        if (!selectedDate || !selectedTime) {
            setMessage("Please select a date and time first.");
            return;
        }

        const today = new Date();
        const chosenDate = new Date(selectedDate + "T00:00:00");

        if (
            chosenDate <
            new Date(today.getFullYear(), today.getMonth(), today.getDate())
        ) {
            setMessage("You cannot book an appointment in the past.");
            return;
        }

        if (doctor.daysOff && doctor.daysOff.includes(selectedDate)) {
            setMessage("The doctor is not available on this day.");
            return;
        }

        if (isBooked(selectedTime)) {
            setMessage("This time slot is already booked. Please choose another.");
            return;
        }

        const newAppointment = {
            id: Date.now(),
            patientId: currentUser.id,
            doctorId: doctor.id,
            date: selectedDate,
            time: selectedTime,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        setAppointments([...appointments, newAppointment]);

        setMessage("Your appointment request has been submitted successfully!");

        setSelectedTime("");
    };

    // Doctor not found
    if (!doctor) {
        return (
            <div className="booking-not-found">
                <h2>Doctor Not Found</h2>
            </div>
        );
    }

    // User not logged in
    if (!currentUser) {
        return (
            <div className="booking-not-found">
                <h2>Please log in first</h2>

                <button onClick={() => navigate("/login")}>
                    Login
                </button>
            </div>
        );
    }

    return (
        <section className="booking-page">
            <Sidebar/>
            <div className="booking-container">
                {/* <button
                    className="booking-back"
                    onClick={() => navigate(-1)}
                >
                    ← Go Back
                </button> */}
                <div className="booking-header">
                    <h1>Book Your Appointment</h1>
                    <p>Choose your preferred date and time</p>
                </div>

                {/* Doctor Information */}
                <div className="booking-doctor">

                    <img
                        src={doctor.image}
                        alt={doctor.name}
                    />

                    <div>
                        <h2>{doctor.name}</h2>
                        <p>{doctor.specialty}</p>
                        <span>{doctor.city}</span>
                        <h3>{doctor.price} MAD</h3>
                    </div>

                </div>

                {/* Select Date */}
                <div className="booking-section">

                    <h2>1. Select Date</h2>

                    <input
                        type="date"
                        min={new Date().toLocaleDateString("en-CA")}
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTime("");
                            setMessage("");
                        }}
                    />

                </div>

                {/* Select Time */}
                <div className="booking-section">

                    <h2>2. Select Time</h2>

                    {!selectedDate ? (
                        <p className="booking-hint">
                            Please select a date first.
                        </p>
                    ) : (
                        <div className="booking-times">

                            {availableTimes.map((time) => {

                                const booked = isBooked(time);

                                return (
                                    <button
                                        key={time}
                                        disabled={booked}
                                        className={
                                            selectedTime === time
                                                ? "time-slot selected"
                                                : "time-slot"
                                        }
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                        {booked && " (Booked)"}
                                    </button>
                                );
                            })}

                        </div>
                    )}

                </div>

                {/* Booking Message */}
                {message && (
                    <p className="booking-message">
                        {message}
                    </p>
                )}

                {/* Confirm Booking */}
                <button
                    className="confirm-booking"
                    onClick={handleBooking}
                >
                    Confirm Booking
                </button>

            </div>

        </section>
    );
}

export default Booking;
