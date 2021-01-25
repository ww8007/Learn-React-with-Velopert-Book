import React, { useState } from 'react';

const Say = () => {
  const [text, setText] = useState('');
  const onClickEnter = setText('안녕');
  const onClickLeave = setText('잘가');
  return (
    <>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      {text}
    </>
  );
};

export default Say;
