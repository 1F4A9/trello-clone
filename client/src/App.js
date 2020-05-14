import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
