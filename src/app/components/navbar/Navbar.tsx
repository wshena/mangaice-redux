'use client';
import { MangadexIcon, NavbarMenu, SearchIcon } from '@/app/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ProfileButton from './ProfileButton';
import SearchForm from './SearchForm';
import MobileSearchForm from './MobileSearchForm';
import { RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarClick } from '@/app/redux/slice/utilitySlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const sidebarClick = useSelector((state: RootState) => state.utility.sidebarClick);
  
  // State to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSidebarClick = () => {
    dispatch(toggleSidebarClick());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) { // Adjust this value as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className={`fixed top-0 left-0 w-full z-30 transition-all ease-in-out duration-300 ${isScrolled ? 'bg-primary' : 'bg-transparent'}`}>
      <section className="container">
        <nav
          className={`relative component-container flex items-center ${
            sidebarClick ? 'justify-end' : 'justify-between'
          } text-color`}
        >
          <div className={`${sidebarClick ? 'hidden' : 'flex'} items-center gap-[0px] md:gap-[15px]`}>
            <button onClick={handleSidebarClick}>
              <NavbarMenu size={30} className='text-color' />
            </button>
            <Link href={'/'} className="flex items-center gap-[5px]">
              <Image src={MangadexIcon} width={40} height={35} alt="mangaice" />
              <h1 className={`text-color font-bold text-[1.3rem] hidden md:inline-block`}>Mangaice</h1>
            </Link>
          </div>
          <div className="flex items-center md:gap-[15px]">
            {/* desktop search form */}
            <SearchForm />

            {/* mobile search form */}
            {/* <MobileSearchForm /> */}

            <ProfileButton />
          </div>
        </nav>
      </section>
    </main>
  );
};

export default Navbar;
