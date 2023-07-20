/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// card component
import Card from '@/components/Card';
import Spinner from '@/components/Spinner';
// Tools components
import SuccessNotifications from '@/components/SuccessNotifications';
import ErrorNotifications from '@/components/ErrorNotifications';
// utils fonction
import { filteredToProposal } from '@/utils/collection';

function MyCreations() {
  const { token } = useSelector((state) => state.user);

  const [creation, setCreation] = useState();
  const [cardsInProposals, setCardsInProposals] = useState([]);
  const [cardsNotInProposals, setCardsNotInProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/me/card`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCreation(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  useEffect(() => {
    if (creation) {
      setCardsInProposals(filteredToProposal(creation, true));
      setCardsNotInProposals(filteredToProposal(creation, false));
      setLoading(false);
    }
  }, [creation]);

  return (
    <>
      <div className="flex font-bold mb-8 text-center justify-center items-center  ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
        <h1 className="text-2xl font-bold m-2 text-center">Mes Créations</h1>
      </div>
      <div className="mx-auto lg:w-[80%] sm:w-[90%] bg-white p-8 rounded-md shadow-md">
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
                <option defaultValue value="all">Toutes mes créations</option>
                <option value="beingValidated">Cartes en cours de validation</option>
                <option value="validated">Cartes validées</option>
              </select>
            </div>
            <div className="flex flex-col">
              {(selectedFilter === 'beingValidated' || selectedFilter === 'all') && (
              <>
                <h2 className="text-lg mb-2 mt-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
                  <span className="inset-text-shadow pl-0.5">Cartes en cours de validation</span>
                </h2>
                <div className="flex flex-wrap gap-3 my-2">
                  {cardsInProposals.length > 0 ? (cardsInProposals.map((card) => (
                    <div key={card.id} className="lg:w-1/5 md:w-1/3 sm:w-full">
                      <Card {...card} />
                    </div>
                  ))) : (<p> Aucune carte dans cette catégorie ...  </p>)}
                </div>
              </>
              )}
              {(selectedFilter === 'validated' || selectedFilter === 'all') && (
              <>
                <h2 className="text-lg mb-2 mt-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
                  <span className="inset-text-shadow pl-0.5">Cartes validées</span>
                </h2>
                <div className="flex flex-wrap gap-3 my-2">
                  {cardsNotInProposals.length > 0 ? (cardsNotInProposals.map((card) => (
                    <div key={card.id} className="lg:w-1/5 md:w-1/3 sm:w-full">
                      <Card {...card} />
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

export default MyCreations;
