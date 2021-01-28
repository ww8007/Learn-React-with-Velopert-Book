import React, { useCallback, useMemo, useState, useRef } from "react";

const getavg = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, current) => acc + current);
  return sum / numbers.length;
};

const GetAvg = () => {
  const [number, setNumber] = useState("");
  const [list, setList] = useState([]);
  const inputEI = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const onClickAdd = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEI.current.focus();
  }, [number, list]);
  const avg = useMemo(() => getavg(list), [list]);

  return (
    <div>
      <h1>평균값 : {(console.log(avg), avg)}</h1>
      <input
        type="number"
        placeholder="숫자입력"
        value={number}
        onChange={onChange}
        ref={inputEI}
      />
      <button onClick={onClickAdd}>추가</button>

      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetAvg;
