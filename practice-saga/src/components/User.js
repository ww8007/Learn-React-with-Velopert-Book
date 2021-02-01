import React from 'react';

const User = ({ loadingPost, loadingUsers, post, users }) => {
  return (
    <>
      <section>
        <h1>포스트 목록</h1>
        {loadingPost && '로딩중...'}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <section>
        {loadingUsers && '로딩중...'}
        {!loadingUsers && users && (
          <div>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}({user.email})
              </li>
            ))}
            ;
          </div>
        )}
      </section>
    </>
  );
};

export default User;
