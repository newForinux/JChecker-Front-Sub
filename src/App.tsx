import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Index from './Home';
import StarterConclusion from './modules/views/app.component.view.conclude';

//const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/prepared" component={StarterConclusion} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>

  );
}

export default App;
