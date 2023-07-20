export const filterChecked = (cards) => {
  const cardFiltered = cards.filter((card) => card.state === true);
  return cardFiltered;
};

export const filterToValidate = (cards) => {
  const currentDate = new Date();
  const cardFiltered = cards.filter((card) => {
    const expirationDate = new Date(card.expiration_date);
    return expirationDate < currentDate && card.state === false;
  });
  return cardFiltered;
};

// export const cardsAccordingToExpiration = (cards, ascending) => {
//   const currentDate = new Date();

//   const filteredCollection = cards.filter((card) => {
//     const expirationDate = new Date(card.expiration_date);
//     return expirationDate > currentDate && card.state === false;
//   });

//   const sortedCollection = filteredCollection.sort((a, b) => {
//     const expirationDateA = new Date(a.expiration_date);
//     const expirationDateB = new Date(b.expiration_date);
//     return ascending ? expirationDateA - expirationDateB : expirationDateB - expirationDateA;
//   });

//   return sortedCollection;
// };


export const cardsAccordingToExpiration = (cards, ascending) => {

  const filteredCollection = cards.filter((card) => new Date(card.expiration_date) > new Date() && card.state === false );

  const sortedCollection = filteredCollection.sort((a, b) => ascending ? new Date(a.expiration_date) - new Date(b.expiration_date) : new Date(b.expiration_date) - new Date(a.expiration_date));

  return sortedCollection;
};

export const filteredToProposal = (cards, state) => cards.filter((card) => card.proposal === state);
