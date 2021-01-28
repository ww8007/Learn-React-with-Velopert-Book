import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import home from './home';
import About from './About';
import Profile from './Profile';

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
          <Link to="/profile/jang">jang 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">길동 프로필</Link>
        </li>
      </ul>
      <hr></hr>
      <Route path="/" component={home} exact={true}></Route>
      <Route path={['/about', '/info']} component={About}></Route>
      <Route path="/profile/:username" component={Profile}></Route>
    </div>
  );
}

export default App;
