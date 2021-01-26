import React, { useState, useEffect } from 'react';

const Info = () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
  });
  const { id, name } = form;
  useEffect(() => {
    console.log('effect');
    console.log(name);
    // return () => {
    //   console.log('cleanup');
    //   console.log(name);
    // };
  });
  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
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
        name="id"
        placeholder="id 입력"
        value={id}
        onChange={onChange}
      />
      <div>이름 : {name}</div>

      <div>아이디 : {id}</div>
    </>
  );
};

export default Info;
