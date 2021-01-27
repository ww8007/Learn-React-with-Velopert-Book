import React, { useReducer } from 'react';

function reducer(state, action) {
  //action 타입에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      console.log(state);
      console.log(state.value + 1);

      return { hi: state.hi + 1 };
    case 'DECREMENT':
      return { hi: state.hi - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Counter;
