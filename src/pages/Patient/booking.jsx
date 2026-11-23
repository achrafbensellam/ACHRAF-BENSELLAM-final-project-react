
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import Sidebar from "../../layouts/sidebar";

import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    doctors,
    currentUser,
    appointments,
    setAppointments
  } = useContext(MyContext);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const doctor = doctors.find(
    (item) => String(item.id) === String(id)
  );

  // Get selected day
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let selectedDay = "";

  if (selectedDate) {
    selectedDay = dayNames[
      new Date(selectedDate + "T00:00:00").getDay()
    ];
  }

  // Check doctor availability
  const isDayOff = doctor?.daysOff?.includes(selectedDate);

  const isWorkingDay = doctor?.workingDays?.includes(selectedDay);

  // Generate available time slots
  const availableTimes = [];

  if (doctor?.workingHours?.start && doctor?.workingHours?.end) {
    const [startHour, startMinute] =
      doctor.workingHours.start.split(":").map(Number);

    const [endHour, endMinute] =
      doctor.workingHours.end.split(":").map(Number);

    const duration = Number(doctor.slotDuration) || 30;

    let currentMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    while (currentMinutes + duration <= endMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const minutes = currentMinutes % 60;

      const time =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0");

      availableTimes.push(time);

      currentMinutes += duration;
    }
  }

  // Check if time is already booked
  const isBooked = (time) => {
    return appointments.some((appointment) => {
      return (
        String(appointment.doctorId) === String(doctor.id) &&
        appointment.date === selectedDate &&
        appointment.time === time &&
        (
          appointment.status === "pending" ||
          appointment.status === "confirmed"
        )
      );
    });
  };

  // Check if selected time has passed
  const isPastTime = (time) => {
    const now = new Date();

    const currentDate = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");

    if (selectedDate === currentDate) {
      const [hours, minutes] = time.split(":").map(Number);

      if (
        hours < now.getHours() ||
        (
          hours === now.getHours() &&
          minutes <= now.getMinutes()
        )
      ) {
        return true;
      }
    }

    return false;
  };

  // Handle booking
  const handleBooking = () => {
    setMessage("");
    setMessageType("");

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setMessage("Please select a date and time first.");
      setMessageType("error");
      return;
    }

    const today = new Date();

    const chosenDate = new Date(selectedDate + "T00:00:00");

    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (chosenDate < todayDate) {
      setMessage("You cannot book an appointment in the past.");
      setMessageType("error");
      return;
    }

    if (!doctor.available) {
      setMessage("This doctor is currently unavailable.");
      setMessageType("error");
      return;
    }

    if (isDayOff) {
      setMessage("The doctor is not available on this day.");
      setMessageType("error");
      return;
    }

    if (!isWorkingDay) {
      setMessage("The doctor does not work on this day.");
      setMessageType("error");
      return;
    }

    if (isBooked(selectedTime)) {
      setMessage("This time slot is already booked. Please choose another.");
      setMessageType("error");
      return;
    }

    if (isPastTime(selectedTime)) {
      setMessage("This time has already passed. Please choose another time.");
      setMessageType("error");
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
    setMessageType("success");

    setSelectedTime("");
  };

  // Doctor not found
  if (!doctor) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f8f9] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#173b4d] mb-4">
            Doctor Not Found
          </h2>

          <button
            onClick={() => navigate("/doctors")}
            className="bg-[#159b91] text-white px-6 py-3 rounded-lg hover:bg-[#117d75] transition"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f8f9] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-sm w-full">
          <h2 className="text-2xl font-bold text-[#173b4d] mb-3">
            Please Log In First
          </h2>

          <p className="text-[#7b8b93] mb-6">
            You need to log in before booking an appointment.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#159b91] text-white py-3 rounded-lg font-semibold hover:bg-[#117d75] transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full min-w-0 max-w-full overflow-x-hidden box-border bg-[#f4f8f9] font-sans">

      <Sidebar />

      <div className="ml-[260px] w-[calc(100%-260px)] min-w-0 box-border px-5 py-10
        max-[1024px]:ml-[210px] max-[1024px]:w-[calc(100%-210px)] max-[1024px]:px-5
        max-[640px]:ml-0 max-[640px]:w-full max-[640px]:px-3 max-[640px]:py-6 max-[640px]:pb-[120px]">

        <div className="w-full max-w-[850px] min-w-0 mx-auto bg-white p-5 sm:p-7 lg:p-9 rounded-2xl shadow-[0_5px_25px_rgba(0,0,0,0.06)]">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#159b91] font-semibold mb-6 hover:text-[#117d75] transition"
          >
            <FiArrowLeft />
            Go Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#e5f5f3] text-[#159b91] flex items-center justify-center text-2xl">
              <FiCalendar />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#173b4d] mb-3">
              Book Your Appointment
            </h1>

            <p className="text-sm sm:text-base text-[#7b8b93]">
              Choose your preferred date and time
            </p>

          </div>

          {/* Doctor Information */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 p-5 bg-[#f0f8f7] rounded-2xl mb-8 text-center sm:text-left">

            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-full bg-[#d8eeeb] text-[#159b91] flex items-center justify-center text-3xl font-bold">
                {doctor.name?.charAt(0) || "D"}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-[#173b4d] mb-2 break-words">
                {doctor.name}
              </h2>

              <p className="text-[#159b91] font-medium mb-2">
                {doctor.specialty}
              </p>

              <span className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#7b8b93]">
                <FiMapPin className="shrink-0" />
                {doctor.city || "Not specified"}
              </span>

              <h3 className="text-lg font-bold text-[#159b91] mt-3">
                {doctor.price} MAD
              </h3>
            </div>

          </div>

          {/* Select Date */}
          <section className="mb-8">

            <h2 className="flex items-center gap-2 text-lg font-bold text-[#173b4d] mb-4">
              <FiCalendar className="text-[#159b91]" />
              1. Select Date
            </h2>

            <input
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime("");
                setMessage("");
                setMessageType("");
              }}
              className="w-full max-w-[350px] h-12 px-3 border border-[#dce5e8] rounded-lg outline-none text-[#193344] focus:border-[#159b91] focus:ring-2 focus:ring-[#159b91]/10"
            />

          </section>

          {/* Select Time */}
          <section className="mb-8">

            <h2 className="flex items-center gap-2 text-lg font-bold text-[#173b4d] mb-4">
              <FiClock className="text-[#159b91]" />
              2. Select Time
            </h2>

            {!selectedDate ? (

              <p className="text-sm text-[#7b8b93]">
                Please select a date first.
              </p>

            ) : isDayOff ? (

              <div className="p-4 bg-[#fff1f1] text-[#c34d4d] rounded-lg text-sm">
                The doctor is not available on this day.
              </div>

            ) : !isWorkingDay ? (

              <div className="p-4 bg-[#fff1f1] text-[#c34d4d] rounded-lg text-sm">
                The doctor does not work on this day.
              </div>

            ) : availableTimes.length === 0 ? (

              <p className="text-sm text-[#7b8b93]">
                No available time slots for this doctor.
              </p>

            ) : (

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

                {availableTimes.map((time) => {

                  const booked = isBooked(time);
                  const past = isPastTime(time);
                  const disabled = booked || past;

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setSelectedTime(time);
                        setMessage("");
                        setMessageType("");
                      }}
                      className={`min-w-0 px-2 py-3 rounded-lg border text-sm font-semibold transition ${
                        disabled
                          ? "bg-[#eeeeee] border-[#dddddd] text-[#999999] cursor-not-allowed"
                          : selectedTime === time
                          ? "bg-[#159b91] border-[#159b91] text-white"
                          : "bg-white border-[#159b91] text-[#159b91] hover:bg-[#e5f5f3]"
                      }`}
                    >
                      {time}

                      {booked && (
                        <span className="block text-xs mt-1">
                          Booked
                        </span>
                      )}

                      {past && !booked && (
                        <span className="block text-xs mt-1">
                          Passed
                        </span>
                      )}

                    </button>
                  );
                })}

              </div>
            )}

          </section>

          {/* Message */}
          {message && (
            <div
              className={`flex items-start gap-3 p-4 rounded-lg mb-5 text-sm ${
                messageType === "success"
                  ? "bg-[#e5f5f3] text-[#147c73]"
                  : "bg-[#fff1f1] text-[#c34d4d]"
              }`}
            >
              {messageType === "success" ? (
                <FiCheckCircle className="shrink-0 text-lg" />
              ) : (
                <FiAlertCircle className="shrink-0 text-lg" />
              )}

              <p className="break-words">{message}</p>
            </div>
          )}

          {/* Confirm Booking */}
          <button
            type="button"
            onClick={handleBooking}
            disabled={!doctor.available}
            className="w-full min-h-12 px-4 py-3 bg-[#159b91] hover:bg-[#117d75] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-base sm:text-lg font-bold transition"
          >
            Confirm Booking
          </button>

        </div>
      </div>
    </main>
  );
}

export default Booking;
