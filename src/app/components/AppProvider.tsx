'use client'
import React, { useEffect } from 'react'
import ReduxProvider from '../redux/reduxProvider/ReduxProvider'
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../redux/slice/authSlice';

interface Props {
  children: React.ReactNode
}

const Provider = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());  // Dispatch after the Redux Provider is active
  }, [dispatch]);

  return <>{children}</>;
};

const AppProvider = ({children}:Props) => {
  return (
    <ReduxProvider>
      <Provider>
        {children}
      </Provider>
    </ReduxProvider>
  )
}

export default AppProvider