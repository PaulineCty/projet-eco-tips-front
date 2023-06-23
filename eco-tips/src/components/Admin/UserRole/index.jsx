/* eslint-disable max-len */
// Import Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// Action creator
import { getAllUsers } from '../../../actions/admin';
import { askRefresh } from '@/actions/ui';
// User components
import User from './User';
// Tools components
import SuccessNotifications from '@/components/SuccessNotifications';
import ErrorNotifications from '@/components/ErrorNotifications';
import Spinner from '@/components/Spinner';



function UserRole() {
  // Store
  const { refresh } = useSelector((state) => state.ui);
  const { users } = useSelector((state) => state.admin);
  // Local State
  const [loading, setLoading] = useState(true);
  // Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  // Fetch all collection loading component
  useEffect(() => {
    dispatch(getAllUsers());
    setLoading(false);
  }, []);
  // refresh component after change datas
  useEffect(() => {
    if (refresh) {
      dispatch(getAllUsers());
      dispatch(askRefresh());
      window.scroll(0, 0);
    }
  }, [refresh, location]);

  return (
    <>
      <div className="flex font-bold mb-8 text-center justify-center items-center  ">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
        <h1 className="text-2xl font-bold m-2 text-center">Gestion des utilisateurs</h1>
      </div>
      <div className="mx-auto lg:w-[80%] sm:w-[90%] bg-white p-8 rounded-md shadow-md">
        <SuccessNotifications />
        <ErrorNotifications />
        {
          loading ? 
            (
              <Spinner />
            )  
          : 
            (
              users.map(user => <User {...user} key={user.id}/>)
            )
        }
        </div>
    </>
  );
}

export default UserRole;
