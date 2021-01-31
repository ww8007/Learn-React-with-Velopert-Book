import React, { useContext } from 'react';
import ColorContext from '../contexts/Color';
const colors = ['red', 'orange', 'blue', 'green', 'indigo', 'violet'];

const SelectColor = () => {
  const { actions } = useContext(ColorContext);
  return (
    <div>
      <h2>색상 선택</h2>
      <div>
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
              onClick={() => actions.setColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                actions.setSubcolor(color);
              }}
            />
          ))}
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default SelectColor;
