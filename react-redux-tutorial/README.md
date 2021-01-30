### 리덕스

# 작업 환경 설정

yarn add reddux-react-redux

### ui 준비

리덕스 사용시에 프레젠테이셔널 컴포넌트, 컨테이너 컴포넌트 분리가 주로 이루어짐

1. 프로젠테이셔널 컴포넌트 : 상태 관리 x 오직 pros만을 받아와서 화면에 UI 보여줌
   src/components
1. 컨테이너 컴포넌트 : 리덕스와 연동되어 있는 컴포넌트, 리덕스로부터 상태 받아옴 리덕스 스토어에 액션을 디스패치
   src/containers

### 카운터 컴포넌트

components 디렉토리에 생성
프레젠테이셔널 프로젝트 이므로 뷰만 담당
props로 button, onIncrease, onDecrease 담당

### 할 일 목록 컴포넌트

한 컴포넌트에개의 두개의 컴포넌트 선언
분리 가능하지만 TodoItem을 Todos 안에서 보여주는 내용으로 사용하니까 이게 더 효율적일 수 도 있음
각 컴포넌트들이 사용하는 props들 주의하여 작성
(안에서 어떠한 액션들을 하는지 판명 가능)

### 리덕스 관련 코드 작성

1. 액션 타입
2. 액션 생성 함수
3. 리듀서 코드

이들을 모두 묶어서 작성하는 것이 Ducks 패턴

- export를 사용하여 정의된 액션 함수를 내보내줌
  export default는 하나만 사용 가능

```jsx
// 액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수
// 다른 파일에서 사용이 가능하도록 함
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//초기 상태 및 리듀서 함수 작성

const initialState = {
  number: 0,
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}

export default counter;
```

### 루트 리듀서 만들기

creatSotre 함수를 통하여 스토어를 만들 때는 리듀서를 하나만 만들어서 사용해야 함
기존에 만들었던 리듀서들을 합체

- modules 디렉터리에 index.js 파일 생성

각 export default reducer 들이 설정된 컨테이너 컴포넌트들을 불러와서 import
그리고 combineReducer를 통해 객체 형식으로 묶어줌

- index.js 로 만들면 modules 까지만 등록해도 바로 import가 가능하기 때문에 편하다.

```jsx
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

### 리액트 애플리케이션에 리덕스 적용

1. 스토어 생성
   방금 만들었던 루트 리듀서를 사용하게 됨
   ```jsx
   const store = createStore(rootReducer);
   ```
2. Provider를 통한 App 감싸기, 스토어를 props로 전달
   ```jsx
   <Provider store={store}>
     <App />
   </Provider>
   ```
3. Redux DevTools의 설치 및 사용
   - 기존에 만들었던 store에 추가하여 사용
     yarn add redux-devtools-extension
   ```jsx
   import { composeWithDevTools } from 'react-redux';
   ```

### 컨테이너 컴포넌트 만들기

컴포넌트에서 리덕스 스토어에 적근하여서 원하는 상태를 받아오고 액션도 디스패치

리덕스 스토어와 연동된 컴포넌트를 **컨테이너 컴포넌트**라고 한다.

컴포넌트를 리덕스와 연동하려면 react-redux에서 제공하는 connect 함수를 사용

mapSateToProps와 mapDispatchToProps에서 반환하는 내부 값들은 컴포넌트의 props 값으로 전달이 됨

mapSateToProps는 state를 파라미터로 받아오며 값은 현재 스토어가 가르키고 있는 상태
mapDispatchToProps의 경우 stroe의 내장함수 dispatch를 파라미터로 받아옴

### connect 함수의 익명함수화

미리 선언해 두고 사용하는 일이 많지만 익명함수로 export default 안에서 함수에 대한 정의를 하여도 상관 없다.

```jsx
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
  })
)(CounterContainer);
```

- dispatch 에 대해서 return을 사용하여서 더 가시적으로 쉽게 작성가능

```jsx
(dispatch) => ({
    increase: () => {
      return {dispatch(increase())};
    }
})
```

- 컴포넌트에서 액션을 디스패치하기 위해 각 액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 번거로울 수 있음 이와 같은 경우 bindActionCreators 통해 해결

### connect 가장 쉬운 방법

컨테이너 컴포넌트에서 dispatch에 대한 내용을 connect 시킬 때 dispatch에 대한 내용들을 객체 형태로 넣어주는게 가장 편하다.

- 그 다음에 props를 사용해서 구현하면 된다.

내가 보기에는 버튼이나 행동별로 ui 적으로 뭐가 필요한지 생각하고 그 뒤에 작성하는 것이 제일 바람직하다고 생각한다.

### 리덕스 더 편하게 사용하기

### redux-actions

yarn add redux-actions

리듀서를 작성할 때 switch/case문이 아닌 handleActions라는 함수를 사용하여 각 액션마다 업데이트 함수를 설정 가능

- 각 액션 생성 함수에서 파라미터 필요할 시 payload 사용

액션 생성 함수에서 받아온 파라미터를 그대로 payload에 넣는 것이 아니라 변형을 주어서 넣고 싶다면 createAction의 두번 째 함수에 payload를 정의하는 함수를 따로 지정해 주어야 한다.

```jsx
const myAction = createAction(MY_ACION, (text) => `${text}`);
```

- 만약 파라미터가 액션 함수에 들어가는 경우
  1. 객체에 액션객체가 들어가는 경우
     ```jsx
     export const insert = createAction(INSERT, (text) => ({
       id: id++,
       text,
       done: false,
     }));
     ```
  2. 일반적인 경우
     받아오는 인자를 그냥 바로 넘겨줌
     ```jsx
     export const toggle = createAction(TOGGLE, (id) => id);
     ```
