import React from 'react';
import qs from 'qs';
const About = ({ location }) => {
  // 아래와 같이 사용해서 문자열 맨 앞 ? 삭제
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const showDetail = query.detail === 'true';
  return (
    <div>
      <h1>소개</h1>
      <p>라우터 실습</p>
      {showDetail && <p>detail 값을 true로 했군요</p>}
    </div>
  );
};

export default About;
