// export const GET_REQUEST_SUCCESS = 'GET_REQUEST_SUCCESS';
export const GET_REQUEST_ERROR = 'GET_REQUEST_ERROR';
export const GET_API_REQUEST = 'GET_API_REQUEST';
export const GET_REQUEST_SUCCESS = 'GET_REQUEST_SUCCESS';

export function loadApiRequest() {
  return {
    type: GET_API_REQUEST,
  };
}

export function loadRequestSuccess(successTextApi, successStatus, successTextToDisplay) {
  return {
    type: GET_REQUEST_SUCCESS,
    data: null,
    successTextApi,
    successStatus,
    successTextToDisplay,
  };
}

export function loadTRequestError(error, errorStatus) {
  return {
    type: GET_REQUEST_ERROR,
    data: null,
    error: error.message,
    errorStatus,
  };
}
