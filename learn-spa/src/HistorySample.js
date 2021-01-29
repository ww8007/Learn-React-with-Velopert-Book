import React, { Component } from 'react';

class HistorySample extends Component {
  handleGoBack = () => {
    this.props.history.goBack();
  };

  hadnleGoHome = () => {
    this.props.history.push('/');
  };

  componentDidMount() {
    //페이지에 변화가 생기려고 할 때 마다 나갈 것에 대한지에 대한 질문을 함
    this.unblock = this.props.history.block('정말 떠나실 건가요?');
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트 시 질문을 ㅁ머춤
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.hadnleGoHome}>홈으로</button>
      </div>
    );
  }
}

export default HistorySample;
