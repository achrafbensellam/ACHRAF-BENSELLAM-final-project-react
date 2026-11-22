
import './login.css';

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

        // Check Empty Inputs
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
        <section className="login-page">

            {/* VIDEO BACKGROUND */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="login-video"
            >
                <source src={v2} type="video/mp4" />
            </video>

            {/* DARK OVERLAY */}
            <div className="login-overlay"></div>

            {/* LEFT SIDE TEXT */}
            <div className="login-welcome">

                <div className="welcome-icon">
                    <FaHeartPulse />
                </div>

                <p className="welcome-title">
                    Welcome Back
                </p>

                <p className="welcome-subtitle">
                    to a healthier life.
                </p>

                <p className="welcome-description">
                    Your health journey starts here.
                    Access your appointments and manage your healthcare
                    with MedConnect.
                </p>

            </div>

            {/* LOGIN FORM */}
            <div className="login-container">

                <form
                    onSubmit={handleLogin}
                    className="login-form"
                >

                    {/* LOGO */}
                    <div className="login-brand">

                        <img
                            src={logo}
                            alt="MedConnect Logo"
                            className="login-logo"
                        />

                        <h1 className="brand-name">
                            Med<span>Connect</span>
                        </h1>

                        <p className="brand-description">
                            Your Health, Our Priority
                        </p>

                    </div>

                    {/* FORM TITLE */}
                    <div className="login-heading">

                        <h2>Welcome Back!</h2>

                        <p>
                            Login to access your account
                        </p>

                    </div>

                    {/* EMAIL */}
                    <div className="login-input-group">

                        <label htmlFor="login-email">
                            Email Address
                        </label>

                        <div className="login-input-wrapper">

                            <MdOutlineMailOutline className="login-input-icon" />

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
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}
                    <div className="login-input-group">

                        <label htmlFor="login-password">
                            Password
                        </label>

                        <div className="login-input-wrapper">

                            <MdLockOutline className="login-input-icon" />

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
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>

                        </div>

                    </div>

                    {/* ERROR MESSAGE */}
                    {errors && (
                        <p className="login-error" role="alert">
                            {errors}
                        </p>
                    )}

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                        <IoIosArrowForward />
                    </button>

                    {/* SIGN UP */}
                    <div className="signup-text">

                        <p>Don't have an account?</p>

                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="signup-link"
                        >
                            Sign Up
                            <IoIosArrowForward />
                        </button>

                    </div>

                    {/* FOOTER */}
                    <p className="login-footer">
                        © 2026 MedConnect. All rights reserved.
                    </p>

                </form>

            </div>

        </section>
    );
}

export default LoginPage;
