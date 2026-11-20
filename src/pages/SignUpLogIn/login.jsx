import './login.css'
import v2 from '../../assets/videos/v2.mp4'
import logo from '../../assets/img/logo2.png'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaHeartPulse } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useContext } from 'react';
import { MyContext } from '../../utils/mycontext';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
    const { patient, setPatient, doctors, setDoctors, currentUser, setCurrentUser } = useContext(MyContext)
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigateToDashboard = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();

        // Check empty inputs
        if (loginEmail.trim() === '' || loginPassword === '') {
            setErrors('Please fill in all fields');
            return;
        }

        // Search for patient
        const foundPatient = patient.find(
            (user) => user.email.toLowerCase() === loginEmail.trim().toLowerCase()
        );

        // Search for doctor
        const foundDoctor = doctors.find(
            (user) => user.email.toLowerCase() === loginEmail.trim().toLowerCase()
        );

        // Check if account exists
        if (!foundPatient && !foundDoctor) {
            setErrors('Email does not exist');
            return;
        }

        // Get user
        const user = foundPatient || foundDoctor;

        // Check password
        if (user.password !== loginPassword) {
            setErrors('Incorrect password');
            return;
        }

        // Login successful
        setErrors('');

        // Save logged user
        setCurrentUser(user);
        navigateToDashboard("/patient/dashboard");
        localStorage.setItem('loggedUser', JSON.stringify(user));
        alert(`Welcome ${user.name}!`);
    };
    const navigateTosignUp=useNavigate();
    return (
        <>

            <section className="">

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="v1"
                >
                    <source src={v2} type="video/mp4" />
                </video>

                <div className="absolute top-0 right-0 z-100 flex flex-col justify-end items-center border1 h-screen">

                    <form
                        onSubmit={handleLogin}
                        className='flex flex-col justify-center items-center border w-[70%] h-[90%] rounded-[10px] bg-[rgba(255,255,255,0.18)]'
                    >

                        {/* LOGO */}
                        <div className='flex flex-col justify-center items-center'>

                            <div className='divLOGO2'>
                                <img className='logo2' src={logo} alt="MedConnect Logo" />
                            </div>

                            <p className='w-full flex text-4xl text-[#0b2d6b] font-[600]'>
                                <span>Med</span>
                                <span className='text-[#2563eb] flex'>
                                    C
                                    <span>
                                        <FaHeartPulse className='text-[#ef4444] text-4xl relative top-2' />
                                    </span>
                                    nnect
                                </span>
                            </p>

                            <p className='text-white formPara1'>
                                Your Health, Our Priority
                            </p>

                        </div>

                        {/* TITLE */}
                        <div className='text-center formPara2'>
                            <p className='text-[22px] font-[700]'>
                                Welcome Back!
                            </p>

                            <p className='text-[15px]'>
                                Login to access your account
                            </p>
                        </div>

                        {/* INPUTS */}
                        <div className='w-[80%]'>

                            {/* EMAIL */}
                            <p className='inputsTitles'>Email :</p>

                            <div className='relative w-full'>

                                <MdOutlineMailOutline className='absolute left-0 top-1/5 text-[rgb(134,131,131)]' />

                                <input
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    value={loginEmail}
                                    className='signUpInputs'
                                    type="email"
                                    placeholder='Email Address'
                                />

                            </div>

                            {/* PASSWORD */}
                            <p className='inputsTitles'>Password :</p>

                            <div className='relative w-full'>

                                <MdLockOutline className='absolute left-0 top-1/5 text-[rgb(134,131,131)]' />

                                <input
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    value={loginPassword}
                                    className='signUpInputs'
                                    type="password"
                                    placeholder='Password'
                                />

                            </div>

                            {/* FORGOT PASSWORD */}
                            <div className='flex justify-end mt-2 mb-3'>
                                {/* <p className='text-[#0b2d6b] cursor-pointer font-[600] text-sm'>
                                    Forgot Password?
                                </p> */}
                            </div>

                            {/* ERRORS */}
                            <p className='error'>{errors}</p>

                            {/* LOGIN BUTTON */}
                            <button
                                className='bg-[rgb(70,160,253)] w-full rounded-[3px] border-none cursor-pointer text-white font-[600] buttonStyle'
                                type='submit'
                            >
                                Login
                            </button>

                            {/* SIGN UP LINK */}
                            <p className='flex gap-[5px] justify-center mt-4'>
                                Don't have an account?

                                <span onClick={()=>navigateTosignUp('/signup')}  className='flex justify-center items-center text-[#0b2d6b] font-[700] cursor-pointer'>
                                    Sign Up
                                    <IoIosArrowForward />
                                </span>
                            </p>

                        </div>

                    </form>

                </div>

                {/* SIDE TEXT */}
                <div className='absolute bottom-10 left-10 z-400'>

                    <p className='text-[60px] font-[900] text-[rgb(2,17,50)]'>
                        Welcome Back
                    </p>

                    <p className='signUpPara1 text-[30px] tracking-[10px] font-[700]'>
                        to a healthier life.
                    </p>

                </div>

            </section>

        </>
    )
}
export default LoginPage;