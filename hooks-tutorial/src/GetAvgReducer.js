import React, { useReducer, useMemo } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      return (state.name = action.value);
    }
    case 'CLICK': {
      if (action.value === null) return;
      const list = state.list.concat(parseInt(action.value));
      if (list.length === 0) {
        return;
      }
      const sum = list.reduce((acc, current) => acc + current);
      return sum / list.length;
    }
    case 'MAKE': {
    }
    default:
      return state;
  }
}

const GetAvgReducer = () => {
  const [state, dispatch] = useReducer(reducer, { list: [], number: '' });
  const { list, number } = state;
  const avg = useMemo(() => dispatch('CLICK'), []);

  return (
    <div>
      <h1>{avg}</h1>
      <input
        type="number"
        placeholder="숫자입력"
        name="number"
        value={number}
        onChange={() => dispatch({ type: 'CHANGE' })}
      />
      <button onClick={() => dispatch({ type: 'CLICK' })}>추가</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetAvgReducer;
