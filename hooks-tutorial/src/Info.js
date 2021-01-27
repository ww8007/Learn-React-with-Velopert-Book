import React from 'react';
import UserInput from './UserInput';

const Info = () => {
  const [state, onChange] = UserInput({
    name: '',
    nickname: '',
  });
  const { name, nickname } = state;
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="이름 입력"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="nickname"
        placeholder="id 입력"
        value={nickname}
        onChange={onChange}
      />
      <div>이름 : {name}</div>

      <div>아이디 : {nickname}</div>
    </>
  );
};

export default Info;
