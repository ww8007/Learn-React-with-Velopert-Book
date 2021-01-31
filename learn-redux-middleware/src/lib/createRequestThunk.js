import { startLoading, finishLoading } from '../moudules/loading';

export default function createRequestThunk(type, request) {
  //성공 및 실패 타입
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); // 에러발생
      dispatch(startLoading(type));
      throw e;
    }
  };
}
