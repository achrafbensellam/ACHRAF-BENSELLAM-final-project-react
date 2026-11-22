
import v2 from '../../assets/videos/v2.mp4';
import logo from '../../assets/img/logo2.png';

import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { FaHeartPulse } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useState, useContext } from 'react';
import { MyContext } from '../../utils/mycontext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const {
        patient,
        doctors,
        setCurrentUser,
        adminAccount
    } = useContext(MyContext);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const email = loginEmail.trim().toLowerCase();

        if (email === '' || loginPassword === '') {
            setErrors('Please fill in all fields.');
            return;
        }

        // Check Admin
        if (
            email === adminAccount.email.toLowerCase() &&
            loginPassword === adminAccount.password
        ) {
            setErrors('');
            setCurrentUser(adminAccount);
            navigate('/admin/dashboard');
            return;
        }

        // Search Patient
        const foundPatient = patient.find((user) =>
            user.email.toLowerCase() === email
        );

        // Search Doctor
        const foundDoctor = doctors.find((user) =>
            user.email.toLowerCase() === email
        );

        // Check Account
        if (!foundPatient && !foundDoctor) {
            setErrors('Email does not exist.');
            return;
        }

        const user = foundPatient || foundDoctor;

        // Check Password
        if (user.password !== loginPassword) {
            setErrors('Incorrect password.');
            return;
        }

        // Login Successful
        setErrors('');
        setCurrentUser(user);

        // Navigate According to Role
        if (user.role === "patient") {
            navigate('/patient/dashboard');
        } else if (user.role === "doctor") {
            navigate('/doctor/dashboard');
        }
    };

    return (
        <section className="
            relative flex min-h-screen w-full
            items-center justify-end
            overflow-hidden bg-[#071b31]
            px-[8%] py-10
            font-sans
            max-lg:px-[5%]
            max-sm:min-h-[100svh]
            max-sm:justify-center
            max-sm:px-4 max-sm:py-6
        ">

            {/* VIDEO BACKGROUND */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="
                    absolute inset-0 z-0
                    h-full w-full object-cover
                "
            >
                <source src={v2} type="video/mp4" />
            </video>

            {/* DARK OVERLAY */}
            <div className="
                absolute inset-0 z-[1]
                bg-[linear-gradient(90deg,rgba(7,27,49,0.48),rgba(7,27,49,0.18),rgba(7,27,49,0.55))]
                max-sm:bg-[rgba(7,27,49,0.55)]
            "></div>

            {/* LEFT WELCOME SECTION */}
            <div className="
                absolute left-[8%] top-1/2 z-[2]
                w-[48%] -translate-y-1/2
                text-white
                max-lg:left-[5%] max-lg:w-[42%]
                max-sm:hidden
            ">

                {/* <div className="
                    mb-[25px] flex h-[65px] w-[65px]
                    items-center justify-center
                    rounded-[18px]
                    border border-white/30
                    bg-white/15
                    text-[32px] text-[#5eead4]
                    backdrop-blur-lg
                ">
                    <FaHeartPulse />
                </div> */}

                <p className="
                    m-0 text-[clamp(38px,5vw,68px)]
                    font-extrabold leading-[1.1]
                ">
                    Welcome Back
                </p>

                <p className="
                    mt-3 text-[clamp(25px,3vw,38px)]
                    font-['Dancing_Script'] font-semibold
                    tracking-[3px] text-[#5eead4]
                    max-lg:text-[23px]
                ">
                    to a healthier life.
                </p>

                <p className="
                    mt-[25px] max-w-[450px]
                    text-base leading-[1.8]
                    text-white/85
                    max-lg:text-sm
                ">
                    Your health journey starts here.
                    Access your appointments and manage your healthcare
                    with MedConnect.
                </p>

            </div>

            {/* LOGIN CONTAINER */}
            <div className="
                relative z-[2] w-[440px] max-w-full
                max-lg:w-[400px]
                max-sm:w-full max-sm:max-w-[420px]
            ">

                <form
                    onSubmit={handleLogin}
                    className="
                        flex w-full flex-col items-center
                        rounded-[22px]
                        border border-white/55
                        bg-white/[0.88]
                        px-[35px] py-[38px]
                        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                        backdrop-blur-[18px]
                        max-lg:px-[27px] max-lg:py-8
                        max-sm:rounded-[17px]
                        max-sm:px-[22px] max-sm:py-[30px]
                        max-[360px]:px-4 max-[360px]:py-[25px]
                    "
                >

                    {/* LOGO */}
                    <div className="
                        flex flex-col items-center
                        text-center
                    ">

                        <img
                            src={logo}
                            alt="MedConnect Logo"
                            className="
                                mb-2 h-[75px] w-[75px]
                                object-contain
                                max-sm:h-[65px] max-sm:w-[65px]
                            "
                        />

                        <h1 className="
                            m-0 text-[30px] font-extrabold
                            text-[#173b4d]
                            max-sm:text-[27px]
                            max-[360px]:text-2xl
                        ">
                            Med<span className="text-[#159b91]">Connect</span>
                        </h1>

                        <p className="
                            mt-[7px] text-sm
                            tracking-[1px] text-slate-500
                        ">
                            Your Health, Our Priority
                        </p>

                    </div>

                    {/* FORM HEADING */}
                    <div className="
                        mb-[25px] mt-[30px]
                        text-center
                        max-sm:mb-[22px] max-sm:mt-6
                    ">

                        <h2 className="
                            mb-2 text-[25px] font-bold
                            text-[#173b4d]
                            max-sm:text-[22px]
                            max-[360px]:text-xl
                        ">
                            Welcome Back!
                        </h2>

                        <p className="text-sm text-[#71838c]">
                            Login to access your account
                        </p>

                    </div>

                    {/* EMAIL */}
                    <div className="mb-5 w-full">

                        <label
                            htmlFor="login-email"
                            className="
                                mb-[9px] block
                                text-sm font-semibold
                                text-[#173b4d]
                            "
                        >
                            Email Address
                        </label>

                        <div className="relative w-full">

                            <MdOutlineMailOutline className="
                                absolute left-[15px] top-1/2
                                z-[1] -translate-y-1/2
                                text-[19px] text-[#82939c]
                            " />

                            <input
                                id="login-email"
                                type="email"
                                placeholder="Enter your email"
                                value={loginEmail}
                                onChange={(e) => {
                                    setLoginEmail(e.target.value);
                                    setErrors('');
                                }}
                                autoComplete="email"
                                required
                                className="
                                    h-[50px] w-full
                                    rounded-[9px]
                                    border border-[#dce5e9]
                                    bg-slate-50
                                    py-0 pl-[45px] pr-[45px]
                                    text-sm text-[#173b4d]
                                    outline-none
                                    transition-all duration-300
                                    placeholder:text-[#9aa8b0]
                                    focus:border-[#159b91]
                                    focus:bg-white
                                    focus:shadow-[0_0_0_3px_rgba(21,155,145,0.12)]
                                    max-sm:h-12
                                "
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}
                    <div className="mb-5 w-full">

                        <label
                            htmlFor="login-password"
                            className="
                                mb-[9px] block
                                text-sm font-semibold
                                text-[#173b4d]
                            "
                        >
                            Password
                        </label>

                        <div className="relative w-full">

                            <MdLockOutline className="
                                absolute left-[15px] top-1/2
                                z-[1] -translate-y-1/2
                                text-[19px] text-[#82939c]
                            " />

                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={loginPassword}
                                onChange={(e) => {
                                    setLoginPassword(e.target.value);
                                    setErrors('');
                                }}
                                autoComplete="current-password"
                                required
                                className="
                                    h-[50px] w-full
                                    rounded-[9px]
                                    border border-[#dce5e9]
                                    bg-slate-50
                                    py-0 pl-[45px] pr-[45px]
                                    text-sm text-[#173b4d]
                                    outline-none
                                    transition-all duration-300
                                    placeholder:text-[#9aa8b0]
                                    focus:border-[#159b91]
                                    focus:bg-white
                                    focus:shadow-[0_0_0_3px_rgba(21,155,145,0.12)]
                                    max-sm:h-12
                                "
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="
                                    absolute right-[14px] top-1/2
                                    flex -translate-y-1/2
                                    items-center justify-center
                                    border-none bg-transparent
                                    text-[19px] text-[#82939c]
                                    transition-colors
                                    hover:text-[#159b91]
                                "
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>

                        </div>

                    </div>

                    {/* ERROR MESSAGE */}
                    {errors && (
                        <p
                            role="alert"
                            className="
                                mb-[15px] w-full
                                rounded-lg border border-red-200
                                bg-red-50 px-[13px] py-[11px]
                                text-[13px] text-red-600
                            "
                        >
                            {errors}
                        </p>
                    )}

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="
                            flex h-[50px] w-full
                            items-center justify-center gap-2.5
                            rounded-[9px] border-none
                            bg-gradient-to-br from-[#159b91] to-[#117c79]
                            text-base font-bold text-white
                            shadow-[0_6px_15px_rgba(21,155,145,0.22)]
                            transition-all duration-300
                            hover:-translate-y-0.5
                            hover:from-[#117c79] hover:to-[#0d6664]
                            hover:shadow-[0_9px_20px_rgba(21,155,145,0.3)]
                            active:translate-y-0
                            max-sm:h-12
                        "
                    >
                        Login
                        <IoIosArrowForward />
                    </button>

                    {/* SIGN UP */}
                    <div className="
                        mt-[22px] flex w-full
                        flex-wrap items-center justify-center gap-[5px]
                        text-[13px] text-[#71838c]
                        max-[360px]:text-xs
                    ">

                        <p>Don't have an account?</p>

                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="
                                flex items-center gap-[3px]
                                border-none bg-transparent
                                text-[13px] font-bold
                                text-[#117c79]
                                transition-colors
                                hover:text-[#0d6664]
                            "
                        >
                            Sign Up
                            <IoIosArrowForward />
                        </button>

                    </div>

                    {/* FOOTER */}
                    <p className="
                        mt-7 text-center text-[11px]
                        text-slate-400
                    ">
                        © 2026 MedConnect. All rights reserved.
                    </p>

                </form>

            </div>

        </section>
    );
}

export default LoginPage;
