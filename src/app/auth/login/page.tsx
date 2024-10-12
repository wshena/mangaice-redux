'use client'
import PageWrapper from '@/app/components/PageWrapper'
import { loginThunk } from '@/app/redux/slice/authSlice';
import { RootState } from '@/app/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/redux/store';

const page = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector((state:RootState) => state.theme.theme);

  const router = useRouter();

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk kontrol visibilitas password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the loginThunk action
    const result = await dispatch(loginThunk({ username: usernameOrEmail, password }));

    // Handle login success or failure
    if (result.meta.requestStatus === 'fulfilled') {
      router.push('/');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  // Fungsi untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <PageWrapper>
      <section className='w-full pt-[81px] lg:py-[40px] h-[100vh] container flex items-center justify-center bg-primary'>
        <form action={''} onSubmit={handleSubmit} className="bg-secondary text-color p-[.7rem] md:p-[1.2rem] w-[90%] md:w-[500px] h-full md:h-[440px] rounded-[10px] flex flex-col justify-between">
          <h1 className='text-center font-bold text-[1rem] md:text-[1.5rem] capitalize'>login your account</h1>
          <div className="flex flex-col gap-[15px]">
            {/* username*/}
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="usernameOrEmail" className='capitalize text-[.8rem] md:text-[1rem]'>username</label>
              <input type="text" name="usernameOrEmail" id="usernameOrEmail" autoComplete='off' className='rounded-[5px] accent-color focus:outline-none focus:rounded-[5px] focus:outline-lightOrange p-[.2rem] rounded-5px] transition-all duration-300 ease-in-out' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
            </div>

            {/* password */}
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="password" className='capitalize text-[.8rem] md:text-[1rem]'>password</label>
              <div className="flex items-center justify-between">
                <input type={passwordVisible ? 'text' : 'password'} name="password" id="password" autoComplete='off' className='w-full rounded-[5px] accent-color focus:outline-none focus:rounded-[5px] focus:outline-lightOrange p-[.2rem] rounded-5px] transition-all duration-300 ease-in-out' value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Tombol untuk toggle visibilitas password */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-[.7rem] font-medium text-color"
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          <button type='submit' className={`block ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} capitalize text-center rounded-[5px] py-[.6rem] text-[.8rem] md:text-[1rem]`}>Log in</button>

          <div className=     "w-full flex items-center justify-center">
            <div className="flex items-center gap-[10px]">
              <span>New user?</span>
              <Link href={'/auth/register'} className={`text-[.8rem] md:text-[1rem] ${theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple'}`}>Register</Link>
            </div>
          </div>
          
          {errorMessage && 
            <div className='w-full text-center text-red-500 text-[1rem]'>
              <h1>{errorMessage}</h1>
            </div>
          }
        </form>
      </section>
    </PageWrapper>
  )
}

export default page