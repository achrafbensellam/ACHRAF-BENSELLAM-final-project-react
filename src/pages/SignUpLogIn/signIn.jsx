
import './signIn.css';
import v1 from '../../assets/videos/v1.mp4';
import logo from '../../assets/img/logo2.png'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaHeartPulse } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useContext, useState } from 'react';
import { MyContext } from '../../utils/mycontext';
function SignInPage() {
    const { patient, setPatient, doctors, setDoctors } = useContext(MyContext);
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');
    const validate = () => {

        // Name
        if (!signUpName.trim()) {
            setErrors("Name is required");
            return
        } else if (signUpName.trim().length < 3) {
            setErrors("Name must be at least 3 characters");
            return
        } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(signUpName)) {
            setErrors("Name must contain letters only");
            return
        }

        // Email
        if (!signUpEmail.trim()) {
            setErrors("Email is required")
            return
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail)) {
            setErrors("Enter a valid email address")
            return
        }

        // Password
        if (!signUpPassword) {
            setErrors("Password is required")
            return
        } else if (signUpPassword.length < 6) {
            setErrors("Password must be at least 6 characters")
            return
        } else if (!/\d/.test(signUpPassword)) {
            setErrors("Password must contain at least one number")
            return
        }

        // Confirm password
        if (!signUpConfirmPassword) {
            setErrors("Please confirm your password")
            return
        } else if (signUpPassword !== signUpConfirmPassword) {
            setErrors("Passwords do not match")
            return
        }
        setErrors('');
        return true;
    };
    const preventform = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // const users = JSON.parse(localStorage.getItem("patient")) || [];
        const existsPatient = patient.find(
            (u) => u.email.toLowerCase() === signUpEmail.trim().toLowerCase()
        );
        const existsDoctor = doctors.find(
            (u) => u.email.toLowerCase() === signUpEmail.trim().toLowerCase()
        );
        if (existsPatient || existsDoctor) {
            setErrors("This email is already registered");
            return;
        }


        const newPatient = {
            id: Date.now(),
            name: signUpName.trim(),
            email: signUpEmail.trim().toLowerCase(),
            password: signUpPassword,
            role: "patient"
        };
        const updatedPatients = [...patient, newPatient];
        setPatient(updatedPatients);
        localStorage.setItem("patient", JSON.stringify(updatedPatients));

        // setSuccess("Account created successfully!");
        setSignUpName('');
        setSignUpEmail('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');
    }
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
                    <source src={v1} type="video/mp4" />
                </video>
                <div className="absolute top-0 left-0 z-100 flex flex-col justify-end items-center  border1 h-screen">
                    <form onSubmit={preventform} className='flex flex-col justify-center items-center border w-[70%] h-[90%] rounded-[10px] bg-[rgba(255,255,255,0.18)]'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='divLOGO2'>
                                <img className='logo2' src={logo} alt="" />
                            </div>
                            <p className='w-full flex text-4xl text-[#0b2d6b] font-[600]'><span className=''>Med</span><span className='text-[#2563eb] flex'>C<span className=''><FaHeartPulse className=' text-[#ef4444] text-4xl relative top-2 ' /></span>nnect</span></p>
                            <p className='text-white formPara1'>Your Health, Our Priority</p>
                        </div>
                        <div className='text-center formPara2'>
                            <p className='text-[17px] font-[600]'>Create Your Account</p>
                            {/* <p className='text-[15px]'>Fill in the details below to get started</p> */}
                        </div>
                        <div className='w-[80%]'>
                            <p className='inputsTitles'>Name : </p>
                            <div className='relative w-full'>
                                <FaRegUser className='absolute  left-0 top-1/5 text-[rgb(134,131,131)] ' />
                                <input onChange={(e) => { setSignUpName(e.target.value) }} value={signUpName} className='signUpInputs' type="text" placeholder='Full Name' />
                            </div>
                            <p className='inputsTitles'>Email :</p>
                            <div className='relative w-full'>
                                <MdOutlineMailOutline className='absolute  left-0 top-1/5 text-[rgb(134,131,131)] ' />
                                <input onChange={(e) => { setSignUpEmail(e.target.value) }} value={signUpEmail} className='signUpInputs' type="email" placeholder='Email Address' />
                            </div>
                            <p className='inputsTitles'>Password :</p>

                            <div className='relative w-full'>
                                <MdLockOutline className='absolute  left-0 top-1/5 text-[rgb(134,131,131)] ' />
                                <input onChange={(e) => { setSignUpPassword(e.target.value) }} value={signUpPassword} className='signUpInputs' type="password" placeholder='Password' />
                            </div>
                            <p className='inputsTitles'>Confirm Password :</p>
                            <div className='relative w-full'>
                                <MdLockOutline className='absolute  left-0 top-1/5 text-[rgb(134,131,131)] ' />
                                <input onChange={(e) => { setSignUpConfirmPassword(e.target.value) }} value={signUpConfirmPassword} className='signUpInputs' type="password" placeholder='Confirm Password' />
                            </div>
                            <p className='error'>{errors}</p>
                            <button className='bg-[rgb(70,160,253)] w-full rounded-[3px] border-none cursor-pointer text-white font-[600] buttonStyle' type='submit'>Sign Up</button>
                            <p className='flex gap-[5px]'>Already have an account? <span className='flex justify-center items-center'>Login <span><IoIosArrowForward /></span></span> </p>
                        </div>
                    </form>
                </div>
                <div className='absolute bottom-10 right-40 z-400'>
                    <p className='text-[60px] font-[900] text-[rgb(2,17,50)] '>Join MedConnect</p>
                    <p className='signUpPara1 text-[30px] tracking-[10px] font-[700]'>for a healthier life.</p>
                </div>

            </section>
        </>
    );
}

export default SignInPage;

