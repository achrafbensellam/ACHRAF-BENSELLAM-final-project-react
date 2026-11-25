
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/mycontext";

import logo2 from "../../assets/img/logo2.png";
import logo1 from "../../assets/img/logo.png";
import heroDoctor from "../../assets/img/womam1.jpg";

import {
  FiMenu,
  FiX,
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
  FiClock,
  FiHeart,
  FiCalendar,
  FiSearch,
  FiCheckCircle,
  FiMapPin,
  FiStar,
  FiActivity,
  FiUsers,
  FiPhone,
  FiMail
} from "react-icons/fi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";


function HomePage() {

  // ================= CONTEXT =================

  const { doctors, patient, appointments, currentUser } =
    useContext(MyContext);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);


  // ================= PROTECTED NAVIGATION =================

  const handleProtectedNavigation = (path) => {

    if (!currentUser) {
      navigate("/login");
      setMenuOpen(false);
      return;
    }

    navigate(path);
    setMenuOpen(false);
  };


  // ================= FEATURED DOCTORS =================

  const featuredDoctors = doctors.slice(0, 3);


  // ================= SPECIALTIES =================

  const specialties = [
    {
      name: "Cardiology",
      description: "Heart and cardiovascular care",
      icon: "❤️",
      color: "bg-red-50"
    },
    {
      name: "Neurology",
      description: "Brain and nervous system",
      icon: "🧠",
      color: "bg-purple-50"
    },
    {
      name: "Dentistry",
      description: "Healthy teeth and smiles",
      icon: "🦷",
      color: "bg-blue-50"
    },
    {
      name: "Dermatology",
      description: "Skin and beauty treatments",
      icon: "✨",
      color: "bg-orange-50"
    },
    {
      name: "Pediatrics",
      description: "Healthcare for children",
      icon: "👶",
      color: "bg-green-50"
    },
    {
      name: "Orthopedics",
      description: "Bones, joints and muscles",
      icon: "🦴",
      color: "bg-yellow-50"
    }
  ];


  // ================= HOW IT WORKS =================

  const steps = [
    {
      number: "01",
      title: "Find Your Doctor",
      description:
        "Explore experienced doctors and choose the specialist you need.",
      icon: <FiSearch />
    },
    {
      number: "02",
      title: "Choose Your Time",
      description:
        "Check available dates and select a time that works for you.",
      icon: <FiCalendar />
    },
    {
      number: "03",
      title: "Get Your Appointment",
      description:
        "Submit your booking request and wait for confirmation.",
      icon: <FiCheckCircle />
    }
  ];


  // ================= STATISTICS DATA =================

  const usersData = [
    {
      name: "Doctors",
      total: doctors.length
    },
    {
      name: "Patients",
      total: patient.length
    }
  ];


  // Appointments by Status

  const appointmentStatuses = [
    "pending",
    "confirmed",
    "completed",
    "cancelled",
    "rejected"
  ];

  const appointmentsData = appointmentStatuses.map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),

    value: appointments.filter(
      appointment => appointment.status === status
    ).length
  }));


  // Doctors by Specialty

  const doctorSpecialties = [
    ...new Set(doctors.map(doctor => doctor.specialty))
  ];

  const doctorSpecialtyData = doctorSpecialties.map(specialty => ({
    name: specialty,

    total: doctors.filter(
      doctor => doctor.specialty === specialty
    ).length
  }));


  // Chart Colors

  const chartColors = [
    "#159b91",
    "#173b4d",
    "#7bd6c9",
    "#55aaa2",
    "#82939b"
  ];


  return (

    <main className="w-full min-w-0 overflow-x-hidden bg-white text-[#193344] font-sans selection:bg-[#159b91]/20">


      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-xl border-b border-[#e4efed] relative z-50 shadow-sm shadow-[#173b4d]/5">

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">


          {/* Logo */}

          <Link to="/" className="flex items-center gap-2">

            <div className="h-[60px] w-[60px] rounded-xl flex items-center justify-center">

              <img
                src={logo2}
                alt="MedConnect Logo"
                className="w-full h-full object-contain"
              />

            </div>

            <div>

              <h1 className="text-xl font-bold text-[#173b4d]">
                Med<span className="text-[#159b91]">Connect</span>
              </h1>

              <p className="text-[10px] tracking-[2px] text-[#82939b]">
                YOUR HEALTH PARTNER
              </p>

            </div>

          </Link>


          {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#536c78]">

            <a href="#home" className="text-[#159b91]">
              Home
            </a>

            <a href="#specialties" className="hover:text-[#159b91] transition">
              Specialties
            </a>

            <a href="#doctors" className="hover:text-[#159b91] transition">
              Our Doctors
            </a>

            <a href="#how-it-works" className="hover:text-[#159b91] transition">
              How It Works
            </a>

            <a href="#contact" className="hover:text-[#159b91] transition">
              Contact
            </a>

          </div>


          {/* Desktop Buttons */}

          <div className="hidden lg:flex items-center gap-3">

            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-semibold text-[#173b4d] hover:text-[#159b91] transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-3 bg-[#159b91] text-white text-sm font-semibold rounded-lg hover:bg-[#117e77] transition shadow-md shadow-[#159b91]/20"
            >
              Get Started
            </Link>

          </div>


          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-2xl text-[#173b4d]"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>


        {/* Mobile Navigation */}

        {menuOpen && (

          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg px-5 py-5 flex flex-col gap-5">

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium"
            >
              Home
            </a>

            <a
              href="#specialties"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium"
            >
              Specialties
            </a>

            <a
              href="#doctors"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium"
            >
              Our Doctors
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium"
            >
              How It Works
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium"
            >
              Contact
            </a>


            <div className="flex gap-3 pt-3 border-t border-gray-100">

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-3 border border-[#159b91] text-[#159b91] rounded-lg font-semibold text-sm"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-3 bg-[#159b91] text-white rounded-lg font-semibold text-sm"
              >
                Get Started
              </Link>

            </div>

          </div>

        )}

      </nav>



      {/* ================= HERO SECTION ================= */}

      <section
        id="home"
        className="relative min-h-[600px] lg:min-h-[680px] bg-gradient-to-br from-[#f3faf9] via-white to-[#eaf8f5] overflow-hidden"
      >

        {/* Background Decorations */}

        <div className="absolute top-[-150px] right-[-100px] w-[450px] h-[450px] bg-[#159b91]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-180px] left-[-100px] w-[400px] h-[400px] bg-[#7bd6c9]/20 rounded-full blur-3xl" />


        <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 py-14 sm:py-16 lg:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">


            {/* Hero Content */}

            <div className="relative z-20 w-full min-w-0 max-w-[600px]">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0f5f1] border border-[#ccece6] text-[#159b91] text-xs sm:text-sm font-semibold mb-5">

                <FiActivity className="text-lg" />

                Healthcare made simple

              </div>


              <h1 className="text-[40px] sm:text-[52px] lg:text-[62px] xl:text-[70px] leading-[1.06] font-extrabold tracking-[-0.04em] text-[#173b4d] mb-6">

                Your Health,

                <span className="block text-[#159b91]">
                  Our Priority.
                </span>

              </h1>


              <p className="text-[#71838c] text-base sm:text-lg lg:text-xl leading-8 max-w-[540px] mb-8">

                Find trusted doctors, book appointments easily,
                and take control of your health journey.
                Quality healthcare starts with one simple step.

              </p>


              {/* Hero Buttons */}

              <div className="flex flex-col min-[420px]:flex-row gap-3">

                <button
                  onClick={() => handleProtectedNavigation("/doctors")}
                  className="group flex items-center justify-center gap-3 px-7 py-3.5 bg-[#159b91] text-white rounded-xl font-bold shadow-lg shadow-[#159b91]/20 hover:bg-[#117e77] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >

                  Find a Doctor

                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />

                </button>


                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white border-2 border-[#dce9e7] text-[#173b4d] rounded-xl font-bold hover:border-[#159b91] hover:text-[#159b91] hover:-translate-y-1 transition-all duration-300"
                >

                  Create Account

                </Link>

              </div>


              {/* Trust Features */}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-10">

                <div className="flex items-center gap-2.5">

                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#e0f5f1] flex items-center justify-center text-[#159b91]">
                    <FiShield className="text-lg" />
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-[#536c78]">
                    Easy Booking
                  </span>

                </div>


                <div className="hidden sm:block w-px h-8 bg-[#d5e9e5]" />


                <div className="flex items-center gap-2.5">

                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#e0f5f1] flex items-center justify-center text-[#159b91]">
                    <FiClock className="text-lg" />
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-[#536c78]">
                    Save Time
                  </span>

                </div>


                <div className="hidden sm:block w-px h-8 bg-[#d5e9e5]" />


                <div className="flex items-center gap-2.5">

                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#e0f5f1] flex items-center justify-center text-[#159b91]">
                    <FiHeart className="text-lg" />
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-[#536c78]">
                    Trusted Care
                  </span>

                </div>

              </div>

            </div>



            {/* Hero Image */}

            <div className="relative w-full min-w-0 max-w-[560px] mx-auto lg:ml-auto mt-2 lg:mt-0">

              <div className="absolute top-7 right-0 w-[90%] h-[85%] bg-[#159b91]/20 rounded-[45%_45%_30%_30%] blur-sm" />


              <div className="relative h-[350px] sm:h-[460px] lg:h-[540px] rounded-[32px] overflow-hidden shadow-2xl shadow-[#173b4d]/15 ring-1 ring-white/70">

                <img
                  src={heroDoctor}
                  alt="MedConnect healthcare doctor"
                  className="w-full h-full object-cover object-[75%_center]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#173b4d]/15 via-transparent to-white/10 pointer-events-none" />

              </div>


              {/* Floating Booking Card */}

              <div className="absolute top-[18%] right-1 sm:-right-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3 sm:p-4 border border-white max-w-[180px] animate-[float_4s_ease-in-out_infinite]">

                <div className="flex items-center gap-2.5">

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#e0f5f1] flex items-center justify-center text-[#159b91]">
                    <FiCalendar className="text-lg" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs sm:text-sm font-bold text-[#173b4d]">
                      Easy Online
                    </p>

                    <p className="text-xs sm:text-sm font-bold text-[#173b4d]">
                      Booking
                    </p>

                  </div>

                </div>

              </div>


              {/* Floating Healthcare Card */}

              <div className="absolute bottom-[10%] left-1 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3 sm:p-4 border border-white max-w-[215px] animate-[float_5s_ease-in-out_infinite]">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#e0f5f1] flex items-center justify-center text-[#159b91]">
                    <FiHeart className="text-xl" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-bold text-[#173b4d]">
                      Better Care
                    </p>

                    <p className="text-xs text-[#82939b]">
                      Made for Everyone
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ================= STATISTICS ================= */}

      <section className="w-full px-5 sm:px-8 py-16 sm:py-20">

        <div className="max-w-[1100px] mx-auto">


          {/* Statistics Heading */}

          <div className="text-center mb-10">

            <span className="text-sm font-bold tracking-[2px] text-[#159b91]">
              PLATFORM OVERVIEW
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#173b4d] mt-3">
              Platform Statistics
            </h2>

            <p className="text-sm sm:text-base text-[#82939b] mt-3">
              An overview of doctors, patients and appointments
            </p>

          </div>


          {/* Statistics Grid */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">


            {/* Doctors and Patients */}

            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#e5efed] shadow-[0_12px_35px_rgba(23,59,77,0.06)] hover:shadow-[0_18px_45px_rgba(23,59,77,0.10)] transition-shadow duration-300">

              <h3 className="text-lg font-bold text-[#173b4d]">
                Doctors & Patients
              </h3>

              <p className="text-sm text-[#82939b] mt-1 mb-6">
                Total registered users
              </p>

              <div className="h-[280px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart
                    data={usersData}
                    barSize={55}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#edf2f2"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#82939b", fontSize: 13 }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: "#82939b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="total"
                      radius={[8, 8, 0, 0]}
                      fill="#159b91"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>



            {/* Appointments Overview */}

            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#e5efed] shadow-[0_12px_35px_rgba(23,59,77,0.06)] hover:shadow-[0_18px_45px_rgba(23,59,77,0.10)] transition-shadow duration-300">

              <h3 className="text-lg font-bold text-[#173b4d]">
                Appointments Overview
              </h3>

              <p className="text-sm text-[#82939b] mt-1 mb-6">
                Appointments by current status
              </p>

              <div className="h-[280px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={appointmentsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                    >

                      {appointmentsData.map((entry, index) => (

                        <Cell
                          key={entry.name}
                          fill={chartColors[index % chartColors.length]}
                        />

                      ))}

                    </Pie>

                    <Tooltip />

                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                    />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>



            {/* Doctors by Specialty */}

            <div className="lg:col-span-2 flex justify-center">

              <div className="w-full max-w-[750px] bg-white rounded-3xl p-5 sm:p-7 border border-[#e5efed] shadow-[0_12px_35px_rgba(23,59,77,0.06)] hover:shadow-[0_18px_45px_rgba(23,59,77,0.10)] transition-shadow duration-300">

                <h3 className="text-lg font-bold text-[#173b4d]">
                  Doctors by Specialty
                </h3>

                <p className="text-sm text-[#82939b] mt-1 mb-6">
                  Number of doctors in each medical specialty
                </p>

                <div className="h-[300px] w-full">

                  <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                      data={doctorSpecialtyData}
                      barSize={40}
                      margin={{ top: 10, right: 10, left: -20, bottom: 35 }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#edf2f2"
                      />

                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#82939b", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        angle={-15}
                        textAnchor="end"
                        interval={0}
                      />

                      <YAxis
                        allowDecimals={false}
                        tick={{ fill: "#82939b", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip />

                      <Bar
                        dataKey="total"
                        fill="#159b91"
                        radius={[7, 7, 0, 0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ================= SPECIALTIES ================= */}

      <section
        id="specialties"
        className="py-20 sm:py-24 lg:py-28 px-5 sm:px-8"
      >

        <div className="max-w-[1250px] mx-auto">


          <div className="text-center max-w-[650px] mx-auto mb-12">

            <span className="text-sm font-bold tracking-[2px] text-[#159b91]">
              OUR SPECIALTIES
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#173b4d] mt-3 mb-4">
              Healthcare for Every Need
            </h2>

            <p className="text-[#82939b] leading-7">
              Discover medical specialties and find the right
              professional for your healthcare needs.
            </p>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {specialties.map((specialty) => (

              <button
                key={specialty.name}
                onClick={() => handleProtectedNavigation("/doctors")}
                className="group w-full text-left p-6 sm:p-7 bg-white border border-[#e5efed] rounded-3xl shadow-sm hover:border-[#159b91]/40 hover:shadow-[0_18px_40px_rgba(21,155,145,0.10)] hover:-translate-y-1.5 transition-all duration-300"
              >

                <div className={`w-14 h-14 rounded-2xl ${specialty.color} flex items-center justify-center text-3xl mb-5`}>
                  {specialty.icon}
                </div>


                <div className="flex items-center justify-between gap-3">

                  <div>

                    <h3 className="text-lg font-bold text-[#173b4d] mb-2">
                      {specialty.name}
                    </h3>

                    <p className="text-sm text-[#82939b]">
                      {specialty.description}
                    </p>

                  </div>


                  <div className="w-9 h-9 shrink-0 rounded-full bg-[#f0f8f7] text-[#159b91] flex items-center justify-center group-hover:bg-[#159b91] group-hover:text-white transition">

                    <FiArrowUpRight />

                  </div>

                </div>

              </button>

            ))}

          </div>



          <div className="text-center mt-10">

            <button
              onClick={() => handleProtectedNavigation("/doctors")}
              className="inline-flex items-center gap-2 text-[#159b91] font-semibold hover:gap-4 transition-all"
            >

              Explore All Doctors

              <FiArrowRight />

            </button>

          </div>

        </div>

      </section>



      {/* ================= FEATURED DOCTORS ================= */}

      <section
        id="doctors"
        className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-[#f3faf9] to-white px-5 sm:px-8"
      >

        <div className="max-w-[1250px] mx-auto">


          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">

            <div>

              <span className="text-sm font-bold tracking-[2px] text-[#159b91]">
                MEET OUR SPECIALISTS
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#173b4d] mt-3">
                Meet Our Doctors
              </h2>

              <p className="text-[#82939b] mt-3">
                Experienced professionals ready to care for you.
              </p>

            </div>


            <button
              onClick={() => handleProtectedNavigation("/doctors")}
              className="inline-flex items-center gap-2 text-[#159b91] font-semibold hover:gap-4 transition-all"
            >

              View All Doctors

              <FiArrowRight />

            </button>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {featuredDoctors.map((doctor) => (

              <div
                key={doctor.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#e5efed] shadow-[0_8px_28px_rgba(23,59,77,0.05)] hover:shadow-[0_22px_48px_rgba(23,59,77,0.12)] hover:-translate-y-2 transition-all duration-300"
              >


                <div className="h-[240px] relative bg-[#e5f5f3] overflow-hidden">

                  {doctor.image ? (

                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-5xl text-[#159b91] font-bold">
                      {doctor.name?.charAt(0) || "D"}
                    </div>

                  )}


                  <span
                    className={`absolute top-4 left-4 px-3 py-2 rounded-full text-xs font-semibold ${
                      doctor.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>

                </div>



                <div className="p-6">

                  <span className="text-xs font-semibold text-[#159b91] bg-[#e8f7f5] px-3 py-1.5 rounded-md">
                    {doctor.specialty}
                  </span>


                  <h3 className="text-xl font-bold text-[#173b4d] mt-4 mb-3">
                    {doctor.name}
                  </h3>


                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#82939b] mb-5">

                    <span className="flex items-center gap-1.5">
                      <FiMapPin />
                      {doctor.city || "Not specified"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiStar className="text-yellow-500 fill-yellow-500" />
                      {doctor.rating || "New"}
                    </span>

                  </div>



                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">

                    <div>

                      <p className="text-xs text-[#82939b]">
                        Consultation
                      </p>

                      <p className="text-lg font-bold text-[#159b91]">
                        {doctor.price} MAD
                      </p>

                    </div>


                    <button
                      onClick={() =>
                        handleProtectedNavigation(`/doctors/${doctor.id}`)
                      }
                      className="px-4 py-3 rounded-lg bg-[#159b91] text-white text-sm font-semibold hover:bg-[#117e77] transition"
                    >
                      View Profile
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* ================= WHY MEDCONNECT ================= */}

      <section className="py-20 sm:py-24 lg:py-28 px-5 sm:px-8">

        <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


          {/* Image */}

          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85"
              alt="Healthcare professionals working together"
              className="w-full h-[320px] sm:h-[450px] object-cover rounded-3xl"
            />


            <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white p-5 rounded-2xl shadow-xl sm:max-w-[260px]">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-[#e5f5f3] text-[#159b91] flex items-center justify-center text-xl">
                  <FiUsers />
                </div>

                <div>

                  <p className="font-bold text-[#173b4d]">
                    Patient First
                  </p>

                  <p className="text-xs text-[#82939b]">
                    Your health matters
                  </p>

                </div>

              </div>

            </div>

          </div>



          {/* Content */}

          <div>

            <span className="text-sm font-bold tracking-[2px] text-[#159b91]">
              WHY MEDCONNECT
            </span>


            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#173b4d] mt-3 mb-5 leading-tight">
              Better Healthcare Starts With a Better Connection.
            </h2>


            <p className="text-[#82939b] leading-8 mb-8">
              We make it easier to connect with healthcare professionals.
              Find the right doctor, explore availability, and manage
              your appointments from one simple platform.
            </p>



            <div className="space-y-6">


              <div className="flex gap-4">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#e5f5f3] text-[#159b91] flex items-center justify-center text-xl">
                  <FiShield />
                </div>

                <div>

                  <h3 className="font-bold text-[#173b4d] mb-1">
                    Simple and Convenient
                  </h3>

                  <p className="text-sm text-[#82939b] leading-6">
                    Find doctors and manage your appointments easily.
                  </p>

                </div>

              </div>



              <div className="flex gap-4">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#e5f5f3] text-[#159b91] flex items-center justify-center text-xl">
                  <FiClock />
                </div>

                <div>

                  <h3 className="font-bold text-[#173b4d] mb-1">
                    Save Valuable Time
                  </h3>

                  <p className="text-sm text-[#82939b] leading-6">
                    Explore available time slots before making a booking.
                  </p>

                </div>

              </div>



              <div className="flex gap-4">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#e5f5f3] text-[#159b91] flex items-center justify-center text-xl">
                  <FiHeart />
                </div>

                <div>

                  <h3 className="font-bold text-[#173b4d] mb-1">
                    Care That Matters
                  </h3>

                  <p className="text-sm text-[#82939b] leading-6">
                    Keep your healthcare appointments organized in one place.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-[#f3faf9] to-[#edf8f6] px-5 sm:px-8"
      >

        <div className="max-w-[1150px] mx-auto">


          <div className="text-center max-w-[650px] mx-auto mb-14">

            <span className="text-sm font-bold tracking-[2px] text-[#159b91]">
              SIMPLE PROCESS
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#173b4d] mt-3 mb-4">
              How MedConnect Works
            </h2>

            <p className="text-[#82939b] leading-7">
              Getting the healthcare you need is easier than ever.
              Follow three simple steps.
            </p>

          </div>



          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {steps.map((step) => (

              <div
                key={step.number}
                className="relative bg-white p-7 sm:p-8 rounded-3xl border border-[#e5efed] shadow-[0_10px_30px_rgba(23,59,77,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(23,59,77,0.09)] transition-all duration-300"
              >

                <div className="flex items-center justify-between mb-7">

                  <div className="w-14 h-14 rounded-2xl bg-[#e5f5f3] text-[#159b91] flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>

                  <span className="text-4xl font-bold text-[#e7f2f0]">
                    {step.number}
                  </span>

                </div>


                <h3 className="text-xl font-bold text-[#173b4d] mb-3">
                  {step.title}
                </h3>


                <p className="text-sm text-[#82939b] leading-7">
                  {step.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* ================= CTA ================= */}

      <section className="px-5 sm:px-8 py-20">

        <div className="max-w-[1200px] mx-auto relative overflow-hidden bg-gradient-to-br from-[#173b4d] via-[#19485a] to-[#102e3e] rounded-[2rem] px-6 sm:px-12 py-16 sm:py-20 text-center shadow-2xl shadow-[#173b4d]/15">


          <div className="absolute -top-24 -right-20 w-72 h-72 bg-[#159b91]/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-[#159b91]/20 rounded-full blur-3xl" />


          <div className="relative z-10 max-w-[650px] mx-auto">

            <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#73d8ca] flex items-center justify-center text-2xl mx-auto mb-6">
              <FiHeart />
            </div>


            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              Your Health Journey Starts Here.
            </h2>


            <p className="text-white/70 leading-7 mb-8">
              Take the first step towards easier healthcare.
              Find your doctor and book your next appointment today.
            </p>


            <button
              onClick={() => handleProtectedNavigation("/doctors")}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#159b91] text-white rounded-xl font-semibold hover:bg-[#117e77] transition"
            >

              Find Your Doctor

              <FiArrowRight />

            </button>

          </div>

        </div>

      </section>



      {/* ================= FOOTER ================= */}

      <footer
        id="contact"
        className="bg-[#102e3e] text-white pt-20 pb-8 px-5 sm:px-8"
      >

        <div className="max-w-[1250px] mx-auto">


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-14 border-b border-white/10">


            {/* Brand */}

            <div>

              <Link to="/" className="inline-flex items-center gap-2 mb-5">

                <div className="w-10 h-10 rounded-xl bg-[#159b91] flex items-center justify-center overflow-hidden">

                  <img
                    src={logo1}
                    alt="MedConnect"
                    className="w-full h-full object-contain"
                  />

                </div>

                <h2 className="text-xl font-bold">
                  Med<span className="text-[#57c9bc]">Connect</span>
                </h2>

              </Link>


              <p className="text-sm text-white/60 leading-7 max-w-[280px]">
                Connecting people with healthcare professionals
                and making appointments easier.
              </p>

            </div>



            {/* Quick Links */}

            <div>

              <h3 className="font-bold text-lg mb-5">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white/60">

                <a href="#home" className="hover:text-[#57c9bc] transition">
                  Home
                </a>

                <a href="#specialties" className="hover:text-[#57c9bc] transition">
                  Specialties
                </a>

                <a href="#doctors" className="hover:text-[#57c9bc] transition">
                  Our Doctors
                </a>

                <a href="#how-it-works" className="hover:text-[#57c9bc] transition">
                  How It Works
                </a>

              </div>

            </div>



            {/* Account */}

            <div>

              <h3 className="font-bold text-lg mb-5">
                My Account
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white/60">

                <Link to="/login" className="hover:text-[#57c9bc] transition">
                  Login
                </Link>

                <Link to="/signup" className="hover:text-[#57c9bc] transition">
                  Create Account
                </Link>

                <button
                  onClick={() => handleProtectedNavigation("/doctors")}
                  className="text-left hover:text-[#57c9bc] transition"
                >
                  Find a Doctor
                </button>

              </div>

            </div>



            {/* Contact */}

            <div>

              <h3 className="font-bold text-lg mb-5">
                Contact Us
              </h3>

              <div className="flex flex-col gap-4 text-sm text-white/60">

                <div className="flex items-center gap-3">

                  <FiMail className="text-[#57c9bc]" />

                  <span>support@medconnect.com</span>

                </div>


                <div className="flex items-center gap-3">

                  <FiPhone className="text-[#57c9bc]" />

                  <span>Contact our support team</span>

                </div>

              </div>

            </div>

          </div>



          {/* Copyright */}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 text-xs text-white/50">

            <p>
              © {new Date().getFullYear()} MedConnect. All rights reserved.
            </p>

            <p>
              Your Health, Our Priority.
            </p>

          </div>

        </div>

      </footer>

    </main>

  );

}

export default HomePage;

