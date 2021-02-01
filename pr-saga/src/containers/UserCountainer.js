import React, { useEffect } from 'react';
import User from '../components/User';
import { connect } from 'react-redux';
import { getPost, getUsers } from '../modules/user';

const UserCountainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  useEffect(() => {
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getPost, getUsers]);
  return (
    <User
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
      post={post}
      users={users}
    ></User>
  );
};

export default connect(
  ({ user, loading }) => ({
    post: user.post,
    users: user.users,
    loadingPost: loading['user/GET_POST'],
    loadingUsers: loading['user/GET_USERS'],
  }),
  {
    getPost,
    getUsers,
  }
)(UserCountainer);
