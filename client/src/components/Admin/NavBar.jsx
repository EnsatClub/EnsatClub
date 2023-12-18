import {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import logo from "../../assets/EnsatClub.png"
import ClubForm from './ClubForm';
import { FormProvider } from '../../context/FormContext';

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="navbar shadow-md justify-between  flex px-10 bg-[#f3fffe] text-[#17252A] sticky top-0 z-10 ">
            <div className="flex items-center">
                <div className="w-16 h-12 rounded-full overflow-hidden mr-4">
                    <img src={logo} alt="" className="object-cover w-full h-full" />
                </div>
                <h2 className="text-2xl font-bold ">Ensat Club</h2>
            </div>
            <div className="flex flex-row gap-6">
                <NavLink to="/" className="text-2xl"><h2>Dashboard</h2></NavLink>
                <NavLink to="/admin" className="text-2xl"><h2>Clubs</h2></NavLink>
                <NavLink to="/" className="text-2xl"><h2>Events</h2></NavLink>
                <h2 className="text-2xl" onClick={togglePopup}>Add a new club</h2>
                <NavLink to="/" className="text-2xl"><h2>Join a club</h2></NavLink>

            </div>
            <div>
                <input type="text" placeholder="Search" className="input input-bordered w-32 md:w-auto mx-3" />
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-2xl hover:cursor-pointer" onClick={handleLogout} />
            </div>
            <FormProvider>
                {showPopup && <ClubForm onClose={handleClosePopup} />}
            </FormProvider>
        </div>
    )
}

export default NavBar