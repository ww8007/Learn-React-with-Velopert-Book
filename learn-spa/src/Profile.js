import React from 'react';

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
    </div>
  );
};

export default Profile;
