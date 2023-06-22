/* eslint-disable max-len */
import axios from 'axios';
import { GET_ALL_PROPOSALS,
  ADD_PROPOSAL_TO_COLLECTION,
  DELETE_PROPOSAL,
  UPDATE_PROPOSAL,
  GET_ALL_ACHIEVEMENTS,
  ADD_ACHIEVEMENT,
  DELETE_ACHIEVEMENT,
  UPDATE_ACHIEVEMENT,
  DELETE_TAG,
  UPDATE_TAG,
  saveAllProposals,
  sendAllAchievements } from '@/actions/admin';
import { loadApiRequest, loadTRequestError, loadRequestSuccess } from '@/actions/apiMessages';
import { askRefresh } from '@/actions/ui';
import { ADD_TAG } from '../actions/admin';

const adminMiddleware = (store) => (next) => (action) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  switch (action.type) {
    case GET_ALL_PROPOSALS:
      store.dispatch(loadApiRequest());
      axios
        .get(`${apiUrl}/card/proposal`, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(saveAllProposals(res.data));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally();
      break;
    case ADD_PROPOSAL_TO_COLLECTION: {
      const { cardId } = action;
      store.dispatch(loadApiRequest());
      axios
        .patch(`${apiUrl}/card/proposal/${cardId}`, {}, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'La carte a bien été ajouté à la collection globale 🥳 !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case DELETE_PROPOSAL: {
      const { cardId } = action;
      store.dispatch(loadApiRequest());
      axios
        .delete(`${apiUrl}/card/${cardId}`, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'La carte a bien été supprimé des propositions'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case UPDATE_PROPOSAL: {
      const { formValues, cardId } = action;
      store.dispatch(loadApiRequest());
      axios
        .patch(`${apiUrl}/card/${cardId}`, formValues, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'La carte a bien été modifié ♻️ !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case GET_ALL_ACHIEVEMENTS:
      store.dispatch(loadApiRequest());
      axios
        .get(`${apiUrl}/achievement/proposal`, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(sendAllAchievements(res.data));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally();
      break;
    case ADD_ACHIEVEMENT: {
      const { achievementId } = action;
      store.dispatch(loadApiRequest());
      axios
        .patch(`${apiUrl}/achievement/proposal/${achievementId}`, {}, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'L\'accomplissement a bien été ajouté dans la base de données 🥳 !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case DELETE_ACHIEVEMENT: {
      const { achievementId } = action;
      store.dispatch(loadApiRequest());
      axios
        .delete(`${apiUrl}/achievement/${achievementId}`, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'L\'accomplissement a bien été supprimé dans la base de données !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case UPDATE_ACHIEVEMENT: {
      const { formValues, achievementId } = action;
      store.dispatch(loadApiRequest());
      axios
        .patch(`${apiUrl}/achievement/${achievementId}`, formValues, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'L\'accomplissement a bien été modifié ♻️ !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case UPDATE_TAG: {
      const { formValues, tagId } = action;
      store.dispatch(loadApiRequest());
      axios
        .patch(`${apiUrl}/tag/${tagId}`, formValues, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'Le tag a bien été modifié ♻️ !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case DELETE_TAG: {
      const { tagId } = action;
      store.dispatch(loadApiRequest());
      axios
        .delete(`${apiUrl}/tag/${tagId}`, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'Le tag a bien été supprimé dans la base de données !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    case ADD_TAG: {
      const { formValues } = action;
      store.dispatch(loadApiRequest());
      axios
        .post(`${apiUrl}/tag`, formValues, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(loadRequestSuccess(res.statusText, res.status, 'Le tag a bien été créé 🎉 !!!'));
        })
        .catch((err) => store.dispatch(loadTRequestError(err.response.data, err.response.status)))
        .finally(() => {
          store.dispatch(askRefresh());
        }); }
      break;
    default:
  }

  next(action);
};

export default adminMiddleware;
