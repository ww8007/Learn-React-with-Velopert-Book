import React from 'react';
import PropTypes from 'prop-types';
const Mycomponent = ({ name, children, color }) => {
  //   const { name, children } = props;
  return (
    <div>
      안녕하세요, 제 이름은 {name} 입니다. <br />
      children 값은 {children}
      입니다. <br></br>
      제가 가장 좋아하는 색깔은 {color} 입니다.
    </div>
  );
};

Mycomponent.defaultProps = {
  name: '수',
};

Mycomponent.propTypes = {
  name: PropTypes.string,
  color: PropTypes.number.isRequired,
};
export default Mycomponent;
