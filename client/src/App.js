import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';
import Home from './screens/Home';
import NavigationHeader from './components/NavigationHeader';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <NavigationHeader />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
