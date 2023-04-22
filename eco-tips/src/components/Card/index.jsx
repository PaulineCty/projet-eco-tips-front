/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

// react and redux hooks
import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
// components
import CardTitle from './CardTitle';
import CardTags from './CardTags';
import CardRating from './CardRating';
import CardDescription from './CardDescription';
import CardAuthor from './CardAuthor';
import CardImg from './CardImg';
import CheckIcon from './CheckIcon';

function Card({ image,
  title,
  tags,
  description,
  author,
  environmental_rating,
  economic_rating,
  state,
  children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const cardRef = useRef();
  const styleCardExpanded = isExpanded
    ? 'z-40 fixed top-1/2 left-1/2 w-full animate-expand cursor-auto md:w-1/3'
    : 'md:w-full cursor-pointer sm:w-full';
  const styleValidated = state && 'border-4 border-green-600';
  const handleClick = () => {
    setIsExpanded(true);
    setShowBackground(true);
  };
  const handleOutsideClick = (event) => {
    // Check if the clicked element is not a descendant of cardRef and isExpanded=true
    if (!cardRef.current.contains(event.target) && isExpanded) {
      setIsExpanded(false);
      setShowBackground(false);
    }
  };

  useEffect(() => {
    // listen click on window when isExpanded=true
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isExpanded]);
  return (
    <>
      {showBackground && (
        <button
          className="z-10 fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md"
          type="button"
          aria-label="Outside click handler"
          onClick={handleOutsideClick}
        />
      )}
      <div
        className={`${styleCardExpanded}`}
        aria-label="Card container"
        ref={cardRef}
      >
        <div
          className={`bg-white relative rounded shadow-md hover:shadow-lg ${styleValidated}`}
          onClick={handleClick}
        >
          <CardImg path={image} title={title} />
          <div className="p-4">
            <CardTitle title={title} isExpanded={isExpanded} />
            <CardTags tags={tags} isExpanded={isExpanded} />
            <CardRating environmental={environmental_rating} economic={economic_rating} />
            <CardDescription description={description} isExpanded={isExpanded} />
            <CardAuthor author={author} />
            {state && <CheckIcon />}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  environmental_rating: PropTypes.number.isRequired,
  economic_rating: PropTypes.number.isRequired,
  state: PropTypes.bool,
  children: PropTypes.node,
};
Card.defaultProps = {
  children: null,
  state: false,
};

export default Card;
