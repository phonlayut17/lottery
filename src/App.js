import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LotteryPage from './pages/LotteryPage';
import SearchPage from './pages/SearchPage';
import Protected from './components/Protected';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("godFather");
  const [userType, setUserType] = useState("T");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
            userType={userType}
            setUserType={setUserType}
          />
        </Route>
        <Protected
          path="/main"
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
          setUserType={setUserType}
          component={LotteryPage}
        />
        <Protected
          path="/search"
          isLoggedIn={isLoggedIn}
          user={user}
          userType={userType}
          component={SearchPage}
        />
      </Switch>
    </Router>
  );
}

export default App;
