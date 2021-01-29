import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import home from './home';
import About from './About';
import Profiles from './Profiles';
import HistorySample from './HistorySample';
function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
      </ul>
      <hr></hr>
      <Switch>
        <Route path="/" component={home} exact={true}></Route>
        <Route path={['/about', '/info']} component={About}></Route>
        <Route path="/profiles" component={Profiles}></Route>
        <Route path="/history" component={HistorySample}></Route>
        <Route
          // path 지정 안할 시 모든 상황에 랜더링
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
