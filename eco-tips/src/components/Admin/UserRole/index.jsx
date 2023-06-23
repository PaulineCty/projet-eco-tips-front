/* eslint-disable max-len */
// Import Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// Action creator
import { getAllCollection } from '@/actions/collection';
import { askRefresh } from '@/actions/ui';
// Card components
import Card from '@/components/Card';
import IconsAdd from '@/components/Collection/IconsAdd';
import DisplayRemainingTime from '@/components/Collection/RemainingTime';
// Tools components
import SuccessNotifications from '@/components/SuccessNotifications';
import ErrorNotifications from '@/components/ErrorNotifications';
import Spinner from '@/components/Spinner';
// utils fonction to filtered cards and handle option on select input
import { filterChecked, filterToValidate, cardsAccordingToExpiration } from '@/utils/collection';

function UserRole() {
  // Store
  const { collection } = useSelector((state) => state.collection);
  const { refresh } = useSelector((state) => state.ui);
  // Local State
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  // Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  // Filtered cards
  const cardsChecked = filterChecked(collection);
  const cardsToValidate = filterToValidate(collection);
  const cardsNearestToExpiration = cardsAccordingToExpiration(collection, true);
  // const cardsfarthestToExpiration = cardsAccordingToExpiration(collection, false);
  // Fetch all collection lodaing component
  useEffect(() => {
    dispatch(getAllCollection());
    setLoading(false);
  }, []);
  // component and component refresh when board state changes
  useEffect(() => {
    if (refresh) {
      dispatch(getAllCollection());
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
        {loading ? (
          <Spinner />
        ) : (<span> Yiha </span>)
        }
        </div>
    </>
  );
}

export default UserRole;
