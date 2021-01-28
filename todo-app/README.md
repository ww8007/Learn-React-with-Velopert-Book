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
