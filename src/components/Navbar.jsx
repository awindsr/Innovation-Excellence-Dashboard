import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseclient';
import { clearUser } from '../features/user/userSlice';
\

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(clearUser());
    setIsMenuOpen(false);
  };

  return (
    <nav className='bg-white'>
      <div className='w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <h1 className='text-xl sm:text-2xl font-medium text-black'>Innovation Excellence Dashboard</h1>
          <div className='hidden sm:block'>
            <div className='flex items-center gap-2'>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className='bg-black text-white px-3 py-2 rounded-lg text-sm'
                  >
                    Logout
                  </button>
                  <button>
                    //add user profile button here
                  </button>
                  {role === 'student' && (
                    <button 
                      onClick={() => navigate('/add-project')}
                      className='bg-blue-500 text-white px-3 py-2 rounded-lg text-sm'
                    >
                      Add Project
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className='bg-black text-white px-3 py-2 rounded-lg text-sm'
                >
                  Login
                </button>
              )}
            </div>
          </div>
          <div className='sm:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-black'>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className='sm:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left bg-black text-white px-3 py-2 rounded-lg text-base'
                >
                  Logout
                </button>
                {role === 'student' && (
                  <button 
                    onClick={() => {
                      navigate('/add-project');
                      setIsMenuOpen(false);
                    }}
                    className='block w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg text-base'
                  >
                    Add Project
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                className='block w-full text-left bg-black text-white px-3 py-2 rounded-lg text-base'
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}