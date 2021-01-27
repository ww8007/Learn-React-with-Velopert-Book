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

state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미
porps는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 것이면 자식 요소는 해당 props 읽기밖에 못함

- 배열 비구조화 할당

  ```jsx
  const array = [1, 2];
  const [one, two] = array;
  ```

- 함수형 컴포넌트에서 useState 사용하기
  useState의 함수의 인자에는 상태의 **초기값**
  **클래스형** 에서는 **객체**를 선언해야 하지만 useState의 경우는 아무거나 가능
  함수를 호출하면 **배열** 반환
  첫 번째 원소 : **현재 상태**
  두 번째 원소 : 상태를 바꿔주는 **함수**(**세터 함수**)
  이를 배열 **비구조화 할당**으로 자유롭게 이름 선언 가능

* 여러개의 useState 사용가능

```jsx
import React, { useState } from 'react';

const Say = () => {
  const [text, setText] = useState('');
  const onClickEnter = () => setText('안녕');
  const onClickLeave = () => setText('잘가');

  const [color, setColor] = useState('black');

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{text}</h1>
      <button style={{ color: 'red' }} onClick={() => setColor('red')}>
        빨간색
      </button>
      <button style={{ color: 'blue' }} onClick={() => setColor('blue')}>
        파란색
      </button>
      <button style={{ color: 'green' }} onClick={() => setColor('green')}>
        초록색
      </button>
    </div>
  );
};

export default Say;
```

- 불변성 유지
  무조건 useState나 세터 함수로 호출해서 사용
  불변성 유지를 위해 객체를 복사 ...spread 또는 배열 내장 concat, map, filter 사용

- props 단점
  무조건 props 값이 고정적인 것은 아님
  부모의 state를 설정하고 이를 자식에게 props로 전달하여 props 호출시 state 변경으로 유동적으로 가능하다.

### 이벤트 헨들링

주의 사항

1. 이벤트 이름은 카멜 표기법
   onClick
2. 자바스크립트 코드 전달이 아닌 함수 형태로 전달
   화살표 함수 문법으로 만들어서 전달 하거나
   렌더링 외부에 미리 만들어서 전달 가능
3. DOM 요소에만 이벤트 설정 가능
   우리가 만든 돔이 아닌
   div, button, input, form, span 등의 돔 요소에만 전달 가능

- onChange 이벤트 설정

```jsx
<div>
  <h1>이벤트 연습</h1>
  <input
    type="text"
    name="message"
    placeholder="아무거나 입력"
    onChange={(e) => {
      console.log(e);
    }}
  />
</div>
```

콘솔에 입력되는 e 객체는 SyntheticEvent로 웹부라우저의 네이티브 이벤트를 감싸는 객체
네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 다룰 때와 똑같이 사용 가능하다.

- SyntheticEvent는 네이티브와 달리 이벤트가 끝나면 이벤트가 초기화 되므로 정보를 참조할 수 없다.
- 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist()함수를 호출해줘야 한다.
  ```jsx
    onChange={(e) => {
          console.log(e.target.value);
        }}
  ```

* setState를 통한 state 확인
  onClick에 대한 event를 생성하여서 alert을 통한 state 출력

```jsx
import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: '',
  };
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력"
          value={this.state.message}
          onChange={(e) => {
            this.setState({ message: e.target.value });
          }}
        />
        <button
          onClick={() => {
            alert(this.state.message);
            this.setState({
              message: '',
            });
          }}
        >
          확인
        </button>
      </div>
    );
  }
}

export default EventPractice;
```

### 임의 메서드 만들기

이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달
-> 미리 만들어서 전달하는 방법
가독성이 올라간다. 상황에 따라 다름(렌더링 메서드에서 함수 정의 하는게 나을 수 도 잇음)

- 함수를 호출 할 때 this는 호출부에 따라서 결정 되므로 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 this가 바뀔 수 있다. 그러므로 this.bind를 사용하여서 묶어주는것이 필요
  ```jsx
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  ```

* property Initializer Syntax 통한 메서드 작성

새 메서드를 만들 때 마다 construntor를 수정해야하는 불편함이 존재한다. 이를 해결하기 위해서 바벨의 transform-class-properties 문법을 사용하여 화살표 함수 형태로 메서드를 정의 가능하다.

### input 여러개 다루기

input 값이 여러개일 경우는 메서드를 여러개 만들 수도 있지만 event 객체를 활용하면 된다.
e.target.name을 사용하면 됨

