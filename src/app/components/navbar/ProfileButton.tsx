'use client'
import { toogleProfileClick } from '@/app/redux/slice/utilitySlice';
import { RootState } from '@/app/redux/store';
import { ProfileIcon } from '@/app/utils/Icon'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const profileClick = useSelector((state: RootState) => state.utility.profileClick);

  const handleOnProfileClick = () => {
    dispatch(toogleProfileClick());
  };

  // Disable scrolling when click is true
  useEffect(() => {
    if (profileClick) {
      document.body.style.overflowY = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflowY = 'auto'; // Re-enable scrolling
    }

    // Cleanup: Ensure scrolling is re-enabled when the component unmounts
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [profileClick]);

  return (
    <button onClick={handleOnProfileClick} className='p-[.5rem] rounded-full profile-color'>
      <ProfileIcon size={25} className='text-color' />
    </button>
  )
}

export default ProfileButton