import { createAction, handleActions } from 'redux-actions';

// 액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수
// 다른 파일에서 사용이 가능하도록 함
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
//초기 상태 및 리듀서 함수 작성

const initialState = {
  number: 0,
};
// switch case 문을 사용한 액션 정의
// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// }

//handle action을 적용한 액션 정의

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