객체 안에서 [ ] 로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key로 사용된다.

input이 여러개인데 handleChange의 부분은 지금 두개를 담당 할 수 없다.
그러기에 input에 대한 name tag로 설정된 부분을 확인 할 수 있다.

placeholder는 이를 대체 불가능 하다.

```jsx
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};
```

### onKeyPress 이벤트 설정하기

기존에 설정된 handleClick 이벤트를 엔터 키를 눌렀을 경우 실행하도록 하는게 목적이다.

```jsx
handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    this.handleClick();
  }
};
```

위와 같이 엔터키가 입력 되었을 경우 handleClick 함수가 호출되어 alert 이된다.

### function형으로 구현하기

기본적인 형은 class 형과 동일하게 간다.
차이점이라고 하면 useState를 사용하여 비구조화 할당을 통해 사용하려는 useState의 이름을 설정하고 또한 const로 함수를 생성하여서 사용한다는 점이다.
아래의 코드에서는 useState를 통해 **객체**로 초기값을 설정하고
form으로 또 비구조화 할당으로 꺼내왔다.

- 가장 큰 차이점은 onChange 부분에 불변성 유지 이다.
  변화하는 객체에 대해서 ... spread 연산자를 통해서 복사를 한 뒤
  [ ] 안에 넣은 레페런스로 실제 key로 동작하게 한 뒤
  다음 상태에 넣어준다는 것 이다.

```jsx
import React, { useState } from 'react';

const EventPractice_Function = () => {
  const [form, setState] = useState({
    username: '',
    message: '',
  });
  const { username, message } = form;
  const onChange = (e) => {
    const nextChange = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setState(nextChange);
  };
  const onClick = () => {
    alert(username + ' : ' + message);
    setState({
      username: '',
      message: '',
    });
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="아이디 입력"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="아이디 입력"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>입력</button>
    </div>
  );
};

export default EventPractice_Function;
```

### 컴포넌트 반복

- map 함수
  알고 있는 reducer와 동일하게 callback, index, array 이렇게 이루어 진다.
  배열을 앞에 선언한 뒤 그 뒤에 배열.map((num) => 하고싶은 행동))

* map 함수를 이용한 li 테그 반복되게 생성
  ```jsx
  const names = ['눈사람', '얼음', '눈', '바람'];
  const nameList = names.map((name) => <li>{name}</li>);
  ```

### key

key가 없으면 데이터를 순차적 비교하므로 원하는 데이터를 찾는데 시간이 많이 걸릴 수 있다.
그러므로 key 값 사용

- key 설정
  map 함수의 인자로 전달되는 함수 내부에서 map() 함수의 **인자**로 전달되는 함수 내부에서 컴포넌트 props 설정하듯이 설정

- index를 사용한 key 설정을 비효율적 <- 고유한 key 값이 없을 때만 사용

- 간단한 항목 추가 예제

  - 중요한 사항 : key값이 무조건 존재해야 함
  - onChange의 이벤트에 useState로 설정한 함수를 불러와서 사용하는 것

  * useState의 비구조화 할당을 통해 직접 처음에 설정한 name 값에 대해 접근이 가능하지만
    setText를 통해 아래에서 빈 값으로 돌려주는 구조이므로 text를 value 값으로 사용하도록 한다.

  1. useState를 통한 현재상태와 세터 함수 설정
     ```jsx
     const [names, setNames] = useState([
       { id: 1, name: '눈사람' },
       { id: 2, name: '눈' },
       { id: 3, name: '사' },
       { id: 4, name: '람' },
     ]);
     const [text, setText] = useState('');
     const [nextId, setNextId] = useState(5);
     ```
  2. onChange, onClick 이벤트 핸들러 설정

  - onClick 불변성 유지 하면서 새로운 배열 생성하여 사용 spread와 비슷

  ```jsx
  const onChange = (e) => setText(e.target.value);

  const onClick = () => {
    const nextName = names.concat({
      id: nextId,
      name: text,
    });
    setNextId(nextId + 1);
    setNames(nextName);
    setText('');
  };
  ```

  3. map 함수를 이용한 li 테그들 생성
     ```jsx
     const nameList = names.map((myname) => (
       <li key={myname.id}>{myname.name}</li>
     ));
     ```
  4. 삭제 기능 구현

     - filter를 사용한 불변성을 유지하며 새로운 배열 생성

     ```jsx
     const onRemove = (id) => {
       const nextNames = names.filter((name) => name.id !== id);
       setNames(nextNames);
     };
     ```

     - onDoubleClick은 이미 존재하는 함수 ( ) => { } 화살표 문법 주의
       ```jsx
       const nameList = names.map((myname) => (
         <li key={myname.id} onDoubleClick={() => onRemove(myname.id)}>
           {myname.name}
         </li>
       ));
       ```

