import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {

  const location = useLocation();

  const isCoursesListPage = location.pathname.includes('/course-list');

  const { backendUrl, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext)

  const { openSignIn } = useClerk()
  const { user } = useUser()

  const becomeEducator = async () => {

    try {

      if (isEducator) {
        navigate('/educator')
        return;
      }

      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        setIsEducator(true)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={`flex items-center justify-between px-4 sm:px-5 md:px-10 lg:px-20 border-b border-gray-500 py-4 ${isCoursesListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
  {/* Logo + Title */}
  <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
    <img src={assets.logo} alt="Logo" className="w-10 lg:w-15" />
    <h2 className="text-2xl font-semibold">easyStudy</h2>
  </div>

  {/* Navigation / Buttons */}
  <div className="md:flex hidden items-center gap-5 text-gray-500">
    <div className="flex items-center gap-5">
      {user && (
        <>
          <button onClick={becomeEducator}>
            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
          </button>
          | <Link to='/my-enrollments'>My Enrollments</Link>
        </>
      )}
    </div>
    {user ? (
      <UserButton />
    ) : (
      <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-5 py-2 rounded-full">
        Create Account
      </button>
    )}
  </div>
      {/* For Phone Screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
          | {
            user && <Link to='/my-enrollments' >My Enrollments</Link>
          }
        </div>
        {user
          ? <UserButton />
          : <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>}
      </div>
    </div>
  );
};

export default Navbar;