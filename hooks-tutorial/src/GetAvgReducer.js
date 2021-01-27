import React, { useReducer, useMemo } from 'react';

function getAvg(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, current) => acc + current);
  return sum / numbers.length;
}

function reducer(state, action) {
  switch (action.type) {
    case 'CLICK': {
      console.log('click' + action.list);
      console.log('click' + action.number);
      console.log('click' + action);
      console.log('click' + action.value);
      console.log('click' + action.name);
      return {
        ...state,
        list: [...state.list, parseInt(state.number)],
        // [state.number]: '',
        // [action.number]: '',
        number: '',
      };
    }

    default:
      console.log('타이핑' + state.list);
      console.log('타이핑' + state.number);
      console.log(state);
      console.log(action);
      console.log('타이핑' + action.value);
      console.log('타이핑' + action.name);
      return {
        ...state,
        [action.name]: action.value,
        // number: action.value,
        // [state.number]: action.value,
      };
  }
}

const GetAvgReducer = () => {
  const initialState = {
    list: [],
    number: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { list, number } = state;
  const avg = useMemo(() => getAvg(list), [list]);

  const onChange = (e) => {
    dispatch(e.target);
  };
  const onClick = () => {};
  return (
    <div>
      <h1>{avg}</h1>
      <input
        placeholder="숫자입력"
        value={number}
        name="number"
        onChange={onChange}
      />
      <button
        value={number}
        name="number"
        onClick={() => dispatch({ type: 'CLICK' })}
      >
        추가하기
      </button>
    </div>
  );
};

export default GetAvgReducer;
