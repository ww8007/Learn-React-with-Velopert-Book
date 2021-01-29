### SPA

한개의 페이지로 이루어진 싱글 어플리케이션의 약어
기존에는 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아오고 페이지를 로딩 할 때 마다 서버에서 리소스를 전달받아서 해석한 뒤 화면에 보여주었음
사용자에게 보이는 부분은 서버쪽에서 담당 -> 문제가 생김
서버측에서 이 동작들을 담당하면 성능상에 문제
트래픽 과다 높은 부하
이를 속도와 트래픽 측면에서는 캐싱과 압축을 해서 서비스 제공 시 최적화 가능하지만
사용자와 인터렉션이 자주 발생하는 모던 웹 에플리케이션에서는 문제가 많이 생김

yarn add react-router-dom

### 프로젝트에 라우터 적용

index.js 파일의 react-router-dom에 내장되어 있는 BrowserRouter라는 컴포넌트를 사용하여 감싸기

웹 에플리케이션의 HTML5의 History API 사용하여 페이지 새로고침하지 않고 주소 변경,
주소에 대한 정보를 props로 쉽게 조회하거나 사용 가능

### Route 컴포넌트로 특정 주소에 컴포넌트 연결

```jsx
<Route path="주소규칙" component={보여 줄 컴포넌트}>
```

- 처음에 이렇게 설정하면 두개의 페이지가 같이 나타남 home, aobut
  -> /about 규칙이 /에도 일치하기 때문에
  Home 라우터 exact props를 true로 변경

```jsx
<Route path="/" component={home} exact={true}></Route>
```

### Link 컴포넌트를 사용하여 다른 주소로 이동하기

일반 웹 에플리케이션에서는 a 테그를 이용하여서 페이지를 전환
a 태그는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있는 상태를 모두 날려버리게됨

- Link 컴포넌트를 사용한 전환
  페이지를 새로 불러오는 것이 아닌 애플리케이션은 그대로 유지하면서 HTML5 History API를 사용하여서 페이지의 주소만 변경해줌
  Link자체는 a태그로 이루어져 있지만 페이지 전환을 방지하는 기능이 내장되어있음

### 파라미터와 쿼리

- props에 match 삽입
- username 비구조화 할당

파라미터 : 특정 아이디 혹은 이름 사용하여 조회
쿼리 : 키워드 검색, 페이지 필요 옵션

### 쿼리

loacation 객체의 search 값에서 조회 가능
location 객체는 라우트로 사용된 컴포넌트에게 props로 전달 현재 주소의 정보 지님

sarch 값에서 확인
특정 값을 읽어 오기 위해서 문자열 -> 객체 형태

yarn add qs

### 라우터의 분리

경로 별로 라우터를 따로 만들어서 삽입 가능

### 리액트 라우터 부가 기능

- history

사용된 컴포넌트에 match, location과 함께 전달 되는 props중 하나
이를 통해서 컴포넌트 내에 구현하는 매서드에서 라우터 API 호출 가능
특정 버튼 눌렀을 때 뒤로 가기
로그인 후 화면 전환
다른 페이지 이탈 방지

- class 형으로 구현하여서
  handleGoback
  handleGoHome
  componentDidMount
  componentWillUnmount

### withRouter

Hoc - High order component

라우트로 된 컴포넌트가 아니어도 match location history 객체 접근 가능

- 사용할 컴포넌트의 export를 감싸줌

```jsx
export default withRouter(withRouterSample);
```

match 객체의 params가 비어있는데 현재 자신을 보여주고 있는 라우터 컴포넌트 기준으로 match가 전달된다. Profiles를 위한 라우트를 설정할 때 path="/profiles/로 했기 때문에 username 파라미터 읽어오지 못함

이를 해결하기 위해서는 Profile부에 있는 컴포넌트에 가서 withRouter를 사용하면 된다.

### Switch

여러 Route를 감싸서 그 중 일치하는 단 하나의 라우트만을 랜더링 시켜줌
Switch를 사용하면 모든 규칙과 일치하지 않을 때의 Not Found 페이지도 구현 가능

### NavLink를 이용한 css 스타일링 가능

Link와 동일하게 사용하지만 css 스타일을 입힐 수 있다.
