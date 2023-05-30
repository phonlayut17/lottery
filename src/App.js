import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import LotteryPage from '../src/pages/LotteryPage';
import Protected from '../src/components/Protected';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <body>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Protected
              path="/lottery"
              component={LotteryPage}
              isLoggedIn={isLoggedIn}
            />
          </Switch>
        </Router>
      </body>
    </>
  );
}

export default App;

