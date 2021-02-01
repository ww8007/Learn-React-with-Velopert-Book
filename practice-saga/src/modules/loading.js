import { createAction, handleActions } from 'redux-actions';

// 액션 생성함수 작성
const START_LOADING = 'loading/LOADING_SCUCCESS';
const FINISH_LOADING = 'loading/LOADING_FAILURE';

// 요청을 위해서 액션 타입을 payload로 설정

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);
export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
