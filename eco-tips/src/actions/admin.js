export const GET_ALL_PROPOSALS = 'GET_ALL_PROPOSALS';
export const SAVE_ALL_PROPOSALS = 'SAVE_ALL_PROPOSALS';
export const ADD_PROPOSAL_TO_COLLECTION = 'ADD_PROPOSAL_TO_COLLECTION';
export const DELETE_PROPOSAL = 'DELETE_PROPOSAL';
export const UPDATE_PROPOSAL = 'UPDATE_PROPOSAL';
export const GET_ALL_ACHIEVEMENTS = 'GET_ALL_ACHIEVEMENTS';
export const SEND_ALL_ACHIEVEMENTS = 'SEND_ALL_ACHIEVEMENTS';
export const ADD_ACHIEVEMENT = 'ADD_ACHIEVEMENT';
export const DELETE_ACHIEVEMENT = 'DELETE_ACHIEVEMENT';
export const UPDATE_ACHIEVEMENT = 'UPDATE_ACHIEVEMENT';
export const DELETE_TAG = 'DELETE_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const ADD_TAG = 'ADD_TAG';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SAVE_ALL_USERS = 'SAVE_ALL_USERS';

export const getAllProposals = () => ({
  type: GET_ALL_PROPOSALS,
});

export const saveAllProposals = (proposals) => ({
  type: SAVE_ALL_PROPOSALS,
  proposals,
});

export const addProposalToCollection = (cardId) => ({
  type: ADD_PROPOSAL_TO_COLLECTION,
  cardId,
});

export const deleteProposal = (cardId) => ({
  type: DELETE_PROPOSAL,
  cardId,
});

export const updateProposal = (formValues, cardId) => ({
  type: UPDATE_PROPOSAL,
  formValues,
  cardId,
});

export const getAllAchievements = () => ({
  type: GET_ALL_ACHIEVEMENTS,
});

export const sendAllAchievements = (achievements) => ({
  type: SEND_ALL_ACHIEVEMENTS,
  achievements,
});

export const deleteAchievement = (achievementId) => ({
  type: DELETE_ACHIEVEMENT,
  achievementId,
});

export const addAchievement = (achievementId) => ({
  type: ADD_ACHIEVEMENT,
  achievementId,
});

export const updateAchievement = (formValues, achievementId) => ({
  type: UPDATE_ACHIEVEMENT,
  formValues,
  achievementId,
});

export const updateTag = (formValues, tagId) => ({
  type: UPDATE_TAG,
  formValues,
  tagId,
});

export const deleteTag = (tagId) => ({
  type: DELETE_TAG,
  tagId,
});

export const addTag = (formValues) => ({
  type: ADD_TAG,
  formValues,
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});

export const saveAllUsers = (users) => ({
  type: SAVE_ALL_USERS,
  users,
});