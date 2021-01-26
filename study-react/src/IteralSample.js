import React, { useState } from 'react';

const IteralSample = () => {
  const [names, setNames] = useState([
    { id: 1, name: '눈사람' },
    { id: 2, name: '눈' },
    { id: 3, name: '사' },
    { id: 4, name: '람' },
  ]);
  const [text, setText] = useState('');
  const [nextId, setNextId] = useState(5);

  const onChange = (e) => setText(e.target.value);

  const onClick = () => {
    const nextName = names.concat({
      id: nextId,
      name: text,
    });
    setNextId(nextId + 1);
    setNames(nextName);
    setText('');
  };

  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const nameList = names.map((myname) => (
    <li key={myname.id} onDoubleClick={() => onRemove(myname.id)}>
      {myname.name}
    </li>
  ));
  return (
    <div>
      <ul>{nameList}</ul>
      <input
        type="text"
        placeholder="텍스트 입력"
        value={text}
        onChange={onChange}
      />
      <button onClick={onClick}>추가</button>
    </div>
  );
};

export default IteralSample;
