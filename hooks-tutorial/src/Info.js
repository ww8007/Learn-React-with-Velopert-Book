import React, { useReducer } from 'react';

function reducer(state, action) {
  console.log(action.name);
  console.log(action.value);
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, { name: '', nickname: '' });
  const { name, nickname } = state;
  const onChange = (e) => {
    dispatch(e.target);
    console.log(e.target);
  };
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
