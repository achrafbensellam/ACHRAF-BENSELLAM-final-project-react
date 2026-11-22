
import v1 from '../../assets/videos/v1.mp4';
import logo from '../../assets/img/logo2.png';

import { FaRegUser } from "react-icons/fa";
import { FaHeartPulse } from "react-icons/fa6";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useContext, useState } from 'react';
import { MyContext } from '../../utils/mycontext';
import { useNavigate } from 'react-router-dom';

function SignInPage() {

    const { patient, setPatient, doctors } = useContext(MyContext);

    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

    const [errors, setErrors] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    // VALIDATION
    const validate = () => {

        // Name
        if (!signUpName.trim()) {
            setErrors("Name is required");
            return false;
        }

        if (signUpName.trim().length < 3) {
            setErrors("Name must be at least 3 characters");
            return false;
        }

        if (!/^[\p{L}\s'-]+$/u.test(signUpName.trim())) {
            setErrors("Name must contain letters only");
            return false;
        }

        // Email
        const email = signUpEmail.trim().toLowerCase();

        if (!email) {
            setErrors("Email is required");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrors("Enter a valid email address");
            return false;
        }

        // Password
        if (!signUpPassword) {
            setErrors("Password is required");
            return false;
        }

        if (signUpPassword.length < 6) {
            setErrors("Password must be at least 6 characters");
            return false;
        }

        if (!/\d/.test(signUpPassword)) {
            setErrors("Password must contain at least one number");
            return false;
        }

        // Confirm Password
        if (!signUpConfirmPassword) {
            setErrors("Please confirm your password");
            return false;
        }

        if (signUpPassword !== signUpConfirmPassword) {
            setErrors("Passwords do not match");
            return false;
        }

        setErrors('');
        return true;
    };

    // REGISTER PATIENT
    const preventform = (e) => {

        e.preventDefault();

        if (!validate()) return;

        const email = signUpEmail.trim().toLowerCase();

        // Check Existing Email
        const existsPatient = patient.find(
            (user) => user.email.toLowerCase() === email
        );

        const existsDoctor = doctors.find(
            (user) => user.email.toLowerCase() === email
        );

        if (existsPatient || existsDoctor) {
            setErrors("This email is already registered");
            return;
        }

        // Create New Patient
        const newPatient = {
            id: Date.now(),
            name: signUpName.trim(),
            email: email,
            password: signUpPassword,
            role: "patient",
            phone: "",
            dateOfBirth: "",
            gender: "",
            city: "",
            image: "",
            favorites: [],
            createdAt: new Date().toISOString()
        };

        const updatedPatients = [...patient, newPatient];

        setPatient(updatedPatients);

        // Clear Inputs
        setSignUpName('');
        setSignUpEmail('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');

        // Navigate to Login
        navigate('/login');
    };

    return (

        <section className="
            relative flex min-h-screen w-full
            items-center justify-center
            overflow-x-hidden
            px-4 py-8
            font-sans
            lg:justify-start lg:px-[8%] lg:py-10
        ">

            {/* VIDEO BACKGROUND */}

            <video
                autoPlay
                muted
                loop
                playsInline
                className="
                    absolute inset-0 z-0
                    h-full w-full
                    object-cover
                "
            >
                <source src={v1} type="video/mp4" />
            </video>

            {/* DARK OVERLAY */}

            <div className="
                absolute inset-0 z-[1]
                bg-[#071b31]/60
                lg:bg-gradient-to-r
                lg:from-[#071b31]/55
                lg:via-[#071b31]/20
                lg:to-[#071b31]/50
            "></div>

            {/* WELCOME SECTION */}

            <div className="
                absolute right-[8%] top-1/2 z-10
                hidden w-[43%]
                -translate-y-1/2
                text-white
                lg:block
            ">

                {/* <div className="
                    mb-6 flex h-[65px] w-[65px]
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
                    text-[clamp(38px,5vw,65px)]
                    font-extrabold leading-tight
                ">
                    Join MedConnect
                </p>

                <p className="
    mt-3 text-[clamp(25px,3vw,38px)]
    font-['Dancing_Script'] font-semibold
    tracking-[3px] text-[#5eead4]
">
                    for a healthier life.
                </p>

                <p className="
                    mt-6 max-w-[450px]
                    text-[15px] leading-[1.8]
                    text-white/85
                ">
                    Create your account and take control of your
                    healthcare journey. Book appointments and
                    connect with trusted doctors.
                </p>

            </div>

            {/* SIGN UP CONTAINER */}

            <div className="
                relative z-10
                w-full max-w-[450px]
            ">

                <form
                    onSubmit={preventform}
                    className="
                        flex w-full flex-col
                        items-center
                        rounded-[22px]
                        border border-white/55
                        bg-white/[0.88]
                        px-6 py-7
                        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                        backdrop-blur-[18px]
                        sm:px-9 sm:py-8
                    "
                >

                    {/* BRAND */}

                    <div className="
                        flex flex-col
                        items-center text-center
                    ">

                        <img
                            src={logo}
                            alt="MedConnect Logo"
                            className="
                                mb-1 h-[65px] w-[65px]
                                object-contain
                            "
                        />

                        <h1 className="
                            text-[29px] font-extrabold
                            text-[#173b4d]
                        ">
                            Med<span className="text-[#159b91]">Connect</span>
                        </h1>

                        <p className="
                            mt-1 text-[13px]
                            tracking-[1px]
                            text-[#64748b]
                        ">
                            Your Health, Our Priority
                        </p>

                    </div>

                    {/* FORM HEADING */}

                    <div className="my-5 text-center">

                        <h2 className="
                            text-[23px] font-bold
                            text-[#173b4d]
                        ">
                            Create Your Account
                        </h2>

                        <p className="
                            mt-1 text-[13px]
                            text-[#71838c]
                        ">
                            Fill in your details to get started
                        </p>

                    </div>

                    {/* NAME */}

                    <div className="mb-4 w-full">

                        <label
                            htmlFor="signup-name"
                            className="
                                mb-2 block
                                text-[13px] font-semibold
                                text-[#173b4d]
                            "
                        >
                            Full Name
                        </label>

                        <div className="relative w-full">

                            <FaRegUser className="
                                absolute left-[15px] top-1/2
                                z-[1] -translate-y-1/2
                                text-[17px] text-[#82939c]
                            " />

                            <input
                                id="signup-name"
                                type="text"
                                placeholder="Enter your full name"
                                value={signUpName}
                                onChange={(e) => {
                                    setSignUpName(e.target.value);
                                    setErrors('');
                                }}
                                autoComplete="name"
                                required
                                className="
                                    h-[45px] w-full
                                    rounded-[9px]
                                    border border-[#dce5e9]
                                    bg-[#f8fafc]
                                    px-[45px]
                                    text-[13px] text-[#173b4d]
                                    outline-none
                                    transition duration-300
                                    placeholder:text-[#9aa8b0]
                                    focus:border-[#159b91]
                                    focus:bg-white
                                    focus:shadow-[0_0_0_3px_rgba(21,155,145,0.12)]
                                "
                            />

                        </div>

                    </div>

                    {/* EMAIL */}

                    <div className="mb-4 w-full">

                        <label
                            htmlFor="signup-email"
                            className="
                                mb-2 block
                                text-[13px] font-semibold
                                text-[#173b4d]
                            "
                        >
                            Email Address
                        </label>

                        <div className="relative w-full">

                            <MdOutlineMailOutline className="
                                absolute left-[15px] top-1/2
                                z-[1] -translate-y-1/2
                                text-[17px] text-[#82939c]
                            " />

                            <input
                                id="signup-email"
                                type="email"
                                placeholder="Enter your email"
                                value={signUpEmail}
                                onChange={(e) => {
                                    setSignUpEmail(e.target.value);
                                    setErrors('');
                                }}
                                autoComplete="email"
                                required
                                className="
                                    h-[45px] w-full
                                    rounded-[9px]
                                    border border-[#dce5e9]
                                    bg-[#f8fafc]
                                    px-[45px]
                                    text-[13px] text-[#173b4d]
                                    outline-none
                                    transition duration-300
                                    placeholder:text-[#9aa8b0]
                                    focus:border-[#159b91]
                                    focus:bg-white
                                    focus:shadow-[0_0_0_3px_rgba(21,155,145,0.12)]
                                "
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}

                    <div className="mb-4 w-full">

                        <label
                            htmlFor="signup-password"
                            className="
                                mb-2 block
                                text-[13px] font-semibold
                                text-[#173b4d]
                            "
                        >
                            Password
                        </label>

                        <div className="relative w-full">

                            <MdLockOutline className="
                                absolute left-[15px] top-1/2
                                z-[1] -translate-y-1/2
                                text-[17px] text-[#82939c]
                            " />

                            <input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={signUpPassword}
                                onChange={(e) => {
                                    setSignUpPassword(e.target.value);
                                    setErrors('');
                                }}
                                autoComplete="new-password"
                                required
                                className="
                                    h-[45px] w-full
                                    rounded-[9px]
                                    border border-[#dce5e9]
                                    bg-[#f8fafc]
                                    px-[45px]
                                    pr-12
                                    text-[13px] text-[#173b4d]
                                    outline-none
                                    transition duration-300
                                    placeholder:text-[#9aa8b0]
                                    focus:border-[#159b91]
                                    focus:bg-white
                                    focus:shadow-[0_0_0_3px_rgba(21,155,145,0.12)]
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
                                    bg-transparent
                                    text-[18px] text-[#82939c]
                                    transition
                                    hover:text-[#159b91]
                                "
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>

                        </div>

                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div className="mb-4 w-full">

                        <label
                            htmlFor="signup-confirm-password"
                            className="
                                mb-2 block
                                text-[13px] font-semibold
                                text-[#173b4d]
                            "
                        >
                            Confirm Password
                        </label>

                        <div className="relative w-full">

                            <MdLockOutline className="
                                absolute left-[15px] top-1/2
                                z-[1] -translate-y-1/2
                                text-[17px] text-[#82939c]
                            " />

                            <input
                                id="signup-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={signUpConfirmPassword}
                                onChange={(e) => {
                                    setSignUpConfirmPassword(e.target.value);
                                    setErrors('');
                                }}
                                autoComplete="new-password"
                                required
                                className="
                                    h-[45px] w-full
                                    rounded-[9px]
                                    border border-[#dce5e9]
                                    bg-[#f8fafc]
                                    px-[45px] pr-12
                                    text-[13px] text-[#173b4d]
                                    outline-none
                                    transition duration-300
                                    placeholder:text-[#9aa8b0]
                                    focus:border-[#159b91]
                                    focus:bg-white
                                    focus:shadow-[0_0_0_3px_rgba(21,155,145,0.12)]
                                "
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                className="
                                    absolute right-[14px] top-1/2
                                    flex -translate-y-1/2
                                    items-center justify-center
                                    bg-transparent
                                    text-[18px] text-[#82939c]
                                    transition
                                    hover:text-[#159b91]
                                "
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>

                        </div>

                    </div>

                    {/* ERROR */}

                    {errors && (
                        <p
                            role="alert"
                            className="
                                mb-3 w-full
                                rounded-lg border border-red-200
                                bg-red-50 px-3 py-2
                                text-[12px] text-red-600
                            "
                        >
                            {errors}
                        </p>
                    )}

                    {/* SIGN UP BUTTON */}

                    <button
                        type="submit"
                        className="
                            flex h-[47px] w-full
                            items-center justify-center gap-2
                            rounded-[9px]
                            bg-gradient-to-r from-[#159b91] to-[#117c79]
                            text-[15px] font-bold text-white
                            shadow-[0_6px_15px_rgba(21,155,145,0.22)]
                            transition duration-300
                            hover:-translate-y-0.5
                            hover:from-[#117c79] hover:to-[#0d6664]
                            hover:shadow-[0_9px_20px_rgba(21,155,145,0.3)]
                            active:translate-y-0
                        "
                    >
                        Create Account
                        <IoIosArrowForward />
                    </button>

                    {/* LOGIN LINK */}

                    <div className="
                        mt-4 flex w-full flex-wrap
                        items-center justify-center gap-1
                        text-[12px] text-[#71838c]
                    ">

                        <p>Already have an account?</p>

                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="
                                flex items-center gap-1
                                font-bold text-[#117c79]
                                transition
                                hover:text-[#0d6664]
                            "
                        >
                            Login
                            <IoIosArrowForward />
                        </button>

                    </div>

                    {/* FOOTER */}

                    <p className="
                        mt-5 text-center
                        text-[10px] text-[#94a3b8]
                    ">
                        © 2026 MedConnect. All rights reserved.
                    </p>

                </form>

            </div>

        </section>
    );
}

export default SignInPage;
