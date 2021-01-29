### axios

현재 가장 많이 사용되고 이쓴ㄴ 자바스크립트 HTTP 클라이언트
요청을 Promise 기반으로 처리

yarn add axios

- 뉴스 api 받아오기

http://newsapi.org/v2/top-headlines?country=kr&apiKey=ecdd1223d3d44bc98e30d948cdf8ec7f

### 뷰어 UI 만들기

yarn add styled-components

### 데이터 연동하기

컴포넌트가 화면에 보이는 시점에 API 요청
useEffect를 사용하여 컴포넌트가 처음 랜더링 되는 시점에서 API 요청하면 됨
useEffect에 등록하는 함수에 async 사용 불가
useEffect -> 반환 -> 뒷정리 함수

- useEffect 내부에서 async/await을 사용하고 싶다면 함수 내부에서 async 키워드가 붙은 또 다른 함수를 만들어서 사용

추가로 loading에 대한 상태로 관리하도록 할 것

```jsx
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://newsapi.org/v2/top-headlines?country=kr&apiKey=ecdd1223d3d44bc98e30d948cdf8ec7f'
      );
      setArticles(response.data.articles);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  fetchData();
}, []);
```

### 리액트 라우터 적용

기존까지는 카테고리에 대한 값을 useState로 관리

NewsPage 생성

리액트 라우터를 적용할 페이지는 단 하나

라우터의 path를 ? 물음표 작성의 의미

값이 선택적 있을 수 있고 없을 수 있음

### usePromise 커스텀 HOOK 생성

API 호출 처럼 Promise를 사용해야 하는 경우 더욱 간결하게 코드를 작성할 수 있도록 도와줌
