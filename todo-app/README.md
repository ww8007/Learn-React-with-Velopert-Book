### UI

1. TodoTemplate
   화면을 가운데에 정렬, 앱 타이틀(일정 관리) children으로 내부 JSX를 props로 받아옴
1. TodoInsert
   새로운 항목을 입력가능 state를 통해 인풋의 상태 관리
1. TodoListitem
   각 할 일 정보에 대한 정보 보여주는 컴포넌트 todo 객체를 props 상태에 따른 UI 스타일
1. TodoList
   todos 배열을 props로 받아와서배열 내장함수 map 사용 여러개의 TodosListItem 컴포넌트로 변환

- 컴포넌트들을 src 디렉토리 components라는 디렉토리 생성 후 저장
  컴포넌트 파일을 components안에 넣는 이유 : 기능이나 구조상 필요

yarn add node-sass@4.14.1
yarn add classnames react-icons

### onSubmit on form 과 button onClick 차이점

둘 다 같은 역할을 하지만 onSubmit을 form에서 키보드 엔터에 대한 이벤트를 처리 하지 않아도 자동으로 이역할을 해주기 때문에 걱정을 하지 않아도 된다.

### 지우기 기능 구현

리액트 컴포넌트에서 배열의 불변성을 지키면서 배열 원소를 제거해야 할 경우 filter 사용

- filter 함수
  filter 함수에는 조건을 확인해 주는 함수를 파라미터로 넣어줘야 함.
  파라미터로 넣는 함수는 true 또는 false를 반환 시켜줘야 하며 true를 반환하는 경우만
  새로운 배열에 삽입된다.

App.js -> TodoList -> TodoListItem

todo로 부터 id 비구조화 할당 한 뒤 아이콘으로 설정한 remove classname에 만든 onRemove 함수 호출

### 토글 기능 구현

jsx DOM 내부에서는 if 문 구현이 안되기때문에

```jsx
const onToggle = useCallback(
  (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  },
  [todos]
);
```

이렇게 구현을 한다. 이를 insert 와 동일하게 props로 계속 전달을 하여서 전달 한뒤
마지막에서 onClick = {()=> onTolggle(id)}로 호출한다.

### 컴포넌트 성능 최적화

느려지는 원인

1. 자신이 전달되는 props 변경
1. 자신의 state 변경
1. 부모 컴포넌트가 리렌더링
1. forceUpdate 함수 실행 시

지금의 상태는 할 일 1을 체크할 경우 App 컴포넌트의 state가 변경되면서 App 컴포넌트 리렌더링
-> 고로 자식 요소들 까지 리렌더링

할 일 1 에 대해서는 리렌더링이 맞지만 다른 요소들은 리렌더링을 할 필요가 없음

### React.memo 를 사용한 컴포넌트 최적화

간단한 사용법 컴포넌트를 만들고 감싸기만 하면 됨

```jsx
export default React.memo(TodoListItem);
```

### onToggle, onRemove 함수가 바뀌지 않게 하기

지금의 상태는 함수가 계속 업데이트 되면서 memo 만으로는 해결 불가 그러므로 다른 것 적용

1. useState 함수형 업데이트 기능
1. useReducer

### useState 함수형 업데이트

setTodos 함수를 사용할 때 새로운 상태를 파라미터로 넣어줫음
고로 새롱누 상태를 파라미터로 넣는 대신 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수 가능

- 함수를 어떻게 업데이트 할 지 정의 시켜주면 됨

```jsx
const [number, setNumber] = useState(0);

const onIncrease = useCallback(()=> {
    setNumber(prevNumber => prevNumber +1);
}, []),
}

```

todos에 대해서 todo를 concat 시켜서 사용한다고 정의

```jsx
setTodos((todos) => todos.concat(todo));
```

### 프로덕션 모드 구동

yarn build
yarn global add serve
serve -s build

### useReducer 사용

useReducer의 두번 째 인자로 undefined를 사용 하고 세번 째 인자로 인자 설정 함수 설정시
컴포넌트가 맨 처음 랜더링 될 때에만 호출된다.

useReducer를 사용할 경우 기존 코드를 많이 고쳐야 한다는 단점이 존재하지만 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있다.
성능은 비슷하기에 취향에 따라서 정의

### 불변성의 중요성

useState를 통해 만든 todos 배열과 setTodos 함수를 사용하는 부분에서
React.memo를 사용하였을 때 props가 바뀌었는지 혹은 바뀌지 않았는지에 대해 리렌더링 성능 최적화가 가능하다.

### 리스트 최적화

리스트에 대한 최적화를 진행할 때에는 리스트 내부에서 사용하는 컴포넌트도 최적화를 해야하고
리스트로 사용되는 컴포넌트 자체도 최적화를 해야한다.

TodoList 쪽의 react.memo를 사용한 최적화는 todos 배열이 업데이트 될 때에만 이루어진다.
지금 TodoList에는 불필요한 리렌더링이 일어나지 않음

- 혹시 App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트 될 때 불필요한 리렌더링이 일어날 수 있기에 이에 대한 예방으로 해준 것 이다.

### react-virtualized 를 통한 랜더링 최적화

스크롤 되기전에는 보이는 부분만 랜더링 하도록 한다.

yarn add react-virtualized

reducer 함수 같이 함수를 작성해줘야 한다. 차이점은 컴포넌트 외부에 설정하는 것이 아니라는 것

- List 컴포넌트에서 TodoItem을 랜더링 할 때 사용 List 컴포넌트의 props로 설정해야 함
  파라미터에 index, key, style 값을 객체로 받아와서 사용

List 컴포넌트

1. 전체 크기
1. 각 항목 높이
1. 랜더링 할 때 사용되는 함수
1. 배열을 props로 넣어줌

css 의 nth child와 컴포넌트 사이 설정도 잊지 말 것

### immer를 설치하고 사용법 알아보기
