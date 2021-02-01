import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import sample, { sampleSaga } from './sample';
import loading from './loading';
import { all } from 'redux-saga/effects';
const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  //all 여러 사가를 합쳐주는 역할
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
