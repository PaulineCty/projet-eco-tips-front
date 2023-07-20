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

function Collection() {
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
          <path fillRule="evenodd" d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm1.5 1.5a.75.75 0 00-.75.75V16.5a.75.75 0 001.085.67L12 15.089l4.165 2.083a.75.75 0 001.085-.671V5.25a.75.75 0 00-.75-.75h-9z" clipRule="evenodd" />
        </svg>
        <h1 className="text-2xl font-bold m-2 text-center">Ma collection</h1>
      </div>
      <div className="mx-auto lg:w-[80%] sm:w-[90%] bg-white p-8 rounded-md shadow-md">
        <IconsAdd />
        <SuccessNotifications />
        <ErrorNotifications />
        {loading ? (
          <Spinner />
        ) : (
          <div>

            <div className="my-3">
              <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-900" />
              <select
                id="filter"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option disabled>Tris</option>
                <option defaultValue value="all">Tous les éco-gestes</option>
                <option value="toDo">Par éco-gestes à réaliser</option>
                <option value="toCheck">Par éco-gestes à valider</option>
                <option value="toChecked">Par éco-gestes réalisés</option>
              </select>
            </div>
            <div className="flex flex-col">
              {(selectedFilter === 'toDo' || selectedFilter === 'all') && (
              <>
                <h2 className="text-lg mb-2 mt-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
                  <span className="inset-text-shadow pl-0.5">Eco-gestes à réaliser</span>
                </h2>
                <div className="flex flex-wrap gap-3 my-2">
                  {cardsNearestToExpiration.length > 0 ? (cardsNearestToExpiration.map((card) => (
                    <div key={card.id} className="lg:w-1/5 md:w-1/3 sm:w-full">
                      <Card {...card} delete>
                        {!card.state && (
                        <DisplayRemainingTime {...card} />
                        )}
                      </Card>
                    </div>
                  ))) : (<p> Aucune carte dans cette catégorie ...  </p>)}
                </div>
              </>
              )}
              {(selectedFilter === 'toCheck' || selectedFilter === 'all') && (
              <>
                <h2 className="text-lg mb-2 mt-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
                  <span className="inset-text-shadow pl-0.5">Eco-gestes à valider</span>
                </h2>
                <div className="flex flex-wrap gap-3 my-2">
                  {cardsToValidate.length > 0 ? (cardsToValidate.map((card) => (
                    <div key={card.id} className="lg:w-1/5 md:w-1/3 sm:w-full">
                      <Card {...card} delete>
                        {!card.state && (
                        <DisplayRemainingTime {...card} />
                        )}
                      </Card>
                    </div>
                  ))) : (<p> Aucune carte dans cette catégorie ...  </p>)}
                </div>
              </>
              )}
              {(selectedFilter === 'toChecked' || selectedFilter === 'all') && (
              <>
                <h2 className="text-lg mb-2 mt-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
                  <span className="inset-text-shadow pl-0.5">Eco-gestes réalisés</span>
                </h2>
                <div className="flex flex-wrap gap-3 my-2">
                  {cardsChecked.length > 0 ? (cardsChecked.map((card) => (
                    <div key={card.id} className="lg:w-1/5 md:w-1/3 sm:w-full">
                      <Card {...card} delete>
                        {!card.state && (
                        <DisplayRemainingTime {...card} />
                        )}
                      </Card>
                    </div>
                  ))) : (<p> Aucune carte dans cette catégorie ...  </p>)}
                </div>
              </>
              )}
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default Collection;
