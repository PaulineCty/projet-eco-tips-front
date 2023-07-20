/* eslint-disable react/no-array-index-key */
// Import Hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import axios to fetch rankings datas
import axios from 'axios';
// Tools components
import Spinner from '@/components/Spinner';

function Rankings() {
  // Store
  const { token } = useSelector((state) => (state.user));
  // Local State
  const [rankingScore, setRankingScore] = useState('');
  const [rankingCreation, setRankingCreation] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  // handle emoji rankings
  const getMedalEmoji = (index) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return index + 1;
    }
  };
  // fetch rankings on components loading
  useEffect(() => {
    axios
      .get(`${apiUrl}/user/score`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRankingScore(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/user/creation`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRankingCreation(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);
  return (
    <div className="flex-col inline-flex">
      <h1 className="text-lg mb-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-800 border-b-4 border-green-600 rounded-t-lg">
        <span className="inset-text-shadow">Classements</span>
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {rankingScore.length > 0 ? (
          <div className="flex flex-col">
            <h2 className="inline-flex mb-1">
              <span className="text-sm italic">Classement par Score</span>
            </h2>
            <div className="relative overflow-x-auto rounded-lg shadow-md">
              <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-2 py-3">
                      Rang
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Utilisateur
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankingScore.map((ranking, index) => (
                    <tr className="bg-white border-b" key={`ranking ${index}`}>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                        {getMedalEmoji(index)}
                      </th>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {ranking.user}
                      </th>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                        {ranking.score}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
        {rankingCreation.length > 0 ? (
          <div className="flex flex-col">
            <h2 className="inline-flex mb-1">
              <span className="text-sm italic">Classement par nombre de cartes créées</span>
            </h2>
            <div className="relative overflow-x-auto rounded-lg shadow-md">
              <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-2 py-3">
                      Rang
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Utilisateur
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Nombre de cartes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankingCreation.map((ranking, index) => (
                    <tr className="bg-white border-b" key={`ranking ${ranking}`}>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                        {getMedalEmoji(index)}
                      </th>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {ranking.user}
                      </th>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                        {ranking.cards_created}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Rankings;
