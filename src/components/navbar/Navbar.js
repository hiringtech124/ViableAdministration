import React, { useState, useEffect } from 'react';
import { LuHome } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);
  const [isHoveringYes, setIsHoveringYes] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const status = useSelector((state) => state.auth.user.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowPopup(true);
    setActiveLink('/logout');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setActiveLink(location.pathname);
  };

  const handleYesHover = () => {
    setIsHoveringYes(true);
  };

  const handleYesLeave = () => {
    setIsHoveringYes(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const linkTo = status === 'Owner' ? '/owner' : '/employee';

  return (
    <>
      <div className='w-full h-full shadow-md py-[15px]'>
        <ul className='flex items-center w-full justify-end gap-20 max-xl:gap-10 max-lg:gap-5 pr-[30px]'>
          <Link to={linkTo}>
            <li
              className={`flex flex-col items-center text-[20px] max-xl:text-[18px] max-lg:text-[16px] font-semibold ${
                activeLink === '/owner' ? 'text-[#F59245]' : activeLink === '/employee' ? 'text-[#F59245]' : 'text-[#C2C3CC]' 
              }`}
              onClick={() => setActiveLink(`{/${status}}`)}
            >
              <LuHome className='text-[24px] max-xl:text-[20px] max-lg:text-[18px]' />
              Home
            </li>
          </Link>
          <Link to="/task-history">
            <li
              className={`flex flex-col items-center text-[20px] max-xl:text-[18px] max-lg:text-[16px] font-semibold ${
                activeLink === '/task-history' ? 'text-[#F59245]' : 'text-[#C2C3CC]'
              }`}
              onClick={() => setActiveLink('/task-history')}
            >
              <FaRegClock className='text-[24px] max-xl:text-[20px] max-lg:text-[18px]' />
              History
            </li>
          </Link>
          <Link to="/profile">
            <li
              className={`flex flex-col items-center text-[20px] max-xl:text-[18px] max-lg:text-[16px] font-semibold ${
                activeLink === '/profile' ? 'text-[#F59245]' : 'text-[#C2C3CC]'
              }`}
              onClick={() => setActiveLink('/')}
            >
              <IoPersonOutline className='text-[24px] max-xl:text-[20px] max-lg:text-[18px]' />
              Profile
            </li>
          </Link>
          <button
            onClick={handleLogoutClick}
            className={`flex flex-col items-center text-[20px] max-xl:text-[18px] max-lg:text-[16px] font-semibold ${
              activeLink === '/logout' ? 'text-[#F59245]' : 'text-[#C2C3CC]'
            }`}
          >
            <IoLogOutOutline className='text-[24px] max-xl:text-[20px] max-lg:text-[18px]' />
            Log Out
          </button>
          {status === 'Owner' && (
            <button className='flex items-center gap-3 max-lg:gap-1 bg-custom-gradient rounded-[50px] py-[10px] max-lg:py-[5px] px-[20px] max-lg:px-[10px] text-[18px] max-xl:text-[16px] text-[#fff] font-semibold '>
              <IoIosAdd className='text-[30px]' />
              Add a Task
            </button>
          )}
        </ul>
        {showPopup && (
          <div className="popup z-20 h-full">
            <div className="popup-inner flex flex-col items-center justify-center gap-5 font-semibold h-[150px] w-[300px]">
              <h2>Are you sure you want to logout?</h2>
              <div className='flex gap-5'>
                <button
                  onClick={handleLogout}
                  onMouseEnter={handleYesHover}
                  onMouseLeave={handleYesLeave}
                  className='hover:text-[#F59245]'
                >
                  Yes
                </button>
                <button
                  onClick={handleClosePopup}
                  className={isHoveringYes ? 'text-black' : 'text-[#F59245]'}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
