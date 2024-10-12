'use client';
import React from 'react'
import ProfileMenu from './navbar/ProfileMenu';
import ProfileMenuMobile from './navbar/ProfileMenuMobile';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  children: React.ReactNode
}

const PageWrapper = ({children}:Props) => {
  const sidebarClick = useSelector((state: RootState) => state.utility.sidebarClick);
  const profileClick = useSelector((state: RootState) => state.utility.profileClick);

  return (
      <main className="w-full h-full">
        {profileClick && (
          <>
            <ProfileMenu />
            <ProfileMenuMobile />
          </>
        )}
        
        <div className={`w-full h-full ${sidebarClick ? 'xl:pl-[270px] 2xl:p-0' : 'p-0'} transition-all duration-300 ease-in-out`}>
          {children}
        </div>
      </main>
  );
}

export default PageWrapper