import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function IconsAdd() {
  return (
    <div className="flex flex-row gap-4 mb-4">
      <div className="flex flex-row gap-1 items-center ">
        <Link to="/me/add-card" className="flex items-center justify-center w-8 h-8 p-2 bg-green-600 text-white shadow rounded-full button-active active:animate-buttonAnimation">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Link>
        <p className="text-sm font-semibold">Obtenir une carte</p>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <Link to="/me/proposal" className="flex items-center justify-center w-8 h-8 p-2 bg-green-600 text-white shadow rounded-full button-active active:animate-buttonAnimation">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Link>
        <p className="text-sm font-semibold">Proposer une carte</p>
      </div>
    </div>
  );
}

export default IconsAdd;
