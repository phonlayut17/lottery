import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import LotteryPage from '../src/pages/LotteryPage';
import Protected from '../src/components/Protected';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("ทดสอบ");
  const [userType, setUserType] = useState("T");
  return (
    <>
      <body>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} userType={userType} setUserType={setUserType} />} />
            <Protected
              path="/main"
              component={() => <LotteryPage user={user} userType={userType} />}
              isLoggedIn={isLoggedIn}
              user={user}
              setUser={setUser}
              userType={userType}
              setUserType={setUserType}
            />
          </Switch>
        </Router>
      </body>
    </>
  );
}

export default App;

