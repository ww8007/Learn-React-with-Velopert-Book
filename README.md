# React

# 목록

### 리액트 이해

오직 **V(view)**만 신경

- 컴포넌트 : 특정 부분이 어떻게 생길지 정하는 선언체
  사용자 인터페이스를 다룰 때 사용하는 **템플릿**과는 다른 개념
  재사용이 가능한 API로 수많은 기능들 내장
  컴포넌트 하나에서 해당 컴포넌트의 생김새와 작동방식을 결정

- 렌더링 : 사용자 화면에 뷰를 보여줌
  리엑트 차별화 : 최초로 실행한 **초기 렌더링**과 컴포넌트의 데이터 변경으로 다시 실행 **리렌더링**

1. 초기 렌더링
   - render()함수
     컴포넌트가 어떻게 생겼는지 정의
     html 형식 문자열을 반환하는게 아니라 **뷰의 생김새** **작동**에 대한 정보를 지닌 객체를 반환
     컴포넌트 안에서 다른 컴포넌트의 이동이 자유로움
     이동시에 rendor 호출 시 내부의 컴포넌트도 재귀적인 렌더링
     최상위 컴포넌트이 렌더링 작업 끝날 시 최상위 컴포넌트의 정보를 바탕으로 HTML 마크업 생성 후 실제 페이지의 DOM 안에 요소 주입
2. 조화 과정
   업데이트 개념이 아닌 조화과정을 거친다는 개념이 맞음
   컴포넌트에서 데이터 변화가 있을 경우 뷰가 변형되는 것 처럼 보이지만 사실은 새로운 요소로 갈아끼운다고 보면됨
   원래는 많은 시간과 데이터를 필요로 하지만 이를 해결해 주는 것이 Virtual DOM

- Virtual DOM

  > Dom은 트리 형태로 특정 노드를 찾거나 수정 제거 또는 삽입 가능
  > 기존 DOM API는 동적 UI에 최적화가 되어있지 않은 단점이 있음 -> HTML -> JS로 해결해옴
  > 하지만 규모가 커지는 프로젝트 -> 페이스북 게시물 한개에 div 100개
  > DOM이 느린것이 아닌 DOM의 변화에 따른 css 다시 연산, 레이아웃 구성, 리페인트 작업이 오래걸림
  > -> 이의 해결법의로 Virtual DOM 사용

  실제 DOM에 접근하여 조작하는 것이 아닌 이를 추상화한 자바 스크립트 객체를 구성하여 사용 -> DOM의 가벼운 사본같은 느낌
  3단계를 거쳐서 DOM 업데이트

  1. 전체 UI -> Virtual DOM 리렌더링
  2. 이전 Virtual DOM에 있던 내용과 현재 내용 비교
  3. 바뀐 내용만 실제 DOM에 적용

  - 리엑트가 무조건 좋은것이 아닌 활용에 맞는 곳에 사용해야 좋음
    단순한 라우팅이나 정적 페이지에서는 오히려 활용도가 떨어질 수 있다.
    UI 업데이트 과정에서 생기는 복잡함 모두 해소, 쉽게 접근 -> 업데이트 처리 간결성

    - MVC
      Model : 프로그램에서 사용되는 실제 데이터 및 데이터 조작 로직 저리
      View : 사용자에게 제공되는 UI
      Controller : 사용자의 입력을 받고 처리하는 부분
      - 단점 : View와 Model이 의존적

    * MVP
      Model, view는 같지만 Controller, Presenter 존재
      입력을 View에서 받음
    * 리액트는 뷰만 담당
      이를 해결하는 것이 라우팅 -> 리액트 라우터
      Ajax -> axios, fetch
      상태 관리 -> 리더스 MobX

    * 코드 수정마다 웹 브라우저 리로딩 -> 웹팩

### JSX

index.js에 파일을 모아서 웹펙을 이용해서 새로운 파일을 만들어줘서 import 동시에 여러개 가능하게 함

- 컴포넌트를 하나의 요소로 감싸야 하는 이유
  Virtual DOM 에서 컴포넌트 변화를 감지해낼 때 효율적
  컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져 있어야 함

  1. div
  2. Fragment

- jsx안에서 자바스크립트 쓰기
  jsx 내부에서 코드를 { }로 감싸면 됨
  저번에 공부했던 reduce 부분 해보기

```jsx
import './App.css';

function App() {
  const number = [1, 2, 3, 4, 5];
  const avg = number.reduce((acc, current, index, arrary) => {
    if (index + 1 === arrary.length) {
      return (acc + current) / arrary.length;
    }
    return acc + current;
  }, 0);
  return (
    <div>
      <h1>{avg}</h1>
      <h2>잘작동?</h2>
    </div>
  );
}

export default App;
```

- return 부 안쪽 jsx 에는 조건문 사용 불가 -if -> 조건부 연산자 사용

```jsx
import './App.css';

function App() {
  const name = '리액트1';
  return (
    <div>
      {name === '리액트' ? <h1>맞습니다</h1> : <h1>아닙니다</h1>}
      <h2>잘작동?</h2>
    </div>
  );
}

export default App;
```

- 컴포넌트에서 undefined를 반환하는 것은 안됨 -> || or 연산자를 사용해서 return 해야함
  jsx 내부에서 undefined를 사용하는 것은 괜찮

- 스타일링은 외부에서 style을 지정하여 사용하거나 아니면 style 인라인으로 지정해 사용
  div 안에서 사용하려면 {{ }} 두 번 사용하여 사용

- class -> className

### 컴포넌트

클래스형 컴포넌트, 함수형 컴포넌트

차이점 : state 기능 및 라이프 사이클 기능 사용가능, 임의 메서드 정의 가능

클래스형 컴포넌트 : render 무조건 존재, jsx 반환

### 화살표 함수

snippet rsc 입력하면바로 선언 클래스 rcc

### children

부모 컴포넌트에서 테그 사이의 값은 children에서 받을 수 있다.
App.js
아래에서 리엑트가 children

```jsx
<Mycomoponent>리엑트</Mycomoponent>
```

### props들 비구조화 할당

return 부 앞에서 비구조화 할당을 해서 사용
파라미터에서 비구조화 할당도 가능

- 함수의 파라미터가 객체면 바로 함수 파라미터 부분에서 비구조화

1. 내부에서 비구조화

```jsx
const Mycomponent = (props) => {
  const { name, children } = props;
  return (
    <div>
      안녕하세요, 제 이름은 {name} 입니다. <br />
      children 값은 {children}
      입니다.
    </div>
  );
};
```

2. 파라미터에서 비구조화

```jsx
import React from 'react';

const Mycomponent = ({ name, children }) => {
  //   const { name, children } = props;
  return (
    <div>
      안녕하세요, 제 이름은 {name} 입니다. <br />
      children 값은 {children}
      입니다.
    </div>
  );
};

Mycomponent.defaultProps = {
  name: '장동현',
};
export default Mycomponent;
```

### propTypes통한 props 검증

필수 props 지정하거나 props 타입 지정 할 때 사용

- import PropTypes from 'prop-types'

컴포넌트.propTypes로 사용해야 함
props의 부분에 import한 PropTypes 사용

- 협업에서의 선택사항임

### state
