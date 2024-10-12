'use client'
import { ProfileIcon } from '@/app/utils/Icon';
import Link from 'next/link';
import React, { useState } from 'react';
import ThemeMenu from './ThemeMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { toogleProfileClick } from '@/app/redux/slice/utilitySlice';
import { logout } from '@/app/redux/slice/authSlice';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleProfileButtonClick = () => {
    dispatch(toogleProfileClick());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // handle theme button click
  const [isThemeClick, setIsThemeClick] = useState(false);
  const handleOnThemeClick = () => setIsThemeClick(true);
  const handleOffThemeClick = () => setIsThemeClick(false);

  return (
    <div onClick={handleProfileButtonClick} className="z-40 w-[100vw] h-full hidden md:block fixed top-0 left-0 bg-black bg-opacity-40">
      <div className="w-full flex items-end justify-end pt-[80px] pr-[50px]">
          <div className="w-[300px] bg-primary text-color p-4 rounded-md flex flex-col gap-4">
            {isThemeClick ? (
              <ThemeMenu handleOff={handleOffThemeClick} />
            ) : (
              <>
              {/* Profile Section */}
              <Link href={'/my/profile'} className='bg-secondary-hover p-4 rounded-md flex items-center justify-center flex-col gap-2'>
                <ProfileIcon size={25} className='text-color' />
                {user?.username ? (
                  <span>{user.username}</span>
                ) : (
                  <span>username</span>

                )}
              </Link>
  
              <span className='block w-full h-[1px] bg-white'></span>
  
              {/* Settings and Theme Button */}
              <div className="flex items-center justify-between">
                <Link onClick={handleProfileButtonClick} href={'/settings'} className='hover:underline'>Settings</Link>
                <button onClick={(e: any) => {
                  e.stopPropagation();
                  handleOnThemeClick();
                }} className="hover:underline">Theme</button>
              </div>
  
              <span className='block w-full h-[1px] bg-white'></span>
  
              {/* Sign In and Register Buttons */}
              {isAuthenticated ? (
                <div className="w-full">
                  <button onClick={handleLogout} className={`w-full p-[.7rem] rounded-[5px] text-center ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`}>Log out</button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href={'/auth/login'} className={`p-3 rounded text-color text-center hover:opacity-70 ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`}>Log In</Link>
                  <Link href={'/auth/register'} className='p-3 rounded text-color text-center bg-secondary-hover'>Register</Link>
                </div>
              )}
              </>
            )}
          </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
