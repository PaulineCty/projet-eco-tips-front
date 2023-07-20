/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { askRefresh } from '@/actions/ui';
// Card component
import Card from '@/components/Card';
// Tools component
import Spinner from '@/components/Spinner';
import ButtonsControls from '@/components/Admin/ProposalValidation/ButtonsControls';
import SuccessNotifications from '@/components/SuccessNotifications';
// Action creator
import { getAllProposals } from '@/actions/admin';

function ProposalValidation() {
  const dispatch = useDispatch();
  const { proposals } = useSelector((state) => state.admin);
  const { refresh } = useSelector((state) => state.ui);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllProposals());
    setLoading(false);
  }, []);
  useEffect(() => {
    if (refresh) {
      dispatch(getAllProposals());
      dispatch(askRefresh());
      window.scroll(0, 0);
    }
  }, [refresh, location]);

  return (
    <>
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Espace administrateur</h1>
      </div>
      <div className="mx-auto sm:w-[90%] lg:w-[80%] bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg my-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
          <span className="inset-text-shadow">Gérer les propositions des nouvelles cartes</span>
        </h2>
        <SuccessNotifications />
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-3 m-6">
            {proposals.length > 0 ? (proposals.map((card) => (
              <div key={card.id} className="lg:w-1/5 md:w-1/3 w-full">
                <Card {...card}>
                  <ButtonsControls card={card} />
                </Card>
              </div>
            ))) : (<p className="text-md">Aucune carte n'est à valider pour l'instant...</p>)}

          </div>
        )}
      </div>
    </>
  );
}

export default ProposalValidation;
