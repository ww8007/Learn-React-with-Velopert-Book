import React, {useReducer} from 'react';

function reducer (state, action) {
    return {
        ...state,
        state.number
    }
}

const GetAvg = () => {
    const [state, dispatch] = useReducer(reducer, {ans : 0 , number : []});
    const {ans, number} = state;
    const onChange = (e) => {
        dispatch(e.target);
    }
    const onClick = (e) => {
        dispatch(e.target.number = 0);
    }
    return (
        <div>
            <h1>{ans}</h1>
            <input type="text"
            placeholder="숫자 입력"
            value={number}
            onChange={onChange}
            />
            <button onClick={onClick}>더하여 평균 구하기</button>
        </div>
    );
};

export default GetAvg;