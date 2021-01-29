import React from 'react';

const colors = ['red', 'orange', 'blue', 'green', 'indigo', 'violet'];

const SelectColor = () => {
  return (
    <div>
      <h2>색상 선택</h2>
      <div style={{ display: 'flex' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              width: '24px',
              height: '24px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      <hr></hr>
    </div>
  );
};

export default SelectColor;
