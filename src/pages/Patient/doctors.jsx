
import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";
import Sidebar from "../../layouts/sidebar";

import {
  FiSearch,
  FiMapPin,
  FiStar,
  FiHeart,
  FiCalendar,
  FiClock
} from "react-icons/fi";

function Doctors() {
  const { doctors, currentUser, setCurrentUser } = useContext(MyContext);

  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);

  // Get specialties
  const specialties = useMemo(() => {
    const allSpecialties = ["All"];

    doctors.forEach((doctor) => {
      if (
        doctor.specialty &&
        !allSpecialties.includes(doctor.specialty)
      ) {
        allSpecialties.push(doctor.specialty);
      }
    });

    return allSpecialties;
  }, [doctors]);

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        (doctor.name || "").toLowerCase().includes(searchValue) ||
        (doctor.specialty || "").toLowerCase().includes(searchValue) ||
        (doctor.city || "").toLowerCase().includes(searchValue);

      const matchesSpecialty =
        selectedSpecialty === "All" ||
        doctor.specialty === selectedSpecialty;

      const matchesAvailability =
        !availableOnly || doctor.available === true;

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesAvailability
      );
    });
  }, [doctors, search, selectedSpecialty, availableOnly]);

  // Toggle favorite
  const toggleFavorite = (doctorId) => {
    if (!currentUser) return;

    const favorites = currentUser.favorites || [];

    const isFavorite = favorites.some(
      (id) => String(id) === String(doctorId)
    );

    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (id) => String(id) !== String(doctorId)
      );
    } else {
      updatedFavorites = [...favorites, doctorId];
    }

    setCurrentUser({
      ...currentUser,
      favorites: updatedFavorites
    });
  };

  // Check favorite
  const isDoctorFavorite = (doctorId) => {
    return currentUser?.favorites?.some(
      (id) => String(id) === String(doctorId)
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setSelectedSpecialty("All");
    setAvailableOnly(false);
  };
  
  return (
    <main className="min-h-screen w-full min-w-0 max-w-full overflow-x-hidden box-border bg-[#f7fafb] text-[#193344] font-sans">

      <Sidebar />

      <div className="ml-[260px] w-[calc(100%-260px)] min-w-0 box-border px-5 py-10 sm:px-8 lg:px-10
        max-[1024px]:ml-[210px] max-[1024px]:w-[calc(100%-210px)]
        max-[640px]:ml-0 max-[640px]:w-full max-[640px]:px-[15px] max-[640px]:pt-7 max-[640px]:pb-[120px]">

        {/* Heading */}
        <section className="text-center mb-10 sm:mb-12">

          <span className="text-[13px] font-bold tracking-[3px] text-[#159b91]">
            MEDCONNECT
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#173b4d] mt-3 mb-3">
            Find Your Doctor
          </h1>

          <p className="text-sm sm:text-base leading-7 text-[#71838c] max-w-xl mx-auto">
            Find experienced doctors and book your appointment
            with confidence.
          </p>

        </section>

        {/* Search and Filters */}
        <section className="w-full max-w-[1100px] mx-auto mb-10 sm:mb-12 bg-white rounded-xl p-4 sm:p-5 shadow-[0_5px_25px_rgba(25,60,75,0.06)] flex flex-col lg:flex-row items-stretch lg:items-center gap-4">

          {/* Search */}
          <div className="flex-1 min-w-0 h-12 flex items-center gap-3 px-4 bg-[#f4f8f9] rounded-lg text-[#159b91]">

            <FiSearch className="shrink-0 text-lg" />

            <input
              type="text"
              placeholder="Search by doctor, specialty or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 bg-transparent outline-none border-none text-sm text-[#193344] placeholder:text-[#94a5ac]"
            />

          </div>

          {/* Specialty */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full lg:w-auto lg:min-w-[190px] h-12 px-4 rounded-lg border border-[#e4ebed] bg-white text-sm text-[#193344] outline-none cursor-pointer"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty === "All"
                  ? "All Specialties"
                  : specialty}
              </option>
            ))}
          </select>

          {/* Availability */}
          <label className="flex items-center gap-2 text-sm text-[#536c78] cursor-pointer whitespace-nowrap py-2">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 accent-[#159b91] cursor-pointer"
            />

            Available only
          </label>

        </section>

        {/* Results */}
        <section className="w-full max-w-[1300px] mx-auto min-w-0">

          {/* Results Header */}
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">

            <h2 className="text-xl sm:text-2xl font-bold text-[#173b4d]">
              Our Doctors
            </h2>

            <span className="text-sm text-[#82939b]">
              {filteredDoctors.length} doctors found
            </span>

          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">

              {filteredDoctors.map((doctor) => {

                const isFavorite = isDoctorFavorite(doctor.id);

                return (

                  <div
                    key={doctor.id}
                    className="min-w-0 bg-white border border-[#eaf0f1] rounded-2xl overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(25,60,75,0.1)]"
                  >

                    {/* Doctor Image */}
                    <div className="h-[220px] relative overflow-hidden bg-[#e7f3f3]">

                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-[center_25%]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-[#159b91]">
                          {doctor.name?.charAt(0) || "D"}
                        </div>
                      )}

                      {/* Availability */}
                      <span
                        className={`absolute top-4 left-4 px-3 py-2 rounded-full text-xs font-semibold ${
                          doctor.available
                            ? "bg-[#d9f8eb] text-[#087e61]"
                            : "bg-[#ffe4e4] text-[#b94a4a]"
                        }`}
                      >
                        {doctor.available
                          ? "Available"
                          : "Unavailable"}
                      </span>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(doctor.id)}
                        disabled={!currentUser}
                        title={
                          currentUser
                            ? isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                            : "Login to save favorites"
                        }
                        className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg shadow-sm transition ${
                          isFavorite
                            ? "text-[#e34f69]"
                            : "text-[#72848c] hover:text-[#e34f69]"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <FiHeart
                          className={isFavorite ? "fill-current" : ""}
                        />
                      </button>

                    </div>

                    {/* Doctor Information */}
                    <div className="p-5 sm:p-6">

                      <span className="inline-block px-3 py-1.5 rounded-md bg-[#e8f7f5] text-[#159b91] text-xs font-semibold">
                        {doctor.specialty}
                      </span>

                      <h3 className="text-lg font-bold text-[#173b4d] mt-3 mb-2 break-words">
                        {doctor.name}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-[#81939b] text-sm min-w-0">

                        <FiMapPin className="shrink-0" />

                        <span className="break-words">
                          {doctor.city || "Not specified"}
                        </span>

                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 my-5 text-[#627984] text-sm">

                        <span className="flex items-center gap-1.5">
                          <FiStar className="text-[#f3b53f] fill-[#f3b53f]" />
                          {doctor.rating || "New"}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <FiClock />
                          {doctor.experienceYears || 0} Years
                        </span>

                      </div>

                      {/* Price */}
                      <div className="py-4 border-t border-[#edf1f2]">

                        <strong className="text-lg text-[#159b91]">
                          {doctor.price} MAD
                        </strong>

                        <span className="ml-1 text-xs text-[#94a3aa]">
                          / consultation
                        </span>

                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col min-[400px]:flex-row gap-3">

                        <Link
                          to={`/doctors/${doctor.id}`}
                          className="flex-1 min-w-0 min-h-11 flex items-center justify-center px-3 rounded-lg border border-[#159b91] text-[#159b91] bg-white hover:bg-[#e8f7f5] text-sm font-semibold transition"
                        >
                          View Profile
                        </Link>

                        {doctor.available ? (
                          <Link
                            to={`/booking/${doctor.id}`}
                            className="flex-1 min-w-0 min-h-11 flex items-center justify-center gap-2 px-3 rounded-lg border border-[#159b91] bg-[#159b91] text-white hover:bg-[#117e77] text-sm font-semibold transition"
                          >
                            <FiCalendar />
                            Book Now
                          </Link>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="flex-1 min-w-0 min-h-11 flex items-center justify-center gap-2 px-3 rounded-lg bg-gray-200 text-gray-400 text-sm font-semibold cursor-not-allowed"
                          >
                            <FiCalendar />
                            Unavailable
                          </button>
                        )}

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

          ) : (

            /* Empty Results */
            <div className="w-full bg-white rounded-2xl text-center px-5 py-16 text-[#81939b]">

              <FiSearch className="text-4xl text-[#159b91] mx-auto mb-4" />

              <h3 className="text-xl font-bold text-[#173b4d] mb-2">
                No doctors found
              </h3>

              <p className="text-sm">
                Try another name or specialty.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 px-6 py-3 rounded-lg bg-[#159b91] hover:bg-[#117e77] text-white text-sm font-semibold transition"
              >
                Clear Filters
              </button>

            </div>

          )}

        </section>

      </div>
    </main>
  );
}

export default Doctors;
