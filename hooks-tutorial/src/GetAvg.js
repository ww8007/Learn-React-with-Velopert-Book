import React, { useState } from 'react';

const getavg = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, current) => acc + current);
  return sum / numbers.length;
};

const GetAvg = () => {
  const [number, setNumber] = useState('');
  const [list, setList] = useState([]);

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onClickAdd = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };
  let avg = 0;
  const onClickGet = () => {
    avg = getavg(list);
    console.log(avg);
  };
  return (
    <div>
      <h1>평균값 : {(console.log(avg), avg)}</h1>
      <input
        type="number"
        placeholder="숫자입력"
        value={number}
        onChange={onChange}
      />
      <button onClick={onClickAdd}>추가</button>
      <button onClick={onClickGet}>평균 구하기</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetAvg;
