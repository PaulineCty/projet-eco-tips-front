/* eslint-disable max-len */
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <>
      <div className="flex font-bold pb-5 text-center justify-center items-center  ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <h1 className="text-2xl font-bold m-2 text-center">Espace administrateur</h1>
      </div>
      <div className="grid grid-cols-1 place-self-center mx-auto p-5 max-w-lg">
        {/* <div className="m-6 place-self-center  ">
          // feature in development
          <Link to="/#" className="py-2 px-2 font-bold blue-button blue-button:hover button-active active:animate-buttonAnimation  ">
            Gérer les cartes
          </Link>
        </div> */}
        <div className=" m-6 place-self-center ">
          <Link to="/admin/tags" className="py-2 px-2 font-bold blue-button blue-button:hover button-active active:animate-buttonAnimation ">
            Gérer les catégories
          </Link>

        </div>
        <div className=" m-6 place-self-center   ">
          <Link to="/admin/proposals" className="py-2 px-2 font-bold blue-button blue-button:hover button-active active:animate-buttonAnimation  ">
            Gérer les propositions de nouvelles cartes
          </Link>

        </div>
        <div className=" m-6 place-self-center   ">
          <Link to="/admin/achievements" className="py-2 px-2 font-bold blue-button blue-button:hover button-active active:animate-buttonAnimation  ">
            Gérer les accomplissements des utilisateurs
          </Link>

        </div>
        <div className=" m-6 place-self-center   ">
          <Link to="/admin/user" className="py-2 px-2 font-bold blue-button blue-button:hover button-active active:animate-buttonAnimation  ">
            Gérer les rôles des utilisateurs
          </Link>

        </div>
      </div>
    </>
  );
}

export default Admin;
