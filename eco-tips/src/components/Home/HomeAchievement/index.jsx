/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Achievement from '@/components/Achievement';

function HomeAchievement() {
  const [randomAchievement, setRandomAchievement] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/achievement/random`)
      .then((response) => {
        setRandomAchievement(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  return (
    <div className="bg-white h-min shadow-md lg:w-1/3">
      <h2 className=" text-lg p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-800 border-b-4 border-green-600 rounded-t-lg">
        <span className="inset-text-shadow pl-0.5">Accomplissement d'un utilisateur</span>
      </h2>
      <div className="p-4">
        {Object.keys(randomAchievement).length > 0 ? (
          <Achievement {...randomAchievement} />
        ) : (
          <h3 className="text-cente">
            Aucun accomplissement n'a encore été partagé ou validé
          </h3>
        )}
      </div>
    </div>
  );
}

export default HomeAchievement;
