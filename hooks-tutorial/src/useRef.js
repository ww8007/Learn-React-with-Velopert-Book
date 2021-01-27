import React, { useRef } from 'react';

const useRef = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  return <div>refSmaple</div>;
};

export default useRef;
