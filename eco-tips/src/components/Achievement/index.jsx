import PropTypes from 'prop-types';
import background from '@/assets/images/background.png';

function Achievement({ title, description, image, author, children }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}${image}`;
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col gap-2 border">
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundClip: 'padding-box',
            opacity: '0.5',
          }}
          className="absolute w-full h-full"
        />
        <h2 className="flex items-center bg-gradient-to-r to-green-600 from-green-800 rounded-t-lg shadow-md p-1 z-10">
          <span className="text-xl inset-text-shadow m-2">🏆</span>
          <span className="inset-text-shadow text-sm text-white">{`${title}`}</span>
        </h2>
        <div className="flex gap-2 z-10 relative p-2">
          <img
            className="w-1/3 h-32 object-cover bg-white rounded-lg shadow-md"
            src={url}
            alt={title}
          />
          <div className="p-2 w-2/3 flex flex-col text-sm bg-white rounded-lg shadow-md opacity-90">
            <div className="flex gap-1">
              <span>📝</span>
              <h3 className="mb-2 text-md font-bold underline decoration-2 decoration-green-500 text-gray-900">Retour d'expérience :</h3>
            </div>
            <div>{`${description}`}</div>
            <div className="mt-auto text-gray-500 text-xs">
              Par
              {' '}
              {author}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
Achievement.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  children: PropTypes.node,
};
Achievement.defaultProps = {
  children: null,
};
export default Achievement;
