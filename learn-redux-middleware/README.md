### 작업 환경

yarn add redux react-redux redux-actions

### 리덕스 작성

1. 모듈로 액션 타입 액션 생성 함수, 리듀서 작성
2. rootReducer 생성 후 reducer 감싸기
3. 프로젠테이셔널 컴포넌트 생성(components)
   props로 필요한 인자들 넘겨받기
4. 컨테이너 작성(containers)
   connect 함수를 사용할 것인가 아니면
   useSelector를 사용해서 상태 조회, useDispatch 사용할 것인지
   useDispatch도 같이 사용해줘야 함, useCallback도 같이 사용 \* 이경우 memo 사용하여 최적화

### 미들웨어

리덕스 미들웨어는 액션을 디스패치 했을 때 리듀서에서 이를 처리하기 앞서 사전에 지정한
작업들을 실행
미들웨어는 액션과 리듀서 사이의 중간자로 볼 수 있음

액션 - 미들웨어 - 리듀서 - 스토어

### 미들웨어 만들기

직접 만들 경우는 많지 않음
하지만 직접 만들어보면서 어떻게 구동이 되는 것인지에 대한 이해를 해둔다면 커스터마이징 가능하기 때문에 해보는것이 좋음

- 화살표 함수를 이용한 작성

```jsx
const loggerMiddleware = (store) => (next) => (action) => {
  //미들 웨어 기본 구조
};
```

```jsx
const log = function log(store) {
  return function (next) {
    return function (action) {};
  };
};
```

동일하다고 볼 수 있다.

- 미들웨어는 결국 함수를 반환하는 함수를 반환하는 함수

함수에서 파라미터로 받아오는

- store -> 리덕스 스토어 인스턴스
- action -> 디스패치된 액션
- next
  파라미터 : 함수형태
  next(action) 호출 시에 다음에 처리할 미들웨어에게 액션을 넘겨주고
  만약 넘겨줄 미들웨어가 없다면 리듀서에게 액션을 넘겨줌

- 미들웨어 내부에서 store.dispatch를 사용하면 첫 번째 미들웨어부터 다시 처리
- 미들웨어에서 next를 사용하지 않으면 액션이 리듀서에게 전달되지 않음

미들웨어는 스토어가 생성되는 과정에서 적용한다.

redux로부터 applyMiddleware를 import 시키고
createStore 에서 applyMiddleware를 사용하여 만든 미들웨어를 적용 시킴

### redux-logger 사용

yarn add redux-logger

### 비동기 작업을 처리하는 미들웨어

1. redux-thunk
   객체가 아닌 함수 형태의 액션을 디스패치 가능하게 해줌
1. redux-saga
   특정 액션이 디스패치 되었을 때 정해진 로직에 따라서 다른 액션을 디스패치시키는 규칙이 적용

### redux-thunk

특정 작업을 나중에 할 수 있도록 함수 형태로 감싼 것을 의미

파라미터에 1을 더하는 함수

```jsx
const addOne = (x) => x + 1;
addOne(1); // 2
```

```jsx
const addOne = (x) => x + 1;
function addOneThunk(x) {
  const thunk = () => addOne(x);
  return thunk;
}

const fn = addOneThunk(1);

setTimeout(() => {
  const value = fn();
  console.log(value);
});
```

- 사용하기

index.js에 추가해서 사용

store에 추가 ReduxThunk

### Thunk 생성 함수 만들기

액션 생성 함수에서 일반 액션 객체를 반환하는 대신에 함수를 반환한다.

logger, ReduxThunk 같이 사용하면 처음 디스패치 되는 액션은 함수, 두번째는 객체

### 웹 요청 비동기 작업 처리하기

yarn add axios

1. api 생성 with axios
1. reducer 작성
   액션타입
   thunk 함수 async, try, catch
1. 만든 reducer 루트 리듀서에 추가
1. 프레젠테이셔널 컨테이너 작성 - 유효성 검사 필수
1.

### 리팩토링

17줄 정도 되는 thunk 함수를 작성하는 것은 귀찮음
로직을 따로 분리

```jsx
export default function createRequestThunk(type, request) {
  //성공 및 실패 타입
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      throw e;
    }
  };
}
```

### loading 부분 만들어주기

리펙토링한 createRequestThunk 부분에 만들어준다.

- 요청이 시작 될 때 디스패치할 액션
  로딩이 디스패치 되면 loading reducer가 관리하고 있느 ㄴ상태에서 sample/GET_POST 값을 true로 설정한다. 기존값이 존재하지 않으면 새로 값을 설정해줌

```jsx
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
```

로딩 실패에대한 \_FAILURE 에 대해서 액션을 리듀서에서 처리해주면 된다.
try catch 구문 이용

### redux-saga

비동기 작업을 관리하는 방법
thunk가 함수 형태의 액션을 디스패치하여 미들웨어에서 해당 함수에 스토어의 dispatch와 getSate를 파라미터로 넣어서 사용하는 원리

redux-saga 기존 요청을 취소 처리해야 할 때
특정 액션이 발생했을 때 다른 액션을 발생 API 요청 등 리덕스와 관계 없는 코드 실행
웹소켓
API 요청 실패 시 재요청

### 제너레이터 함수

### 비동기 카운터 만들기

루트 사가 만들어주기

yiled delay
put
takeEvery 들어오는 모든 액션에 대해 특정 작업을 해줌
takeLatest 가장 마지막으로 실행된 작업만 수행

```jsx
export function* rootSaga() {
  //all 여러 사가를 합쳐주는 역할
  yield all([counterSaga]);
}
```

### 리덕스 개발자 도구 설치

yarn add redux-devtools-extension

### saga와 thunk 차이점

sampleSaga()를 만들어서 takeLatest로 가장 나중의 데이터를 받아와야한다.
그래서 이를 루트 사가에 등록해서 사용하게 되는데 이게 export 되는 함수이다.

### 리펙토링
