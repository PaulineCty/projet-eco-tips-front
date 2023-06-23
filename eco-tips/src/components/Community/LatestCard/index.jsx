import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getLatestCard } from '@/actions/community';

import Spinner from '@/components/Spinner';
import Card from '@/components/Card';

function LatestCard() {
  const latestCard = useSelector((state) => state.community.latestCard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestCard());
  }, []);

  return (
    <div className="flex-col sm:1/2 lg:w-1/4 md:1/4">
      <h1 className="text-lg mb-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-800 border-b-4 border-green-600 rounded-t-lg">
        <span className="inset-text-shadow pl-0.5">Dernière carte ajoutée</span>
      </h1>
      <div>
        <div className="w-full">
          {Object.keys(latestCard).length > 0 ? (
            <Card {...latestCard} />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestCard;
