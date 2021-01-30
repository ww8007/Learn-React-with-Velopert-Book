const loggerMiddleware = (store) => (next) => (action) => {
  //미들 웨어 기본 구조
  console.group(action && action.type);
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  next(action); //다음 미들웨어 혹인 리듀서에게 전달
  console.log('다음 상태', store.getState());
  console.groupEnd(); //그룹 끝
};

export default loggerMiddleware;
