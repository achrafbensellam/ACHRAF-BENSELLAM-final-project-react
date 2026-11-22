
import { useContext, useState } from "react";
import { MyContext } from "../../utils/mycontext";
import DoctorSidebar from "../../layouts/doctorSidebar";

import {
    FiCalendar,
    FiClock,
    FiSave,
    FiTrash2
} from "react-icons/fi";

function MySchedule() {

    const {
        currentUser,
        setCurrentUser,
        doctors,
        setDoctors
    } = useContext(MyContext);

    // Working days
    const [workingDays, setWorkingDays] = useState(
        currentUser?.workingDays || []
    );

    // Working hours
    const [startTime, setStartTime] = useState(
        currentUser?.workingHours?.start || "09:00"
    );

    const [endTime, setEndTime] = useState(
        currentUser?.workingHours?.end || "17:00"
    );

    // Appointment duration
    const [slotDuration, setSlotDuration] = useState(
        currentUser?.slotDuration || 30
    );

    // Days off
    const [daysOff, setDaysOff] = useState(
        currentUser?.daysOff || []
    );

    const [selectedDayOff, setSelectedDayOff] = useState("");
    const [message, setMessage] = useState("");

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const today = new Date().toLocaleDateString("en-CA");

    // Check doctor login
    if (!currentUser || currentUser.role !== "doctor") {
        return <h2>Please login as a doctor.</h2>;
    }

    // Select or unselect a working day
    const toggleDay = (day) => {

        if (workingDays.includes(day)) {

            const newDays = workingDays.filter((item) => {
                return item !== day;
            });

            setWorkingDays(newDays);

        } else {

            setWorkingDays([...workingDays, day]);

        }

        setMessage("");
    };

    // Add a day off
    const addDayOff = () => {

        if (selectedDayOff === "") {
            return;
        }

        if (selectedDayOff < today) {
            setMessage("You cannot add a past date.");
            return;
        }

        if (daysOff.includes(selectedDayOff)) {
            setMessage("This day off already exists.");
            return;
        }

        setDaysOff([...daysOff, selectedDayOff]);

        setSelectedDayOff("");
        setMessage("");
    };

    // Remove a day off
    const removeDayOff = (date) => {

        const newDaysOff = daysOff.filter((day) => {
            return day !== date;
        });

        setDaysOff(newDaysOff);
        setMessage("");
    };

    // Save schedule
    const saveSchedule = () => {

        if (workingDays.length === 0) {
            setMessage("Please select at least one working day.");
            return;
        }

        if (startTime >= endTime) {
            setMessage("End time must be later than start time.");
            return;
        }

        const updatedDoctor = {
            ...currentUser,
            workingDays: workingDays,
            workingHours: {
                start: startTime,
                end: endTime
            },
            slotDuration: Number(slotDuration),
            daysOff: daysOff
        };

        // Update current logged-in doctor
        setCurrentUser(updatedDoctor);

        // Update doctor information
        const updatedDoctors = doctors.map((doctor) => {

            if (String(doctor.id) === String(currentUser.id)) {
                return updatedDoctor;
            }

            return doctor;
        });

        setDoctors(updatedDoctors);

        setMessage("Your schedule has been saved successfully!");
    };

    return (

        <div className="min-h-screen bg-[#f5f8fa]">

            <DoctorSidebar />

            <main className="
                ml-[260px] w-[calc(100%-260px)] min-h-screen
                p-10 box-border text-[#193344] font-[Arial,sans-serif]
                max-lg:ml-[210px] max-lg:w-[calc(100%-210px)]
                max-lg:px-5 max-lg:py-[30px]
                max-sm:ml-0 max-sm:w-full
                max-sm:px-[15px] max-sm:pt-[25px] max-sm:pb-[120px]
            ">

                {/* Page Header */}
                <div className="mb-[30px]">

                    <h1 className="mb-2 text-[28px] font-bold max-sm:text-[23px]">
                        My Schedule
                    </h1>

                    <p className="text-sm text-[#82919b]">
                        Manage your working days and availability
                    </p>

                </div>

                {/* Working Days */}
                <section className="
                    mb-[22px] rounded-xl bg-white p-[25px]
                    shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                    max-sm:p-[18px]
                ">

                    <div className="mb-[22px] flex items-center gap-[13px]">

                        <FiCalendar className="text-[23px] text-[#269b9b]" />

                        <div>
                            <h2 className="mb-1 text-lg font-semibold max-sm:text-base">
                                Working Days
                            </h2>

                            <p className="text-xs text-[#82919b]">
                                Select the days you are available
                            </p>
                        </div>

                    </div>

                    <div className="
                        grid grid-cols-4 gap-3
                        max-lg:grid-cols-3
                        max-sm:grid-cols-2 max-sm:gap-[9px]
                    ">

                        {days.map((day) => (

                            <label
                                key={day}
                                className="
                                    flex cursor-pointer items-center gap-2.5
                                    rounded-lg border border-[#e7edef]
                                    bg-[#f7f9fa] p-[14px]
                                    transition hover:border-[#269b9b]
                                    max-sm:gap-[7px] max-sm:px-[9px] max-sm:py-3
                                "
                            >

                                <input
                                    type="checkbox"
                                    checked={workingDays.includes(day)}
                                    onChange={() => toggleDay(day)}
                                    className="
                                        h-[17px] w-[17px] cursor-pointer
                                        accent-[#269b9b]
                                    "
                                />

                                <span className="text-[13px] text-[#526572] max-sm:text-[11px]">
                                    {day}
                                </span>

                            </label>

                        ))}

                    </div>

                </section>

                {/* Working Hours */}
                <section className="
                    mb-[22px] rounded-xl bg-white p-[25px]
                    shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                    max-sm:p-[18px]
                ">

                    <div className="mb-[22px] flex items-center gap-[13px]">

                        <FiClock className="text-[23px] text-[#269b9b]" />

                        <div>
                            <h2 className="mb-1 text-lg font-semibold max-sm:text-base">
                                Working Hours
                            </h2>

                            <p className="text-xs text-[#82919b]">
                                Set your daily working hours
                            </p>
                        </div>

                    </div>

                    <div className="
                        grid grid-cols-2 gap-5
                        max-sm:grid-cols-1 max-sm:gap-[15px]
                    ">

                        <div className="flex flex-col gap-[9px]">

                            <label className="text-[13px] font-bold text-[#526572]">
                                Start Time
                            </label>

                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                    setMessage("");
                                }}
                                className="
                                    box-border h-[45px] w-full rounded-lg
                                    border border-[#e1e8ec] bg-white
                                    px-3 text-[13px] text-[#193344]
                                    outline-none focus:border-[#269b9b]
                                "
                            />

                        </div>

                        <div className="flex flex-col gap-[9px]">

                            <label className="text-[13px] font-bold text-[#526572]">
                                End Time
                            </label>

                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => {
                                    setEndTime(e.target.value);
                                    setMessage("");
                                }}
                                className="
                                    box-border h-[45px] w-full rounded-lg
                                    border border-[#e1e8ec] bg-white
                                    px-3 text-[13px] text-[#193344]
                                    outline-none focus:border-[#269b9b]
                                "
                            />

                        </div>

                    </div>

                </section>

                {/* Appointment Duration */}
                <section className="
                    mb-[22px] rounded-xl bg-white p-[25px]
                    shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                    max-sm:p-[18px]
                ">

                    <div className="mb-[22px] flex items-center gap-[13px]">

                        <FiClock className="text-[23px] text-[#269b9b]" />

                        <div>
                            <h2 className="mb-1 text-lg font-semibold max-sm:text-base">
                                Appointment Duration
                            </h2>

                            <p className="text-xs text-[#82919b]">
                                Choose how long each appointment takes
                            </p>
                        </div>

                    </div>

                    <div className="flex max-w-[300px] flex-col gap-[9px] max-sm:max-w-full">

                        <label className="text-[13px] font-bold text-[#526572]">
                            Duration
                        </label>

                        <select
                            value={slotDuration}
                            onChange={(e) => {
                                setSlotDuration(e.target.value);
                                setMessage("");
                            }}
                            className="
                                box-border h-[45px] w-full rounded-lg
                                border border-[#e1e8ec] bg-white
                                px-3 text-[13px] text-[#193344]
                                outline-none focus:border-[#269b9b]
                            "
                        >
                            <option value="15">15 Minutes</option>
                            <option value="30">30 Minutes</option>
                            <option value="45">45 Minutes</option>
                            <option value="60">60 Minutes</option>
                        </select>

                    </div>

                </section>

                {/* Days Off */}
                <section className="
                    mb-[22px] rounded-xl bg-white p-[25px]
                    shadow-[0_3px_15px_rgba(0,0,0,0.04)]
                    max-sm:p-[18px]
                ">

                    <div className="mb-[22px] flex items-center gap-[13px]">

                        <FiCalendar className="text-[23px] text-[#269b9b]" />

                        <div>
                            <h2 className="mb-1 text-lg font-semibold max-sm:text-base">
                                Days Off
                            </h2>

                            <p className="text-xs text-[#82919b]">
                                Add dates when you are not available
                            </p>
                        </div>

                    </div>

                    <div className="
                        mb-5 flex items-center gap-3
                        max-sm:flex-col max-sm:items-stretch
                    ">

                        <input
                            type="date"
                            min={today}
                            value={selectedDayOff}
                            onChange={(e) => {
                                setSelectedDayOff(e.target.value);
                                setMessage("");
                            }}
                            className="
                                box-border h-[43px] rounded-lg
                                border border-[#e1e8ec] px-3
                                text-[13px] text-[#193344]
                                outline-none focus:border-[#269b9b]
                                max-sm:w-full
                            "
                        />

                        <button
                            type="button"
                            onClick={addDayOff}
                            className="
                                h-[43px] rounded-lg bg-[#269b9b]
                                px-[18px] text-xs text-white
                                transition hover:bg-[#1d8282]
                                max-sm:w-full
                            "
                        >
                            Add Day Off
                        </button>

                    </div>

                    <div className="flex flex-col gap-2.5">

                        {daysOff.length === 0 ? (

                            <p className="text-[13px] text-[#82919b]">
                                No days off added yet.
                            </p>

                        ) : (

                            daysOff.map((date) => (

                                <div
                                    key={date}
                                    className="
                                        flex items-center justify-between
                                        rounded-lg border border-[#ffe1e1]
                                        bg-[#fff5f5] px-[15px] py-3
                                        text-[13px] text-[#526572]
                                    "
                                >

                                    <span>{date}</span>

                                    <button
                                        type="button"
                                        onClick={() => removeDayOff(date)}
                                        title="Remove day off"
                                        className="
                                            flex h-8 w-8 items-center justify-center
                                            rounded-[7px] bg-[#ffe5e5]
                                            text-base text-[#dc4c4c]
                                            transition hover:bg-[#dc4c4c]
                                            hover:text-white
                                        "
                                    >
                                        <FiTrash2 />
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                </section>

                {/* Save Button */}
                <div className="
                    mt-[25px] flex flex-wrap items-center
                    justify-between gap-[15px]
                    max-sm:flex-col max-sm:items-stretch
                ">

                    {message && (
                        <p className="text-[13px] text-[#269b9b]">
                            {message}
                        </p>
                    )}

                    <button
                        onClick={saveSchedule}
                        className="
                            flex items-center justify-center gap-[9px]
                            rounded-lg bg-[#269b9b] px-[22px] py-[13px]
                            text-[13px] text-white transition
                            hover:bg-[#1d8282]
                            max-sm:w-full
                        "
                    >
                        <FiSave />
                        Save Schedule
                    </button>

                </div>

            </main>

        </div>

    );
}

export default MySchedule;
