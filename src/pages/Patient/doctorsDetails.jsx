
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
    (item) => String(item.id) === String(id)
  );

  if (!doctor) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f7fafb] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#193344] mb-3">
            Doctor Not Found
          </h2>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-[#159b91] font-semibold"
          >
            <FiArrowLeft />
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full max-w-full min-w-0 overflow-x-hidden bg-[#f7fafb] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 xl:px-16">

      <div className="w-full max-w-[1200px] min-w-0 mx-auto">

        {/* Back Button */}
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 text-[#71858e] hover:text-[#159b91] font-medium mb-6 transition"
        >
          <FiArrowLeft />
          Back to Doctors
        </Link>

        {/* Doctor Profile */}
        <section className="w-full min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">

          <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10">

            {/* Doctor Image */}
            <div className="w-full min-w-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-[260px] sm:h-[320px] lg:h-[380px] object-cover rounded-xl"
              />
            </div>

            {/* Doctor Information */}
            <div className="min-w-0 flex flex-col justify-center">

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-[#e8f7f5] text-[#159b91] px-3 py-1 rounded-full text-sm font-semibold">
                  {doctor.specialty}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    doctor.available
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {doctor.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#193344] break-words mb-4">
                {doctor.name}
              </h1>

              <p className="text-[#71858e] leading-7 mb-6 break-words">
                {doctor.description ||
                  "Experienced medical professional dedicated to providing quality healthcare and patient-focused treatment."}
              </p>

              {/* Quick Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-[#e8f7f5] flex items-center justify-center text-[#159b91]">
                    <FiMapPin />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-[#82939b]">Location</p>
                    <p className="font-semibold text-[#193344] break-words">
                      {doctor.city || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-[#fff6e7] flex items-center justify-center text-yellow-600">
                    <FiStar />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-[#82939b]">Rating</p>
                    <p className="font-semibold text-[#193344]">
                      {doctor.rating || "New Doctor"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-[#e8f7f5] flex items-center justify-center text-[#159b91]">
                    <FiBriefcase />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-[#82939b]">Experience</p>
                    <p className="font-semibold text-[#193344]">
                      {doctor.experienceYears || 0} Years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-[#e8f7f5] flex items-center justify-center text-[#159b91]">
                    <FiCheckCircle />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-[#82939b]">Consultation Fee</p>
                    <p className="font-semibold text-[#193344]">
                      {doctor.price} MAD
                    </p>
                  </div>
                </div>

              </div>

              {/* Booking Button */}
              {doctor.available && (
                <Link
                  to={`/booking/${doctor.id}`}
                  className="w-full sm:w-fit text-center bg-[#159b91] hover:bg-[#117f78] text-white font-semibold px-7 py-3 rounded-xl transition"
                >
                  Book Appointment
                </Link>
              )}

            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

          {/* Working Days */}
          <div className="min-w-0 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 shrink-0 bg-[#e8f7f5] text-[#159b91] rounded-lg flex items-center justify-center">
                <FiCalendar />
              </div>

              <h3 className="font-bold text-[#193344]">
                Working Days
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {doctor.workingDays?.length > 0 ? (
                doctor.workingDays.map((day, index) => (
                  <span
                    key={index}
                    className="bg-[#e8f7f5] text-[#159b91] text-sm px-3 py-2 rounded-lg"
                  >
                    {day}
                  </span>
                ))
              ) : (
                <p className="text-sm text-[#82939b]">
                  Not specified
                </p>
              )}
            </div>
          </div>

          {/* Working Hours */}
          <div className="min-w-0 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 shrink-0 bg-[#e8f7f5] text-[#159b91] rounded-lg flex items-center justify-center">
                <FiClock />
              </div>

              <h3 className="font-bold text-[#193344]">
                Working Hours
              </h3>
            </div>

            <p className="text-[#71858e] mb-2 break-words">
              {doctor.workingHours?.start || "--:--"} -{" "}
              {doctor.workingHours?.end || "--:--"}
            </p>

            <p className="text-sm text-[#82939b]">
              Slot Duration: {doctor.slotDuration || 30} minutes
            </p>
          </div>

          {/* Languages */}
          <div className="min-w-0 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 shrink-0 bg-[#e8f7f5] text-[#159b91] rounded-lg flex items-center justify-center">
                <FiGlobe />
              </div>

              <h3 className="font-bold text-[#193344]">
                Languages
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {doctor.languages?.length > 0 ? (
                doctor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-[#193344] text-sm px-3 py-2 rounded-lg"
                  >
                    {language}
                  </span>
                ))
              ) : (
                <p className="text-sm text-[#82939b]">
                  Not specified
                </p>
              )}
            </div>
          </div>

        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 mt-6 border border-gray-100 shadow-sm">

          <h2 className="text-xl font-bold text-[#193344] mb-5">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 shrink-0 rounded-lg bg-[#e8f7f5] text-[#159b91] flex items-center justify-center">
                <FiPhone />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-[#82939b]">Phone</p>
                <p className="text-[#193344] font-semibold break-all">
                  {doctor.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 shrink-0 rounded-lg bg-[#e8f7f5] text-[#159b91] flex items-center justify-center">
                <FiMail />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-[#82939b]">Email</p>
                <p className="text-[#193344] font-semibold break-all">
                  {doctor.email || "Not provided"}
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

export default DoctorDetails;
