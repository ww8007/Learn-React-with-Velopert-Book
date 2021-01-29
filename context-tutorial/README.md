# Context API

전역적으로 props와 state 관리 가능

Consumer 사이에 중괄호 열어서 그 안에 함수
이 패턴을 Function as ad child, Render Props
컴포넌트의 children이 있어야 할 자리에 일반 JSX 문법 혹은 함수 전달

### Consumer

정보를 props로 받아오는 것이 아닌 만든 ColorContext 안에 들어 있는 Consumer 컴포넌트 통해 색상 조회

```jsx
<ColorContext.Consumer>
  {(value) => (
    <div
      style={{ width: '64px', height: '64px', background: value.color }}
    ></div>
  )}
</ColorContext.Consumer>
```

### Provider

기존의 Context를 만들 때 기본 값을 설정 하였는데 Provider에서 value를 명시 하지 않는다면 오류 발생

- Provider를 사용한다면 value값 명시 필수

### 동적 Context 사용

value 값에 무조건 상태 값이 있어야하는 것은 아님
함수를 전달 할 수도 있음

ColorProvider 컴포넌트 작성

useState를 사용한 상태와 액션을 정의 하고 이를 value에 상태는 state, 업데이트 함수 actions로 묶어서 전달

- Context 에서 값을 동적으로 사용할 때 무조건 묶어줄 필요는 없지만 state와 actions 객체를 따로따로 분리하면 다른 컴포넌트에서 Context를 사용하기 편함

- createContext를 사용할 때 기본값으로 사용할 객체도 수정
  createContext의 기본 값은 실제 Provider의 객체의 형태와 일치 시기는게 좋음
  구성 파악 쉬워지고 오류도 안생김