## Hooks

### useState

기본적으로 변수를 생성해주고 함수를 생성해 준다고 볼 수 있음
1 par 변수(객체)
2 par 함수(세터함수)
[e.target.name] 를 사용하여서 input 값 여러개 다루는 것도 알아두기

- input 값에 name이 꼭 들어가야 함을 유의
- 불변성 유지 유의

### useEffect

랜더링 될 때 마다 특정 작업을 수행 하도록 설정 가능
클래스 형 : componentDidMount, componentDidUpdate

useEffect는 두번 째 인자의 배열에 어떤 것을 집어넣느냐에 따라서 행동이 달라짐

- 처음의 랜더링만 확인하고 싶다면 useEffect의 두번째 인자로 빈 배열을 선언

```jsx
useEffect(() => {
  console.log('랜더링 완료');
}, []);
```

- 특정 값을 확인하고 싶다면 두번째 인자로 검사하고 싶은 내용 삽입

```jsx
useEffect(() => {
  console.log('랜더링 완료');
  console.log(id, name);
}, [id, name]);
```

- 뒷정리 함수 cleanup
  **언마운트** 직전 또는 **업데이트**하고 싶다면 반환
  return() => { } 으로 어떤 내용이 정리 되는지 눈으로 확인 가능하다.
  return() 함수가 없더라도 cleanup은 자동으로 정리가 된다.
  - 오직 언마운트에만 뒷정리 함수 호출 하고 싶다면 두번 째 파라미터에 비어있는 배열

### useReducer

useState보다 더 다양한 상황에 따라 다양한 상태를 다른 값으로 없에이트 해주고 싶을 때 사용
**현재 상태**와 업데이트를 위한 정보를 담은 **액션**값을 전달받아 새로운 상태를 반환
**불변성**유지 필수

리덕스의 액션 객체에는 어떤 액션인지 알려주는 type 필드가 꼭 있어야 하지만 useReducer는 type이 필수는 아니다. 객체가 아니여도 되고 문자열이나 숫자도 가능

- 간단한 reducer 예제

1. reducer 함수 작성
   - reducer 함수에는 현재 상태, 업데이트를 위해 필요한 정보를 담은 액션 값을 전달 받아 새로운 상태 **반환**
   - 파라미터로 state와 action을 설정하여서 현재 상태와 action 타입 설정
   - switch (action.type) 문을 통해서 각 액션 타입에 따른 작업 설정

action : 지금 하는 DOM 에서의 action
state: 현재하는 상태

### useCallback

useMemo와 상당히 비슷, 렌더링 성능을 최적화 해야 하는 사용해서 사용
만들어놨던 **함수** 재사용 가능
첫번째 파라미터에는 사용하고 싶은 함수
두번째 파라미터에는 변경되는 내용 작성

- 내용이 변경되면 무조건 두번째 파라미터로 작성해줘야한다.

### useRef

함수형 컴포넌트에서 ref를 쉽게 사용가능
랜더링과 관련이 없는 코드를 수정 할 때만 이를 사용한다?

```jsx
const inputEI = useRef(null);
선언;

const onClickAdd = useCallback(() => {
  const nextList = list.concat(parseInt(number));
  setList(nextList);
  setNumber('');
    사용하고 싶은 곳에 focus 선언
  inputEI.current.focus();
}, [number, list]);

input 테그 안에 사용
<input
        type="number"
        placeholder="숫자입력"
        value={number}
        onChange={onChange}
        ref={inputEI}
      />
```

### 커스텀 Hooks 만들기

여러 컴포넌트에서 비슷한 기능을 공유할 경우 Hook을 사용자 정의 하여 사용가능

기존에 작성하였던 info를 가져다 사용 가능

- initialForm을 props로 전달하여서 쓰면 된다.
- onChange도 이 부분에서 사용하여서 return 값으로 state, onChange를 사용한다.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function UserInput(initalForm) {
  const [state, dispatch] = useReducer(reducer, initalForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```
