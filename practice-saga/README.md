1. yarn add redux
1. yarn add react-redux
1. yarn add redux-logger
1. yarn add redux-actions
1. yarn add redux-devtools-extension
1. yarn add axios

### 초기 설정

index.js에서 store rootSaga등 여러가지 설정 완료

### 프레젠테이셔널 컴포넌트 작성

나의 경우에는 프레젠테이셔널 컴포넌트를 먼저 작성하는게 편해서 먼저 작성했다.

### loading 작성

saga를 사용한다는 의미는 api 호출이나 뭔가를 불러온다는 것을 의미하므로
loading에 대한 작업을 먼저 해야 한다.
loading 모듈을 작성해서 사용하도록 한다.
이는 createAction, handleActions를 사용해서 작성하도록 한다.

- reducer 작성 요렁
  1. 처음에는 액션 생성 함수를 설정한다.
     나는 handleActions와 createAction으로 하는 편이 편하다고 생각하여서 사용
  2. redux-actions을 사용하여 작성할 경우 요청에 따른 액션 타입을 payload로 설정한다.
  3. spread 연산자를 이용해서 state, action에 대해서 정의

### 루트 리듀서에 추가

루트 리듀서를 작성해서 추가시켜 준다.

```jsx
import { combineReducer } from 'redux';
import loading from './loading';

const rootReducer = combineReducer({
  loading,
});

export default rootReducer;
```

### 리펙토링 createRequestSaga 작성

success와 failure에 대해서 작업을 먼저 설정하고
saga 제네레이터 함수를 생성
yield put(내가할행동(type))

- try catch 구문을 이용하여 작성

- call의 경우는 첫번째 인수 호출하고 싶은 함수
  나머지 : 함수안에 넣고 싶은 인수

### module 작성(user)

createAction, handleActions를 이용한 작업

- createAction
  두번 째로 넣는 인자는 인지를 위해서 필요
  만드는 액션에서 어떤 값을 필요로 하는지 알기 위해서 사용
  (example)

  ```jsx
  export const getPost = createAction(GET_POST, (id) => id);
  ```

- handleActions
  createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 객체 안에 넣을 때 원하는 이름으로 넣는 것이 아니라 **action.payload**로 공통적으로 넣어줌
  기존의 업데이트 로직에서도 모두 action.payload 사용한다.

* 만든 saga들 한번에 통합하여서 생성 함수 전달

  ```jsx
  export function* userSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
  }
  ```

* initialState 작성

* handleActions 부에 SUCCESS 부분만 따로 적어줌
  이유는 리펙토링한 createRequestSaga 또는
  loading 부에서 다른 작업들을 미리 해줬음
  -> 고로 다시 해줄 이유가 없다.
