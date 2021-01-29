import React from 'react';
import { withRouter } from 'react-router-dom';
import WithRouterSample from './WithRouterSample';
const data = {
  jang: {
    name: '장동현',
    des: 'hi',
  },
  gildong: {
    name: '홍길동',
    des: '주인공',
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.des}</p>
      <WithRouterSample></WithRouterSample>
    </div>
  );
};

export default withRouter(Profile);
