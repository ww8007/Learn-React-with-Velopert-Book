import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import User from '../components/User';
import { getPost, getUsers } from '../modules/user';

const UserContainer = ({
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
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
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
)(UserContainer);
