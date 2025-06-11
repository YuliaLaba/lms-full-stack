import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { UserButton, useUser } from '@clerk/clerk-react';

const Navbar = ({ bgColor }) => {

  const { isEducator } = useContext(AppContext)
  const { user } = useUser()

  return isEducator && user && (
    <div className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3 ${bgColor}`}>
     
      <Link to="/">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
    <img src={assets.logo} alt="Logo" className="w-10 lg:w-15" />
    <h2 className="text-2xl font-semibold">easyStudy</h2>
  </div>
       {/*<img src={assets.logo} alt="Logo" className="w-28 lg:w-32" />*/}
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi! {user.fullName}</p>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;