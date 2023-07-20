/* eslint-disable max-len */
// import Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// Main components
import FormUpdateTags from '@/components/Admin/Tags/FormUpdateTags';
import FormAddTag from '@/components/Admin/Tags/FormAddTag';
// Tools component
import Spinner from '@/components/Spinner';
import SuccessNotifications from '@/components/SuccessNotifications';
import ErrorNotifications from '@/components/ErrorNotifications';
// Action creator
import { getAllTags } from '@/actions/collection';
import { askRefresh } from '@/actions/ui';

function Tags() {
  // Store
  const { tags } = useSelector((state) => state.collection);
  const { refresh } = useSelector((state) => state.ui);
  // Local State
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState('');
  const [updateTag, setUpdateTag] = useState('');
  // Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  // Fetch AllTags to component loading
  useEffect(() => {
    dispatch(getAllTags());
    setLoading(false);
  }, []);

  // compare tags selected to allAlltags for loading local state
  const handleTags = (event) => {
    setSelectedTags(event.target.value);
    const findTagById = (id) => tags.find((tag) => tag.id === Number(id));
    const foundTag = findTagById(event.target.value);
    setUpdateTag(foundTag);
  };
  // refresh component after change datas
  useEffect(() => {
    if (refresh) {
      dispatch(getAllTags());
      dispatch(askRefresh());
      window.scroll(0, 0);
    }
  }, [refresh, location]);
  return (
    <>
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Espace administrateur</h1>
      </div>
      <div className="flex flex-col gap-2 mx-auto lg:w-1/3 sm:1/2 bg-white p-8 rounded-md shadow-md">
        <SuccessNotifications />
        <ErrorNotifications />
        <h2 className="text-lg my-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
          <span className="inset-text-shadow">Gérer les catégories</span>
        </h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-900" />
            <select
              id="filter"
              className="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              onChange={handleTags}
              value={selectedTags}
            >
              <option value="" disabled>
                Choississez la catégorie à modifier
              </option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            {updateTag && (
              <FormUpdateTags {...updateTag} />
            )}
          </div>
        )}
        <h2 className="text-lg my-4 p-2 shadow-md text-white font-extrabold bg-gradient-to-r to-green-600 from-green-700 border-b-4 border-green-600 rounded-t-lg">
          <span className="inset-text-shadow">Ajouter une catégorie</span>
        </h2>
        <FormAddTag />
      </div>
    </>
  );
}

export default Tags;
