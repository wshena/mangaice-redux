'use client'
import MediumCard from '@/app/components/cards/MediumCard'
import PageWrapper from '@/app/components/PageWrapper'
import { clearLibrary, setLibrary } from '@/app/redux/slice/librarySlice'
import { RootState } from '@/app/redux/store'
import { ArrowLeftIcon, TrashIcon } from '@/app/utils/Icon'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
  const dispatch = useDispatch();

  const library = useSelector((state:RootState) => state.library.library);
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

  const handleClearAll = () => {
    if (confirm('Remove manga from library?') === true) {
      dispatch(clearLibrary());
    } else {
      return 
    }
  }

  // Sync localStorage library with Redux state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.library) {
        dispatch(setLibrary(parsedUser.library));
      }
    }
  }, [dispatch]);

  return (
    <PageWrapper>
      <section className='container pt-[81px] text-color'>
        <div className="component-container">          
          {isAuthenticated ? (
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center gap-[10px]">
                <Link href={'/'} ><ArrowLeftIcon size={25} className='text-color' /></Link>
                <h1 className='text-font capitalize text-[1.3rem] md:text-[2rem]'>your manga collection</h1>
              </div>

              {library && library?.length > 0 ? (
                <div className="flex flex-col gap-[10px]">
                  <div className="w-full flex items-end justify-end">
                    <button onClick={handleClearAll} className='flex items-center gap-[8px] p-[.7rem] rounded-[5px] text-color capitalize bg-lightGray hover:scale-105'>
                      <TrashIcon size={20} className='text-color' />
                      <span>Clear all</span>
                    </button>
                  </div>
                  <ul className='w-fit flex flex-wrap items-center justify-evenly gap-[10px]'>
                    {library?.map((manga:any) => {
                      return (
                        <li key={manga?.id}>
                          <MediumCard manga={manga} />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : (
                <h1 className="text-center text-[1.5rem]">Your library is empty</h1>
              )}
            </div>
          ) : (
            <div className="flex items-center flex-col gap-[15px]">
              <h1 className='text-[1.4rem]'>You need to sign in to use this page</h1>
              <div className="flex items-center gap-[20px]">
                <Link href='/auth/register' className='p-[.7rem] rounded-[5px] bg-lightOrange'>Register</Link>
                <Link href='/auth/login' className='p-[.7rem] rounded-[5px] bg-lighterGray'>Login</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default page