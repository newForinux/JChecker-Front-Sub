import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Index from './Home';
import PreClasses from './modules/views/EntranceClass';
import PreInstructor from './modules/views/EntranceInstructor';
import EachClass from './modules/components/classes/SectionClass'

//const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/classes" component={PreClasses} />
        <Route exact path="/classes/:token" component={EachClass} />
        <Route exact path="/instructors" component={PreInstructor} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>

  );
}

export default App;
