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
