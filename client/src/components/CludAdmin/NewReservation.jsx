import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClubById, sendDemande, sendReservation } from '../../features/Clubs/ClubSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewReservation = ({ onClose }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            handleClickOutside(event);
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    const { clubId } = useParams();
    const salles = [

        "Amphi 2", "Amphi 3", 
        "A1", "A2", "A3", "A4",
        "A5", "A6", "A7", "A8",
        "A9", "A10",

        "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8",
        "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16",
        "B17", "B18", "B19", "B20", "B21", "B22",

        "C1", "C2", "C3", "C4", "C5", "C6"
    ];
    const club = useSelector((state) => getClubById(state, clubId));
    const [reservation, setReservation] = useState({
        clubId,
        salle: '',
        reason: '',
        participant:'',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendReservation(reservation));
        toast.success('Reservation sent successfully');
    };

    const canSave = [reservation.date, reservation.salle, reservation.reason].every(Boolean);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-20">
                <div ref={modalRef} className="p-4 border border-gray-300 shadow-md rounded-2xl h-[52%] bg-[#DEF2F1] w-3/6 flex flex-col justify-between z-50">
                    <div className='w-fit h-fit item-center flex flex-col mx-auto'>
                        <h1 className="text-5xl text-center font-bold mt-5">New reservation</h1>
                        <div className=" items-center mt-10 justify-center">
                            <div role="alert" className="alert alert-info mb-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>An email will be sent to the person responsible for further considerations</span>
                            </div>

                            <form className='mx-auto w-full items-center' onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className='relative z-0 w-full mb-10 group'>
                                        <select
                                            id="salle"
                                            name="salle"
                                            value={reservation.salle}
                                            onChange={handleChange}
                                            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            required
                                        >
                                            <option value="" disabled>Choisissez une salle*</option>
                                            {salles.map((salle) => (
                                                <option key={salle} value={salle}>
                                                    {salle}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='relative z-0 w-full mb-10 group'>
                                        <input
                                            type="number"
                                            name='participant'
                                            value={reservation.participant}
                                            onChange={handleChange}
                                            id='date'
                                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                            placeholder=' '
                                            required
                                        />
                                        <label
                                            htmlFor='participant'
                                            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                        >
                                            Nombre de participants*
                                        </label>
                                    </div>
                                </div>


                                <div className='relative z-0 w-full mb-10 group'>
                                    <input
                                        type="date"
                                        name='date'
                                        value={reservation.date}
                                        onChange={handleChange}
                                        id='date'
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required
                                    />
                                    <label
                                        htmlFor='date'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Date*
                                    </label>
                                </div>
                                <div className='relative z-0 w-full mb-10 group'>
                                    <textarea
                                        type='text'
                                        name='reason'
                                        value={reservation.reason}
                                        onChange={handleChange}
                                        id='reason'
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required
                                    ></textarea>
                                    <label
                                        htmlFor='reason'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Motivation*
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-end">
                        <button type='submit' className="btn btn-success" disabled={!canSave} onClick={handleSubmit}>Submit</button>
                        <button type='button' className="btn btn-error" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
            <ToastContainer theme='colored' />
        </>
    );
};

export default NewReservation;
