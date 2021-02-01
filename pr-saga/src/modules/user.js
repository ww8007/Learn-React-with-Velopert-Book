import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
import { takeEvery, takeLatest } from 'redux-saga/effects';

const GET_POST = 'user/GET_POST';
const GET_POST_SUCCESS = 'user/GET_POST_SUCCESS';

const GET_USERS = 'user/GET_USERS';
const GET_USERS_SUCCESS = 'user/GET_USERS_SUCCESS';

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS, (id) => id);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* userSaga() {
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GET_USERS, getUsersSaga);
}

const initialState = {
  post: null,
  users: null,
};

const user = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: action.payload,
    }),
  },
  initialState
);

export default user;
