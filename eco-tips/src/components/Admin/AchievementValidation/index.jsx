/* eslint-disable max-len */
// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// Achievement component
import Achievement from '@/components/Achievement';
// Tools component
import Spinner from '@/components/Spinner';
import ButtonsControls from '@/components/Admin/AchievementValidation/ButtonsControls';
import SuccessNotifications from '@/components/SuccessNotifications';
// Action creator
import { getAllAchievements } from '@/actions/admin';
import { askRefresh } from '@/actions/ui';

function AchievementValidation() {
  // Store
  const { achievements } = useSelector((state) => state.admin);
  const { refresh } = useSelector((state) => state.ui);
  // Local State
  const [loading, setLoading] = useState(true);
  // Use Hooks
  const location = useLocation();
  const dispatch = useDispatch();
  // Fetch all Achievements on page loading
  useEffect(() => {
    dispatch(getAllAchievements());
    setLoading(false);
  }, []);

  // refresh Achievementto the change achievements
  useEffect(() => {
    if (refresh) {
      dispatch(getAllAchievements());
      dispatch(askRefresh());
      window.scroll(0, 0);
    }
  }, [refresh, location]);

  return (
    <>
      <div className="flex flex-col text-center my-3">
        <h1 className="text-2xl font-bold mb-6 text-center">Espace administrateur</h1>
      </div>
      <div className="bg-white p-8 rounded-md shadow-md mx-auto lg:w-[80%] sm:w-[90%]">
        <SuccessNotifications />
        <div className="shadow-md">
          <h2 className="text-lg mb-6 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
            <span className="inset-text-shadow">Gérer les accomplissements des utilisateurs avant publication</span>
          </h2>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-3 w-full">
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <div key={achievement.id} className="lg:w-[40%] sm:w-full">
                  <Achievement {...achievement}>
                    <ButtonsControls achievement={achievement} />
                  </Achievement>
                </div>
              ))
            ) : (
              <p className="text-md">Aucun accomplissement n'est à valider pour l'instant...</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AchievementValidation;
